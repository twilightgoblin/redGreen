"use client";

import React from "react";
import { CardSpotlight } from "../components/ui/card-spotlight.jsx";
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
    <section className="relative w-full py-20 bg-gray-900 flex flex-col items-center justify-center text-center gap-8">
      <h2 className="text-4xl font-bold text-white">{aboutUs.title}</h2>
      <p className="text-lg text-white/70 max-w-3xl">{aboutUs.subTitle}</p>
      <p className="text-sm text-white/60 max-w-4xl">{aboutUs.description}</p>

      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {aboutUs.values.map((value, index) => {
          const IconComponent = iconMap[value.icon];
          return (
            <CardSpotlight
              key={index}
              radius={250}
              color="#1E1E1E"
              className="w-72 md:w-80 p-6"
            >
              <div className="text-white text-center flex flex-col items-center gap-4">
                {IconComponent && <IconComponent size={36} />}
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-sm opacity-80">{value.description}</p>
              </div>
            </CardSpotlight>
          );
        })}
      </div>
    </section>
  );
};
