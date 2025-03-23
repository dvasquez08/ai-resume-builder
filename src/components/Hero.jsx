import React from "react";
import LogoBlue from "../assets/logo-blue.png";
import LogoBlack from "../assets/logo-black-transparent.png";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 75 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-4xl flex items-center justify-center my-6 flex-col"
      >
        <h1 className="text-blue-950 my-2 font-sans font-light text-2xl sm:text-6xl lg:text-7xl text-center">
          AI Resume Generator
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <img src={LogoBlack} />
          <h1 className="text-blue-950 my-2 font-sans font-light text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-left">
            Your Personal AI Assistant for Building Your Resume
          </h1>
        </div>

        <h2 className="text-blue-950 my-2 font-sans font-light text-center">
          Smarter Resumes, Better Opportunities
        </h2>
      </motion.div>
    </div>
  );
};

export default Hero;
