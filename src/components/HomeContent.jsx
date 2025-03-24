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
        <p className="text-blue-950 mb-4 text-center">
          Welcome! This app is designed to help you build a progrssional resume
          to improve your chances of landin your dream job.
        </p>
        <p className="text-blue-950 mb-4 text-center">
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
      <div>
        <h1 className="text-black mt-24 font-sans font-light text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-center">
          Explore AI-Powered Resume Building
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-10">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {/* Chatbot Section */}
      <h1 className="text-black my-8 font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center px-6">
        Whether you're curious about AI and it's capabilities, or you need help
        building your resume, give the app a try below.
      </h1>
      <StepCards />
      <Chatbot />
    </>
  );
}

export default HomeContent;
