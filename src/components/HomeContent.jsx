import React from "react";
import { motion } from "framer-motion";
import StepCards from "./StepCards";

const HomeContent = () => {
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
      <StepCards />
    </>
  );
};

export default HomeContent;
