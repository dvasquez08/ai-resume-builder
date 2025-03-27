import Logo from "../assets/logo-white-transparent.png";
import { motion } from "framer-motion";
import bg1 from "../assets/bg-1.jpg";

function Hero() {
  return (
    <div style={{ backgroundImage: `url(${bg1})` }}>
      <motion.div
        initial={{ opacity: 0, x: 75 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-4xl flex items-center justify-center my-6 flex-col"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <img src={Logo} />
          <h1 className=" text-white my-2 font-sans font-light text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl text-left bg-black/50">
            Your Personal AI Assistant for Building Your Resume
          </h1>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
