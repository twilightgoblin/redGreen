import React, { useState } from "react";
import { motion } from "framer-motion";

const QuestionCard = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);

  // Safety check
  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-white">Loading question...</div>
      </div>
    );
  }

  const handleAnswerClick = async (option) => {
    if (isAnswering) return;

    setSelectedAnswer(option);
    setIsAnswering(true);

    // Small delay for visual feedback
    setTimeout(() => {
      onAnswer(option);
    }, 600);
  };

  const getFlavorText = () => {
    const flavors = [
      "Noted... 👀",
      "The plot thickens 🤔",
      "Interesting choice...",
      "We're building the picture 📝",
      "That tells us something 💭",
      "Adding to the evidence 🔍",
      "The vibes are becoming clearer 🌊",
      "Every answer matters 💫",
      "Insight recorded ✨",
      "Your response adds depth 📊",
      "Another piece of the puzzle 🧩",
      "This is shaping the profile 🔧",
      "Observations logged 🗂️",
      "Patterns are emerging 📈",
      "Valuable context noted 📝",
      "Analysis continues... 🔬"
    ];

    return flavors[Math.floor(Math.random() * flavors.length)];
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto"
      >
        {/* Question Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="text-cyan-400 text-sm font-medium mb-2">
            Question {questionNumber} of {totalQuestions}
            {question.theme && (
              <span className="ml-2 text-xs text-gray-400 italic">
                • {question.theme.replace('_', ' ')}
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
            {question.text}
          </h2>
        </motion.div>

        {/* Answer Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              onClick={() => handleAnswerClick(option)}
              disabled={isAnswering}
              className={`
                w-full p-4 sm:p-6 md:p-8 rounded-2xl border-2 text-left transition-all duration-300
                ${selectedAnswer === option
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-400 hover:bg-gray-700/50'
                }
                ${isAnswering && selectedAnswer !== option ? 'opacity-50' : ''}
                disabled:cursor-not-allowed
                group
              `}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`
                  w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0
                  ${selectedAnswer === option
                    ? 'border-cyan-400 bg-cyan-400 text-black'
                    : 'border-gray-400 text-gray-400 group-hover:border-white group-hover:text-white'
                  }
                  transition-all duration-300
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <p className={`
                  text-base sm:text-lg md:text-xl leading-relaxed
                  ${selectedAnswer === option ? 'text-cyan-100' : 'text-gray-200 group-hover:text-white'}
                  transition-colors duration-300
                `}>
                  {option.text}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Flavor Text */}
        {selectedAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-cyan-300 text-sm italic">
              {getFlavorText()}
            </p>
          </motion.div>
        )}

        {/* Loading indicator when processing answer */}
        {isAnswering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-6"
          >
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionCard;