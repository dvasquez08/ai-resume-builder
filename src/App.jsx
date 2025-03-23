import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Docs from "./pages/Docs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Docs" element={<Docs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
