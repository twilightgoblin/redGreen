"use client";

import React from "react";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import SplashCursor from "./components/SplashCursor";
import SparkleNavbar from "./components/SparkleNavbar";
import { AnimatedButton } from "@/components/ui/animated-button";
import Features from "./pages/Features";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useNavigate } from "react-router-dom"; // <-- React Router hook

// ------------------------- Hero Component -------------------------
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

// ------------------------- About Section -------------------------
import { Heart, Zap, Shield, Star } from "lucide-react";

const iconMap = { Heart, Zap, Shield, Star };

const aboutUs = {
  title: "About FlagPulse",
  subTitle: "Know the vibes. Spot the signals. Navigate life smarter.",
  description:
    "FlagPulse is your digital companion to decode interactions, relationships, and situations. We help you identify green flags, spot red flags, and get practical advice in three humanized modes: Comfort, Roast, and Truth. Our dynamic quizzes and insights make understanding yourself and others fun, fast, and actionable.",
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
        "Not just theory — actionable advice to patch situations, celebrate wins, and avoid pitfalls."
    }
  ]
};

export const AboutSection = () => {
  return (
    <section className="relative w-full min-h-[800px] py-20 bg-gradient-to-b from-gray-900 via-cyan-900 to-gray-900 flex flex-col items-center justify-center text-center gap-12">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-4xl font-bold text-cyan-400"
      >
        {aboutUs.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="max-w-2xl text-cyan-200 text-lg"
      >
        {aboutUs.subTitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        className="max-w-4xl text-cyan-100 text-sm"
      >
        {aboutUs.description}
      </motion.p>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
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
                delay: 0.2 + index * 0.2
              }}
              viewport={{ once: true }}
            >
              <CardSpotlight
                radius={250}
                color="#0e4c59" // dark cyan background
                className="w-72 md:w-80 p-6"
              >
                <div className="text-center flex flex-col items-center gap-4">
                  {IconComponent && <IconComponent size={36} className="text-cyan-400" />}
                  <h3 className="text-xl font-semibold text-cyan-200">{value.title}</h3>
                  <p className="text-sm text-cyan-100 opacity-90">{value.description}</p>
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
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-50">
        <SparkleNavbar
          items={["Home", "Features", "About", "Contact"]}
          color="#1E90FF"
        />
      </div>

      {/* Lamp Demo Hero */}
      <div className="flex items-center justify-center h-screen">
        <LampDemo />
      </div>

      {/* Cursor */}
      <SplashCursor />

      {/* About Section */}
      <AboutSection />

      {/* Features */}
      <Features />
    </div>
  );
};

export default App;
