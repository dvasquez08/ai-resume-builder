import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-white-transparent.png";

const Nav = () => {
  return (
    <>
      <Nav className="rounded-lg shadow m-4 border-gray-200 bg-sky-900 sticky top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="App Logo" />
            <span className="self-center text-2xl whitespace-nowrap text-white">
              AI Resume Builder
            </span>
          </Link>
        </div>
      </Nav>
    </>
  );
};

export default Nav;
