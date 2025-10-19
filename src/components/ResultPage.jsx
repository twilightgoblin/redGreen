import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw, Heart, Flame, Eye } from "lucide-react";

const ResultPage = ({ result, onRestart }) => {
  const [selectedTone, setSelectedTone] = useState("comfort");
  const [showShareMenu, setShowShareMenu] = useState(false);

  const { dominantFlag, scores, toneResponses } = result;

  const flagConfig = {
    green: {
      color: "from-green-400 to-emerald-600",
      bgGradient: "from-green-900/20 via-gray-900 to-black",
      emoji: "💚",
      title: "Green Flag Partner",
      description: "You've got a keeper!"
    },
    red: {
      color: "from-red-400 to-rose-600", 
      bgGradient: "from-red-900/20 via-gray-900 to-black",
      emoji: "🚩",
      title: "Red Flag Alert",
      description: "Time for some serious conversations"
    },
    beige: {
      color: "from-yellow-400 to-amber-600",
      bgGradient: "from-yellow-900/20 via-gray-900 to-black", 
      emoji: "🤷‍♀️",
      title: "Mixed Signals",
      description: "It's complicated..."
    }
  };

  const toneConfig = {
    comfort: {
      icon: Heart,
      label: "Comfort",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10 border-pink-400"
    },
    roast: {
      icon: Flame,
      label: "Roast",
      color: "text-orange-400", 
      bgColor: "bg-orange-400/10 border-orange-400"
    },
    truth: {
      icon: Eye,
      label: "Truth",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10 border-blue-400"
    }
  };

  const config = flagConfig[dominantFlag];

  const handleShare = () => {
    const shareText = `I just analyzed my partner with RedGreen's Partner Flag Finder and they're a ${config.title}! ${config.emoji} Test whether your friend is red or green or yourself too at ${window.location.origin}/quiz`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Partner Flag Analysis',
        text: shareText,
        url: `${window.location.origin}/quiz`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setShowShareMenu(true);
      setTimeout(() => setShowShareMenu(false), 2000);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient} transition-all duration-1000`}>
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <div className="text-cyan-400 font-semibold">Your Results</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="text-8xl mb-4"
            >
              {config.emoji}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent mb-4 px-4`}
            >
              {config.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 px-4"
            >
              {config.description}
            </motion.p>
          </div>

          {/* Scroll Instruction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 border border-cyan-400/30">
              <p className="text-cyan-300 font-medium text-sm sm:text-base">
                ✨ Keep scrolling for the real tea! ✨
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Get your comfort zone, roast session & brutal truth below 👇
              </p>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-gray-800/50 rounded-2xl p-6 md:p-8 mb-8 backdrop-blur-sm"
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Your Vibe Breakdown</h3>
            {result.adaptiveFlow && (
              <div className="text-center mb-4">
                <span className="text-xs text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                  🧠 Adaptive Analysis • {result.questionsAsked} of {result.totalPossibleQuestions}+ questions
                </span>
              </div>
            )}
            <div className="space-y-6">
              {Object.entries(scores).map(([flag, score]) => {
                const maxScore = 30; // 10 questions × 3 points max
                const percentage = (score / maxScore) * 100;
                
                return (
                  <div key={flag} className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${
                          flag === 'green' ? 'bg-green-400' :
                          flag === 'red' ? 'bg-red-400' : 'bg-yellow-400'
                        }`} />
                        <span className="text-white font-medium">
                          {flag === 'beige' ? 'Mixed Signals' : `${flag.charAt(0).toUpperCase() + flag.slice(1)} Flags`}
                        </span>
                      </div>
                      <div className={`text-xl font-bold ${
                        flag === 'green' ? 'text-green-400' :
                        flag === 'red' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {score}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-gray-700/50 rounded-full h-3 border border-gray-600/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 1 + Object.keys(scores).indexOf(flag) * 0.3, duration: 1 }}
                          className={`h-full rounded-full relative overflow-hidden ${
                            flag === 'green' ? 'bg-gradient-to-r from-green-500 to-green-400' :
                            flag === 'red' ? 'bg-gradient-to-r from-red-500 to-red-400' : 
                            'bg-gradient-to-r from-yellow-500 to-yellow-400'
                          }`}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            animate={{ x: [-100, 200] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              ease: "linear",
                              repeatDelay: 1 
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-20 skew-x-12"
                          />
                        </motion.div>
                      </div>
                      
                      {/* Percentage label */}
                      <div className="text-xs text-gray-400 mt-1 text-right">
                        {Math.round(percentage)}% of max score
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>



          {/* Tone Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Choose Your Vibe</h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
              {Object.entries(toneConfig).map(([tone, config]) => {
                const IconComponent = config.icon;
                return (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`
                      flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base
                      ${selectedTone === tone 
                        ? config.bgColor 
                        : 'bg-gray-800/50 border-gray-600 hover:border-gray-400'
                      }
                    `}
                  >
                    <IconComponent size={18} className={selectedTone === tone ? config.color : 'text-gray-400'} />
                    <span className={selectedTone === tone ? config.color : 'text-gray-400'}>
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Response Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/50 rounded-2xl p-6 md:p-8 lg:p-10 mb-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {React.createElement(toneConfig[selectedTone].icon, {
                  size: 24,
                  className: toneConfig[selectedTone].color
                })}
                <h4 className={`text-lg font-semibold ${toneConfig[selectedTone].color}`}>
                  {toneConfig[selectedTone].label} Mode
                </h4>
              </div>
              <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
                {toneResponses[selectedTone]}
              </p>
              <div className="mt-4 text-xs text-gray-500 italic">
                💫 Each result is uniquely generated for you
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Share2 size={20} />
              Share Your Vibe
            </button>
            
            <button
              onClick={() => {
                // Clear any cached data and restart
                window.location.href = '/quiz';
              }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300"
            >
              <RotateCcw size={20} />
              Take Again
            </button>
          </motion.div>

          {/* Share Confirmation */}
          <AnimatePresence>
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
              >
                ✅ Copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultPage;