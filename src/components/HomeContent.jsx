import { useRef } from "react";
import { motion } from "framer-motion";
import StepCards from "./StepCards";
import Chatbot from "./Chatbot";

function HomeContent() {
  // Adding functionality to the button which will scroll the user smoothly to the chatbot section

  const chatbotSectionRef = useRef(null);
  const scrollToChatbotSection = () => {
    chatbotSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Intro Section */}

      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="flex flex-col justify-center px-8"
      >
        <h2 className="text-sky-400 my-6 font-sans font-light text-2xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl text-center">
          Smarter Resumes, Better Opportunities
        </h2>
        <p className="text-white mb-4 text-center">
          Welcome! This app is designed to help you build a progrssional resume
          to improve your chances of landing your dream job.
        </p>
        <p className="text-white mb-4 text-center">
          While this app is still in development, feel free to try out the
          resume generator and see how AI can streamline your job hunting
          process. Your feedback is always welcome, so feel free to reach out
          and let me know what you think of the generator.
        </p>
      </motion.div>
      <div className="flex flex-col items items-center">
        {/* The button that will scroll the user down to the app at the botoom of the page. */}

        <button
          onClick={scrollToChatbotSection}
          className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 transition-bg duration-300 focus:ring-blue-300 font-medium rounded-lg p-3 mb-6"
        >
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

          <div className="max-w-lg bg-zinc-300 p-4 rounded-lg shadow-[0_0_20px_#38bdf8] m-1 hover:shadow-[0_0_20px_#FFFFFF] transition-shadow duration-300 border-gray-200">
            <h2 className="text-zinc-600 font-sans text-xl font-light sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center">
              How It Works
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-zinc-600 px-6 mt-4">
              <li>
                Answer simple questions about your experience, skills, and job
                preferences.
              </li>
              <li>
                The AI generates a tailored resume for you and in the near
                future, cover letters.
              </li>
              <li>Review, edit, and finalize your resume instantly</li>
              <li>Download or copy your resume when you`re satisfied</li>
            </ol>
          </div>

          {/* Benefits */}

          <div className="bg-zinc-300 max-w-lg p-1 rounded-lg shadow-[0_0_20px_#38bdf8] hover:shadow-[0_0_20px_#FFFFFF] transition-shadow duration-300 m-1 border-gray-200">
            <h2 className="text-zinc-600 font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center">
              Benefits
            </h2>
            <ul className="list-disc list-inside space-y-4 text-zinc-600 px-6 mt-4">
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
            <strong>More Resume Templates</strong>- Choose from a variety of
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
      <h1
        ref={chatbotSectionRef} // Where the scroll function knows where to go
        className="text-sky-400 my-16 font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl text-center px-6"
      >
        Whether you`re curious about AI and it`s capabilities, or you need help
        building your resume, give the app a try below.
      </h1>
      <div className="my-4">
        <StepCards />
      </div>
      <Chatbot />
    </>
  );
}

export default HomeContent;
