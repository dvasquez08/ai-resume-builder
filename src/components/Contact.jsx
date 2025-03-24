import React from "react";

function Contact({ isOpen, onClose }) {
  // const [name, setName] = useState("");
  // const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-96 animate-fade-in">
        {/* Close Form Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-400 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Contact Me</h2>
        <p className="text-white mb-4">
          Have any questions? Feel free to reach out by sending me a message
          below.
        </p>
        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Your Message"
            value={""}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-500 transition rounded text-white font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
