import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Quiz from "./pages/Quiz";
import Features from "./pages/Features";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quiz" element={<Quiz />} />
         <Route path="/features" element={<Features />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

