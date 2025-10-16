"use client";

import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import SplashCursor from "./components/SplashCursor";
import SparkleNavbar from "./components/SparkleNavbar";
import { AnimatedButton } from "@/components/ui/animated-button";
import Features  from "./pages/Features";
import { useNavigate } from "react-router-dom"; // <-- React Router hook

export function LampDemo() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quiz"); // navigate without page reload
  };

  return (
    <LampContainer>
      <div className="flex flex-col items-center justify-center text-center gap-8">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="text-4xl font-medium tracking-tight md:text-7xl"
        >
          Spot the{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent"
          >
            green
          </motion.span>
          . <br />
          Avoid the{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
          >
            red
          </motion.span>
          . Know the vibes
        </motion.h1>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeInOut" }}
          className="mt-10 md:mt-10"
        >
          <AnimatedButton
            onClick={handleGetStarted} // <-- client-side navigation
            className="text-white font-semibold shadow-lg"
            variant="default"
            size="default"
            glow={true}
            textEffect="normal"
            uppercase={true}
            rounded="custom"
            shimmerColor="#7ebebf"
            shimmerSize="0.15em"
            shimmerDuration="3s"
            borderRadius="100px"
            background="linear-gradient(135deg, #7ebebf, #00CED1)"
            style={{ padding: "0.75em 2em", fontSize: "1.2rem" }}
          >
            GET STARTED
          </AnimatedButton>
        </motion.div>
      </div>
    </LampContainer>
  );
}

const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <SparkleNavbar
          items={["Home", "Features", "About", "Contact"]}
          color="#1E90FF"
        />
      </div>

      {/* Lamp and demo content */}
      <div className="flex items-center justify-center h-screen">
        <LampDemo />
      </div>

      <SplashCursor />
      <Features />
    </div>
  );
};

export default App;
