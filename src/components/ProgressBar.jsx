import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Progress</span>
        <span className="text-sm text-cyan-400 font-medium">
          {current} / {total}
        </span>
      </div>
      
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
        >
          {/* Animated shimmer effect */}
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
    </div>
  );
};

export default ProgressBar;