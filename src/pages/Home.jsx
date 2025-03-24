import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";

const HomePage = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <HomeContent />
      <Footer />
    </div>
  );
};

export default HomePage;
