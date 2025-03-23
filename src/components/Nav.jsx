import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-white-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";

const Nav = () => {
  return (
    <>
      <nav className="rounded-lg shadow m-4 border-gray-200 bg-sky-900 sticky top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Menu Logo Section */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="App Logo" />
            <span className="self-center text-2xl whitespace-nowrap text-white">
              AI Resume Builder
            </span>
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-blue-400">
                Home
              </Link>
            </li>
            <li to="/Docs" className="text-white hover:text-blue-400">
              Docs
            </li>
            {/* Come back to finish the contact component later */}
            <li>
              <button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Contact
              </button>
            </li>
          </ul>
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-xl"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-xl"
            >
              <FontAwesomeIcon icon={faMedium} />
            </a>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 text-xl"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          {/* Mobile Menu Toggle Icon */}
        </div>
      </nav>
    </>
  );
};

export default Nav;
