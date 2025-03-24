import React from "react";
import { motion } from "framer-motion";

const StepCards = () => {
  const steps = [
    { id: 1, title: "Step 1", text: "Start off with your information" },
    { id: 2, title: "Step 2", text: "Talk about your skills and experience" },
    { id: 3, title: "Step 3", text: "Customize and refine with ease" },
    { id: 4, title: "Step 4", text: "Copy/Download and apply!" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-10">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          className="bg-gray-700 shadow-lg rounded-xl p-6 w-72 text-center border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          <p className="text-white mt-2">{step.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StepCards;
