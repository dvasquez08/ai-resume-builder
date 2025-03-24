import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Docs() {
  return (
    <>
      <Nav />
      <div>
        <h1 className="text-sky-black my-2 font-sans font-light text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-center">
          Documentation
        </h1>
      </div>
      <div>
        <h2 className="text-black mt-18 mb-6 font-sans font-light text-4xl text-left px-6">
          Overview
        </h2>
        <p className="text-black px-6">
          This app is an AI-powered resume assistant designed to help users
          create professional resumes efficiently. It leverages Groq's Llama 3
          language model to provide instant feedback, generate content, and
          structure resumes interactively, ensuring a seamless experience.
        </p>

        <h2 className="text-black mt-16 mb-6 font-sans font-light text-4xl text-left px-6">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-4 px-6 text-black">
          <li>
            <span className="font-bold">AI-Powered Resume Generation:</span>{" "}
            Conversational AI guides users through resume creation.
          </li>
          <li>
            <span className="font-bold">Fast & Responsive:</span> Instant
            AI-driven suggestions and formatting.
          </li>
          <li>
            <span className="font-bold">Privacy-Focused:</span> Chat history is
            stored locally; no data is sent to external servers.
          </li>
          <li>
            <span className="font-bold">Customization:</span> Tailored
            suggestions for job-specific resumes.
          </li>
          <li>
            <span className="font-bold">Export Options:</span> Download resumes
            as PDFs or copy text.
          </li>
        </ul>

        <h2 className="text-black mt-16 mb-6 font-sans font-light text-4xl text-left px-6">
          Privacy
        </h2>
        <p className="text-black px-6">
          All chat history is stored locally on your device. No data is uploaded
          or saved on external servers, ensuring complete privacy. Users can
          delete their chat history anytime.
        </p>

        <h2 className="text-black mt-16 mb-6 font-sans font-light text-4xl text-left px-6">
          How It Works
        </h2>
        <ul className="list-disc list-inside space-y-4 mx-6 text-black">
          <li>
            <span className="font-bold">Instant Feedback:</span> Groq’s API
            ensures real-time AI responses.
          </li>
          <li>
            <span className="font-bold">Contextual Suggestions:</span> AI adapts
            recommendations based on user inputs.
          </li>
          <li>
            <span className="font-bold">Resume Structuring:</span> Automatically
            formats resumes based on conversation flow.
          </li>
          <li>
            <span className="font-bold">Optimized User Experience:</span> A
            guided process that simplifies resume building.
          </li>
        </ul>

        <h2 className="text-black mt-16 mb-6 font-sans font-light text-4xl text-left px-6">
          Technical Details
        </h2>
        <ul className="list-disc list-inside space-y-4 mx-6 text-black">
          <li>
            <span className="font-bold">LLM Integration:</span> Uses Groq’s
            Llama 3 for AI-driven responses.
          </li>
          <li>
            <span className="font-bold">Real-time Feedback:</span> AI analyzes
            chat history for contextual suggestions.
          </li>
          <li>
            <span className="font-bold">PDF Generation:</span> Resumes are
            formatted into downloadable PDFs.
          </li>
          <li>
            <span className="font-bold">Local Storage:</span> Users maintain
            full control over their data.
          </li>
        </ul>

        <h2 className="text-black mt-16 mb-6 font-sans font-light text-4xl text-left px-6">
          Future Plans
        </h2>
        <p className="text-black px-6">
          Enhancements include cover letter generation, improved AI guidance,
          and more customization features to streamline job applications
          further.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Docs;
