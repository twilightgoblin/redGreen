import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Trophy, Lightbulb, ScreenShare, Building2, User2, Sparkles, ChevronRight } from 'lucide-react';

// Icon mapping
const iconMap = {
  User: User,
  Trophy: Trophy,
  Lightbulb: Lightbulb,
  ScreenShare: ScreenShare,
  Building2: Building2,
  User2: User2
};

// Pixel class and PixelCard logic (keep as is from your original code)
class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) { return Math.random() * (max - min) + min; }
  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }
  appear() { /* ... same as your code ... */ }
  disappear() { /* ... same as your code ... */ }
  shimmer() { /* ... same as your code ... */ }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0, max = 100, throttle = 0.001;
  const parsed = parseInt(value, 10);
  if (parsed <= min || reducedMotion) return min;
  else if (parsed >= max) return max * throttle;
  else return parsed * throttle;
}

const PixelCard = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  const gap = 4;
  const speed = 35;
  const colors = '#06b6d4,#22d3ee,#67e8f9'; 

  const initPixels = () => { /* same as your original code */ };
  const doAnimate = fnName => { /* same as your original code */ };
  const handleAnimation = name => { /* same as your original code */ };
  const onMouseEnter = () => handleAnimation('appear');
  const onMouseLeave = () => handleAnimation('disappear');

  useEffect(() => { /* same as your original code */ }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-gray-800 ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ isolation: 'isolate' }}
    >
      <canvas 
        className="absolute inset-0 w-full h-full block pointer-events-none" 
        ref={canvasRef}
        style={{ zIndex: 1 }}
      />
      <div className="relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

// FeatureCard
const FeatureCard = ({ feature, index, side }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[feature.icon];
  
  return (
    <div
      className={`group relative transition-all duration-500 ${
        side === 'left' ? 'sm:pr-8' : 'sm:pl-8'
      }`}
      style={{
        animationDelay: `${index * 150}ms`,
        opacity: 0,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PixelCard className="transition-all duration-300">
        <div className={`relative bg-slate-950 rounded-2xl p-6 transition-all duration-300 ${feature.cornerStyle}`}>
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
              opacity: isHovered ? 1 : 0
            }}
          />
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-xl" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className={`relative p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 group-hover:from-cyan-400 group-hover:to-cyan-500 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 ${
                isHovered ? 'shadow-lg shadow-cyan-500/50' : ''
              }`}>
                <Icon className="w-6 h-6 text-white" />
                {isHovered && (
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-300 animate-pulse" />
                )}
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-600 transition-all duration-300 ${
                isHovered ? 'translate-x-1 text-cyan-400' : ''
              }`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
            <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-300 rounded-full transition-all duration-500" />
          </div>
        </div>
      </PixelCard>
    </div>
  );
};

// Main Feature Page
const FlagPulseFeatures = () => {
  const navigate = useNavigate(); // <-- for navigation

  const features = {
    leftFeatures: [
      { icon: "User", title: "Humanized Advice", description: "Get real feedback based on your answers — Comfort, Roast, or Truth modes.", position: "left", cornerStyle: "sm:translate-x-4 sm:rounded-br-[2px]" },
      { icon: "Trophy", title: "Spot Green Flags", description: "Learn what's working in your relationship or interactions and celebrate it.", position: "left", cornerStyle: "sm:-translate-x-4 sm:rounded-br-[2px]" },
      { icon: "Lightbulb", title: "Avoid Red Flags", description: "Identify potential issues early so you can make informed decisions.", position: "left", cornerStyle: "sm:translate-x-4 sm:rounded-tr-[2px]" }
    ],
    rightFeatures: [
      { icon: "ScreenShare", title: "Patch Suggestions", description: "Get practical, humanized advice to improve communication or situations.", position: "right", cornerStyle: "sm:-translate-x-4 sm:rounded-bl-[2px]" },
      { icon: "Building2", title: "Insightful Analytics", description: "Track patterns across answers to reveal personality tendencies or behavior signals.", position: "right", cornerStyle: "sm:translate-x-4 sm:rounded-bl-[2px]" },
      { icon: "User2", title: "Interactive Quiz Flow", description: "Answer questions in a dynamic, gamified experience to uncover flags accurately.", position: "right", cornerStyle: "sm:-translate-x-4 sm:rounded-tl-[2px]" }
    ],
    centerColumn: {
      header: "Key Benefits of FlagPulse",
      subHeader: "Discover green flags, spot red flags, and get practical advice in a fun, humanized way.",
      tag: "Features"
    }
  };

  const handleGetStarted = () => {
    navigate("/quiz"); // <-- Navigate to quiz page
  };

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4 overflow-hidden relative">
      {/* Styles */}
      <style>{`
        @keyframes fadeInUp { from {opacity:0; transform: translateY(30px);} to {opacity:1; transform: translateY(0);} }
        @keyframes float { 0%,100% {transform:translateY(0px);} 50% {transform:translateY(-20px);} }
        @keyframes pulse-glow { 0%,100% {opacity:0.3;} 50% {opacity:0.6;} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">{features.centerColumn.tag}</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500">{features.centerColumn.header}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">{features.centerColumn.subHeader}</p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-8">
            {features.leftFeatures.map((f, i) => <FeatureCard key={i} feature={f} index={i} side="left" />)}
          </div>
          <div className="hidden lg:flex items-center justify-center">
            {/* Center Orb visual (same as before) */}
            <div className="relative w-full max-w-xs">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-cyan-400 to-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse-glow" />
                <div className="absolute inset-4 bg-gradient-to-br from-cyan-500 via-cyan-400 to-cyan-600 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-8 bg-gradient-to-br from-cyan-500 via-cyan-400 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center border border-cyan-400/30">
                  <Sparkles className="w-20 h-20 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            {features.rightFeatures.map((f, i) => <FeatureCard key={i+3} feature={f} index={i+3} side="right" />)}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-20">
          <button
            onClick={handleGetStarted}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/60 transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              GET STARTED
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-300 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlagPulseFeatures;
