import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="rounded-lg shadow m-4 bg-sky-900">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm sm:text-center text-gray-400">
            © 2025{" "}
            <a
              href="https://dvasquez.net"
              target="_blank"
              className="hover:underline"
            >
              David Vasquez{" "}
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
