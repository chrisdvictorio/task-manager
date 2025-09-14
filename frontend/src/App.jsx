import React from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <div className="flex flex-col min-h-dvh font-poppins">
      <Header />
      <main className="flex flex-1 py-12 px-8 md:px-12 xl:px-36 bg-[#F9F9F9]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
