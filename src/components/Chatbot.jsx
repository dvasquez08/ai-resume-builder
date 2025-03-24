import React, { useState } from "react";
import { motion } from "framer-motion";

function Chatbot() {
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
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);
  const [finalResume, setFinalResume] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);
  const [loading, setLoading] = useState(false);

  const questions = [
    { key: "name", question: "What is your full name?" },
    { key: "address", question: "What is your address?" },
    { key: "phone", question: "What is your phone number?" },
    { key: "email", question: "What is your email address?" },
    { key: "careerObjective", question: "What is your career objective?" },
    {
      key: "education",
      question:
        "Tell me about your education (certification, institution, year)",
    },
    {
      key: "workExperience",
      question:
        "Tell me about your work history (job title, company, years worked, responsibilities)",
    },
  ];

  return (
    <div className="w-11/12 max-3-3-xl mx-auto mt-10 mb-10 p-6 border rounded shadow-[0_0_20px_#38bdf8] bg-gray-800 text-white">
      <div
        className="h-96 overflow-y-auto p-4 border-b border-white chat-window rounded-lg bg-gray-900 shadow-md"
        ref={chatWindowRef}
      >
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
        {loading && (
          <p className="text-center text-gray-400">Generating your resume...</p>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
