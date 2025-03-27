import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import Groq from "groq-sdk";

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
        "Tell me about a job you've had (title, company, years, responsibilities).",
    },
  ];

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

    let cleanedResume = finalResume
      .replace(/\*\*.*?\*\*\n\*\*Contact Information:\*\*\n*/, "") // Remove redundant name & heading
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markdown
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // Fix email formatting
      .replace(/^\*\s+/gm, "") // Remove leading "* "
      .replace(/^\+\s+/gm, ""); // Remove leading "+ "

    // **Split Resume Content & Notes**
    const [resumeContent, notes] = cleanedResume.split(
      "I hope this meets your requirements!",
      2
    );

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

    // **Fix: Centered Contact Info**
    const contactLines = contactInfo.trim().split("\n");
    contactLines.forEach((line) => {
      pdf.text(line, 105, y, { align: "center" });
      y += 7;
    });

    y += 10; // Move down after contact info

    // **Write Resume Content First**
    lines.forEach((line) => {
      if (y > 280) {
        pdf.addPage(); // Start a new page if content exceeds page height
        y = 20;
      }
      pdf.text(line, 10, y);
      y += 7;
    });

    // **Write Notes on a New Page**
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
    if (messages.length > 1) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }

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
