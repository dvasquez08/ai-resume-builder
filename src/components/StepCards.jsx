import { motion } from "framer-motion";

function StepCards() {
  // Defining each step that will appear above the chatbot, explaining how it works

  const steps = [
    { id: 1, title: "Step 1", text: "Start off with your information" },
    { id: 2, title: "Step 2", text: "Add your skills and experience" },
    { id: 3, title: "Step 3", text: "Customize and refine with ease" },
    { id: 4, title: "Step 4", text: "Copy/Download and apply!" },
  ];

  return (
    // This will set the styling for all the steps

    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-10">
      {steps.map((step) => (
        <motion.div
          key={step.id}
          className="bg-white shadow-lg rounded-xl p-6 w-72 text-center border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-xl font-semibold text-sky-600">{step.title}</h3>
          <p className="text-gray-700 mt-2">{step.text}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default StepCards;
