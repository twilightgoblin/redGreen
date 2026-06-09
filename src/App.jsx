"use client";

import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "./components/ui/Lamp";
import SplashCursor from "./components/SplashCursor";
import SparkleNavbar from "./components/SparkleNavbar";
import { AnimatedButton } from "./components/ui/animated-button.jsx";
import Features from "./pages/Features";
import { CardSpotlight } from "./components/ui/card-spotlight.jsx";
import { useNavigate } from "react-router-dom";
import { Heart, Zap, Shield, Star } from "lucide-react";
import SlidingText from "./components/SlidingText";
import Footer from "./components/Footer";

// ------------------------- Hero Component -------------------------
export function LampDemo() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quiz");
  };

  return (
    <LampContainer>
      <div className="flex flex-col items-center justify-center text-center gap-8">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight px-4"
        >
          Spot the{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent"
          >
            green
          </motion.span>
          . <br />
          Avoid the{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-gradient-to-br from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent"
          >
            red
          </motion.span>
          . Know the vibes
        </motion.h1>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
          className="mt-8 md:mt-10 px-4"
        >
          <button onClick={handleGetStarted} className="neon-btn-home">
            GET STARTED
          </button>

          <style>{`
            .neon-btn-home {
              position: relative;
              padding: 0.85em 3em;
              font-size: clamp(1rem, 2.5vw, 1.2rem);
              font-weight: 700;
              letter-spacing: 0.12em;
              color: #fff;
              background: linear-gradient(135deg, #2dd4c8, #00CED1);
              border: none;
              border-radius: 100px;
              cursor: pointer;
              outline: none;
              min-width: 200px;
              box-shadow:
                0 0 8px #00e5ff,
                0 0 20px #00e5ff,
                0 0 45px #00c8d7,
                inset 0 0 12px rgba(255,255,255,0.15);
              transition: box-shadow 0.3s ease, transform 0.2s ease;
            }
            .neon-btn-home::before {
              content: '';
              position: absolute;
              inset: -3px;
              border-radius: 100px;
              background: transparent;
              border: 2px solid rgba(180,255,255,0.6);
              box-shadow:
                0 0 10px rgba(0,229,255,0.6),
                0 0 30px rgba(0,229,255,0.3);
              pointer-events: none;
            }
            .neon-btn-home:hover {
              box-shadow:
                0 0 12px #00e5ff,
                0 0 35px #00e5ff,
                0 0 70px #00c8d7,
                inset 0 0 18px rgba(255,255,255,0.2);
              transform: scale(1.04);
            }
            .neon-btn-home:active {
              transform: scale(0.98);
            }
          `}</style>
        </motion.div>
      </div>
    </LampContainer>
  );
}

// ------------------------- About Section -------------------------
const iconMap = { Heart, Zap, Shield, Star };

const aboutUs = {
  title: "About RedGreen",
  subTitle: "Know the vibes. Spot the signals. Navigate life smarter.",
  description:
    "RedGreen is your digital companion to decode interactions, relationships, and situations. We help you identify green flags, spot red flags, and get practical advice in three humanized modes: Comfort, Roast, and Truth. Our dynamic quizzes and insights make understanding yourself and others fun, fast, and actionable.",
  values: [
    {
      icon: "Heart",
      title: "Human-Centered",
      description:
        "We focus on giving advice that actually makes sense for real people, not robots."
    },
    {
      icon: "Zap",
      title: "Fast & Fun",
      description:
        "Quick quizzes, instant insights, and a playful experience for today’s generation."
    },
    {
      icon: "Shield",
      title: "Safe & Neutral",
      description:
        "Your data and your vibe-check results are handled safely, and advice is unbiased."
    },
    {
      icon: "Star",
      title: "Practical Guidance",
      description:
        "Not just theory — actionable advice to patch situations, celebrate wins."
    }
  ]
};

export const AboutSection = () => {
  return (
    <section className="relative w-full min-h-screen py-24 bg-gradient-to-b from-gray-900 via-cyan-900 to-gray-900 flex flex-col items-center justify-center text-center gap-12">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-3xl sm:text-4xl font-bold text-cyan-400 px-4"
      >
        {aboutUs.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="max-w-2xl text-cyan-200 text-base sm:text-lg px-4"
      >
        {aboutUs.subTitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        className="max-w-4xl text-cyan-100 text-sm sm:text-base px-4"
      >
        {aboutUs.description}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 max-w-6xl mx-auto">
        {aboutUs.values.map((value, index) => {
          const IconComponent = iconMap[value.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: 0.2 + index * 0.1
              }}
              viewport={{ once: true }}
              className="w-full"
            >
              <CardSpotlight
                radius={250}
                color="#0e4c59"
                className="w-full h-full p-4 sm:p-6"
              >
                <div className="text-center flex flex-col items-center gap-3 sm:gap-4 h-full">
                  {IconComponent && (
                    <IconComponent size={32} className="text-cyan-400 flex-shrink-0" />
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold text-cyan-200">
                    {value.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cyan-100 opacity-90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </CardSpotlight>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

// ------------------------- Main App -------------------------
const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden mobile-container ipad-pro-layout">
      {/* SplashCursor - only on hero page */}
      <SplashCursor />

      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <SparkleNavbar
          items={["Home", "Features", "About", "How It Works", "Contact"]}
          color="#1E90FF"
        />
      </div>

      {/* Hero Section */}
      <div className="flex items-center justify-center h-screen">
        <LampDemo />
      </div>

      {/* Features Section */}
      <div id="features">
        <Features />
      </div>

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Sliding Text Section */}
      <SlidingText />

      {/* Footer */}
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default App;
