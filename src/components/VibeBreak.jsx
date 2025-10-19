import React from "react";
import { motion } from "framer-motion";

const VibeBreak = ({ message, questionNumber }) => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-lg mx-auto"
      >
        {/* Animated pulse circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-2xl sm:text-3xl"
          >
            ✨
          </motion.div>
        </motion.div>

        {/* Vibe check text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Vibe Check
          </h2>
          <p className="text-lg sm:text-xl text-cyan-200 mb-6 leading-relaxed">
            {message}
          </p>
          <div className="text-gray-400 text-sm">
            {questionNumber} questions down, let's keep going...
          </div>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-3 h-3 bg-cyan-400 rounded-full"
            />
          ))}
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-8 mx-auto max-w-xs"
        />
      </motion.div>
    </div>
  );
};

export default VibeBreak;