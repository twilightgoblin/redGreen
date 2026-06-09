import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  User,
  Trophy,
  Lightbulb,
  ScreenShare,
  BarChart2,
  Users,
} from "lucide-react";
import SparkleNavbar from "../components/SparkleNavbar";

import { CardSpotlight } from "../components/ui/card-spotlight.jsx";


const features = [
  {
    icon: User,
    title: "Humanized Advice",
    description:
      "Get real feedback based on your answers — Comfort, Roast, or Truth modes tailored just for you.",
    tag: "Personalized",
  },
  {
    icon: Trophy,
    title: "Spot Green Flags",
    description:
      "Learn what's working in your relationship or interactions and celebrate the wins.",
    tag: "Awareness",
  },
  {
    icon: Lightbulb,
    title: "Avoid Red Flags",
    description:
      "Identify potential issues early so you can make informed, confident decisions.",
    tag: "Prevention",
  },
  {
    icon: ScreenShare,
    title: "Patch Suggestions",
    description:
      "Get practical, humanized advice to improve communication or turn tricky situations around.",
    tag: "Guidance",
  },
  {
    icon: BarChart2,
    title: "Insightful Analytics",
    description:
      "Track patterns across answers to reveal personality tendencies and behavior signals.",
    tag: "Insights",
  },
  {
    icon: Users,
    title: "Interactive Quiz Flow",
    description:
      "Answer questions in a dynamic, gamified experience designed to uncover flags accurately.",
    tag: "Engaging",
  },
];



const FlagPulseFeatures = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <SparkleNavbar
          items={["Home", "Features", "About", "How It Works", "Contact"]}
          color="#1E90FF"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.07),transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500 mb-5"
          >
            Features
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Everything you need to
            <br />
            <span className="text-cyan-400">read the room</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Discover green flags, spot red flags, and get practical advice
            in a fun, humanized way — built for real life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center"
          >
            <button
              onClick={() => navigate("/quiz")}
              className="neon-btn"
            >
              TRY IT NOW
            </button>
          </motion.div>

          <style>{`
            .neon-btn {
              position: relative;
              padding: 0.85em 3em;
              font-size: 1rem;
              font-weight: 700;
              letter-spacing: 0.12em;
              color: #fff;
              background: linear-gradient(135deg, #2dd4c8, #00CED1);
              border: none;
              border-radius: 100px;
              cursor: pointer;
              outline: none;
              box-shadow:
                0 0 8px #00e5ff,
                0 0 20px #00e5ff,
                0 0 45px #00c8d7,
                inset 0 0 12px rgba(255,255,255,0.15);
              transition: box-shadow 0.3s ease, transform 0.2s ease;
            }
            .neon-btn::before {
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
            .neon-btn:hover {
              box-shadow:
                0 0 12px #00e5ff,
                0 0 35px #00e5ff,
                0 0 70px #00c8d7,
                inset 0 0 18px rgba(255,255,255,0.2);
              transform: scale(1.04);
            }
            .neon-btn:active {
              transform: scale(0.98);
            }
          `}</style>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-3"
          >
            What RedGreen offers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-500 text-center mb-14 max-w-xl mx-auto text-sm"
          >
            Six features working together so you always know what's really going on.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
              >
                <CardSpotlight
                  radius={220}
                  color="#0e4c59"
                  className="p-6 h-full"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Tag */}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-600 mb-4 block">
                      {feature.tag}
                    </span>

                    {/* Icon */}
                    <div className="w-11 h-11 mb-5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <feature.icon size={20} className="text-cyan-400" />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">
                      {feature.description}
                    </p>

                    {/* Bottom divider */}
                    <div className="mt-6 h-px w-full bg-neutral-800 rounded-full" />
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default FlagPulseFeatures;
