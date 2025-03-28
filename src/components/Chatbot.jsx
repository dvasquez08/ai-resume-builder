import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import Groq from "groq-sdk";

// Starts oof the chatbot's starting point with the default start message
// continues with the conversation if there's chat history

function ChatBot() {
  const [messages, setMessages] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("chatHistory")) || [
        {
          text: "Hi! Let's build your resume. What's your full name?",
          sender: "bot",
        },
      ]
    );
  });

  const [resumeData, setResumeData] = useState(
    () => JSON.parse(localStorage.getItem("resumeData")) || {}
  );
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);
  const [finalResume, setFinalResume] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);
  const [groqKey, setGroqKey] = useState(null);
  const [groqClient, setGroqClient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetches the API keys from Groq, allowing the app to use the LLM

    const fetchApiKeys = async () => {
      try {
        const response = await fetch(
          "https://us-central1-ai-resume-4ef19.cloudfunctions.net/getApiKeys"
        );
        const data = await response.json();
        if (data?.GROQ_API_KEY) {
          setGroqKey(data.GROQ_API_KEY);
        } else {
          console.error("Invalid API key data:", data);
        }
      } catch (error) {
        console.error("Error fetching API keys:", error);
      }
    };

    fetchApiKeys();
  }, []);

  useEffect(() => {
    if (groqKey) {
      setGroqClient(
        new Groq({ apiKey: groqKey, dangerouslyAllowBrowser: true })
      );
    }
  }, [groqKey]);

  // Function that clears the data that is cached so far locally on the browser
  // Starts the chat over again with the same default message as the beginning

  const resetChat = () => {
    if (window.confirm("Are you sure you want to start over?")) {
      setTimeout(() => {
        localStorage.clear();
        setMessages([
          {
            text: "Hi! Let's build your resume. What's your full name?",
            sender: "bot",
          },
        ]);
        setResumeData({});
        setFinalResume(null);
        setIsFinalized(false);
      }, 500);
    }
  };

  // The set of pre-set questions that the user will be asked

  const questions = [
    { key: "name", question: "What is your full name?" },
    { key: "address", question: "What is your address?" },
    { key: "phone", question: "What is your phone number?" },
    { key: "email", question: "What is your email address?" },
    { key: "careerObjective", question: "What is your career objective?" },
    {
      key: "education",
      question: "Tell me about your education (degree, institution, year).",
    },
    {
      key: "workExperience",
      question:
        "Tell me about your work experience (title, company, years, responsibilities).",
    },
  ];

  // This handles the user's responses , going though the preset questions
  // then runs the finalizeResume function after all the questions are done
  // which sends the responses in the prompt

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentQuestion = questions.find((q) => !resumeData[q.key]);
    const userMessage = { text: input, sender: "user" };
    let updatedData = { ...resumeData };

    if (currentQuestion) {
      updatedData[currentQuestion.key] = input;
      setResumeData(updatedData);
      localStorage.setItem("resumeData", JSON.stringify(updatedData));
    }

    const nextQuestion = questions.find((q) => !updatedData[q.key]);

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        text: nextQuestion ? nextQuestion.question : "Generating resume...",
        sender: "bot",
      },
    ]);

    setInput("");

    if (!nextQuestion) {
      await finalizeResume(updatedData);
    }
  };

  // This takes all the responses from the user, then uses it in one prompt to the LLM
  // It takes the users data and is prompted to generate a resume, telling Llama what
  // to do with this data

  const finalizeResume = async (data) => {
    if (!groqClient) {
      console.error("Groq client is not initialized.");
      return;
    }

    setLoading(true);
    try {
      const cleanData = JSON.parse(JSON.stringify(data));

      const response = await groqClient.chat.completions.create({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: `You are an AI resume formatter. Given the user's information, return ONLY a structured, professional resume.`,
          },
          {
            role: "user",
            content: `Here is the user's information: ${JSON.stringify(
              cleanData,
              null,
              2
            )}. Format this into a professional resume.`,
          },
        ],
        temperature: 0.7,
      });

      if (!response?.choices?.length)
        throw new Error("Invalid response from AI");

      setFinalResume(response.choices[0].message.content);
      setIsFinalized(true);
    } catch (error) {
      console.error("Error generating resume:", error);
    }
    setLoading(false);
  };

  // The function that allows the user to copy their formatted reesume to their clipboard
  // Allowing them to paste it to MS Word or Google Docs

  const copyToClipboard = () => {
    if (!finalResume) return;

    let cleanedResume = finalResume.replace(
      /\*\*.*?\*\*\n\*\*Contact Information:\*\*\n*/,
      ""
    ); // Remove redundant name & heading

    cleanedResume = cleanedResume.replace(/\[(.*?)\]\((.*?)\)/g, "$1"); // Fix email formatting

    navigator.clipboard
      .writeText(cleanedResume)
      .then(() => alert("Resume copied to clipboard!"));
  };

  // The function that allows the user to download a PDF version of their resume. This formats
  // their resume to make it look professional, though more tweeking is needed

  const downloadPDF = () => {
    if (!finalResume || !resumeData) return;

    const userName = resumeData.name || "Resume";

    const pdf = new jsPDF();
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(userName, 105, 10, { align: "center" });

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    let y = 20;
    let contactInfo = "";

    // This part removes unncecessary parts of the formatting such as plus signs that were not needed

    let cleanedResume = finalResume
      .replace(/\*\*.*?\*\*\n\*\*Contact Information:\*\*\n*/, "") // Remove redundant name & heading
      .replace(/\*\*(.*?)\*\*/g, "$1") // Removes bold markdown
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // Fixes email formatting
      .replace(/^\*\s+/gm, "") // Remove leading "* "
      .replace(/^\+\s+/gm, ""); // Remove leading "+ "

    const [resumeContent, notes] = cleanedResume.split(
      "I hope this meets your requirements!",
      2
    );

    // This part was added to remove duplicate names that kept appearing.
    // This also formats the contact information at the top

    const lines = resumeContent.split("\n").filter((line, index) => {
      if (index !== 0 && line.trim() === userName) return false;
      if (
        line.startsWith("Address:") ||
        line.startsWith("Phone:") ||
        line.startsWith("Email:")
      ) {
        contactInfo += line + "\n";
        return false;
      }
      return true;
    });

    // Takes all the info and formats it for the PDF download

    const contactLines = contactInfo.trim().split("\n");
    contactLines.forEach((line) => {
      pdf.text(line, 105, y, { align: "center" });
      y += 7;
    });

    y += 10;

    lines.forEach((line) => {
      if (y > 280) {
        pdf.addPage();
      }
      pdf.text(line, 10, y);
      y += 7;
    });

    if (notes && notes.trim()) {
      pdf.addPage();
      y = 20;
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(100);

      pdf.text("Notes from the bot:", 10, y);
      y += 10;

      notes
        .trim()
        .split("\n")
        .forEach((line) => {
          if (y > 280) {
            pdf.addPage();
            y = 20;
          }
          pdf.text(line, 10, y);
          y += 7;
        });

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(0);
    }

    pdf.save(`${userName}_Resume.pdf`);
  };

  useEffect(() => {
    // Saves the chat responses to local storage

    if (messages.length > 1) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
    // Takes the user to the bottom of the chat. This was added because everytime a resposne was added
    // you had to scroll down each time which can be annoying to the user

    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-11/12 max-w-3xl mx-auto mt-10 mb-10 p-6 border rounded shadow-[0_0_20px_#38bdf8] bg-gray-800 text-white">
      <div
        className="h-96 overflow-y-auto p-4 border-b border-white chat-window rounded-lg bg-gray-900 shadow-md"
        ref={chatWindowRef}
      >
        {/* Handles the styling and the animation of the text bubbles */}

        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-3 flex p-2 rounded ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`max-w-xs px-4 py-3 rounded-lg text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-tr-none"
                  : "bg-gray-200 text-black rounded-tl-none"
              }`}
            >
              {msg.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </span>
          </motion.div>
        ))}
        {loading && (
          <p className="text-center text-gray-400">Generating your resume...</p>
        )}
      </div>

      {/* The chat functionality where the user interacts with the chatbot */}

      {!isFinalized && (
        <div className="relative flex gap-2 mt-4">
          <textarea
            className="flex-1 p-3 pr-10 border rounded bg-gray-900 text-white z-10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your response..."
          />
          <button
            onClick={sendMessage}
            className="bg-gray-700 text-white p-2 rounded-full hover:bg-blue-900 transition shadow-md"
          >
            &#8593;
          </button>
        </div>
      )}

      {/* After the bot if finished asking all the questions and the resume is ready, these two buttons will appear
      the Copy to Clipboard button and the Download PDF button */}

      {isFinalized && (
        <div className="pt-2 md:flex justify-evenly">
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-500 transition rounded"
          >
            Copy to Clipboard
          </button>

          <button
            onClick={downloadPDF}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 transition rounded"
          >
            Download PDF
          </button>
        </div>
      )}

      {/* The Start Over button that calls  the resetChat function, cleaing the data collected so far and starts the process over again.
      This button is visible the whole time.  */}

      <button
        onClick={resetChat}
        className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-400 transition rounded mt-2"
      >
        Start Over
      </button>
    </div>
  );
}

export default ChatBot;
