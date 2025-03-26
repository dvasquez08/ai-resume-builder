import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

function Contact({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [apiKeys, setApiKeys] = useState(null);
  const [loadingKeys, setLoadingKeys] = useState(true);

  useEffect(() => {
    fetch(
      "https://us-central1-ai-resume-4ef19.cloudfunctions.net/getContactKeys"
    )
      .then((response) => response.json())
      .then((data) => {
        setApiKeys(data);
        setLoadingKeys(false);
      })
      .catch((error) => {
        console.error("Error fetching API keys", error);
        setLoadingKeys(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      console.log("ReCaptcha verification failed");
      return;
    }

    if (!apiKeys) {
      console.error("API keys not loaded yet.");
      return;
    }
    const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } =
      apiKeys;

    const templateParams = {
      from_name: name,
      message: message,
      "g-recaptcha-response": recaptchaValue,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("Message submitted", response);
        setName("");
        setMessage("");
        setRecaptchaValue(null);
        onClose();
      })
      .catch((error) => {
        console.error("Error sending message", error);
      });
  };

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
        <form onSubmit={handleSubmit} className="space-y-4">
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

          {!loadingKeys && apiKeys?.RECAPTCHA_SITE_KEY ? (
            <ReCAPTCHA
              sitekey={apiKeys.RECAPTCHA_SITE_KEY}
              onChange={(value) => setRecaptchaValue(value)}
            />
          ) : (
            <p className="text-gray-400 text-sm">loading reCAPTCHA...</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 hover:bg-blue-500 transition rounded text-white font-semibold"
            disabled={loadingKeys}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
