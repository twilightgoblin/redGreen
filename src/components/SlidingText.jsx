import React from "react";
import { motion } from "framer-motion";

const SlidingText = () => {
  const slidingTexts = [
    "Spot the Green.",
    "Avoid the Red.", 
    "Know the Vibes.",
    "Navigate Smart.",
    "Trust Your Gut.",
    "Read the Signs."
  ];

  return (
    <section className="relative w-full py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="relative flex items-center justify-center">
        {/* Sliding Text Animation */}
        <div className="flex whitespace-nowrap">
          <motion.div
            className="flex items-center gap-16"
            animate={{
              x: [0, "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear"
              }
            }}
          >
            {/* Repeat the array multiple times for seamless loop */}
            {[...slidingTexts, ...slidingTexts, ...slidingTexts, ...slidingTexts].map((text, index) => (
              <div key={index} className="flex items-center gap-16 flex-shrink-0">
                <span className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text text-transparent select-none whitespace-nowrap hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-500 hover:to-cyan-600 transition-all duration-500 cursor-pointer">
                  {text}
                </span>
                {/* Rose decorative element */}
                <div className="text-4xl md:text-6xl flex-shrink-0">🌹</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SlidingText;