import React from "react";
import { motion } from "framer-motion";
import StepCards from "./StepCards";
import Chatbot from "./Chatbot";

function HomeContent() {
  return (
    <>
      {/* Intro Section */}

      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duratioin: 2, ease: "easeOut" }}
        className="flex flex-col justify-center px-8"
      >
        <p className="text-white mb-4 text-center">
          Welcome! This app is designed to help you build a progrssional resume
          to improve your chances of landin your dream job.
        </p>
        <p className="text-white mb-4 text-center">
          While this app is still in development, feel free to try out the
          resume generator and see how AI can streamline your job hunting
          process. Your feedback is always welcome, so feel free to reach out
          and let me know what you think of the generator.
        </p>
      </motion.div>
      <div className="flex flex-col items items-center">
        <button className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg p-3 mb-6">
          Try the App!
        </button>
      </div>

      {/* Information Section*/}

      <div className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-sky-400 mt-24 font-sans font-light text-2xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-center">
          Explore AI-Powered Resume Building
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-10">
          {/* How it works */}

          <div className="max-w-lg">
            <h2 className="text-white mt-16 font-sans text-xl font-light sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-white px-6 mt-4">
              <li>
                Answer simple questions about your experience, skills, and job
                preferences.
              </li>
              <li>
                The AI generates a tailored resume for you and in the near
                future, cover letters.
              </li>
              <li>Review, edit, and finalize your resume instantly</li>
              <li>Download or copy your resume when you're satisfied</li>
            </ol>
          </div>

          {/* Benefits */}

          <div>
            <h2 className="text-white mt-16 font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center">
              Benefits
            </h2>
            <ul className="list-disc list-inside space-y-4 text-white px-6 mt-4">
              <li>
                <strong>AI powered suggestions:</strong> Get real-time
                resume-building tips.
              </li>
              <li>
                <strong>Fast and Easy:</strong>Generate a professional resume in
                minutes.
              </li>
              <li>
                <strong>Privacy First:</strong>Your data is stored locally,
                giving you full control.
              </li>
              <li>
                <strong>Cusomizable:</strong>Edit, refine, and personalize your
                resume effortlessly.
              </li>
              <li>
                <strong>Effective Exporting:</strong>Download as a PDF or copy
                with one click.
              </li>
            </ul>
          </div>
        </div>

        {/* Coming Soon */}

        <h2 className="text-white mt-16 font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center">
          Coming Soon!
        </h2>
        <p className="text-white px-6 mt-4 font-bold max-w-lg">
          Future Updates:
        </p>
        <ul className="list-disc list-inside space-y-4 text-white mt-4 mx-6">
          <li>
            <strong>More Resume Templaces</strong>- Choose from a variety of
            styles to fit your industry.
          </li>
          <li>
            <strong>AI Cover Letter Generator</strong>- Get a tailored cover
            letter alongside your resume.
          </li>
        </ul>
        <p className="text-white px-6 mt-4 max-w-lg">Stay tuned for updates!</p>
      </div>

      {/* Chatbot Section */}
      <h1 className="text-sky-400 my-8 font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center px-6">
        Whether you're curious about AI and it's capabilities, or you need help
        building your resume, give the app a try below.
      </h1>
      <StepCards />
      <Chatbot />
    </>
  );
}

export default HomeContent;
