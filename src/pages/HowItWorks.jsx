import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Play, 
  MessageCircle, 
  Target, 
  CheckCircle, 
  ArrowRight, 
  Lightbulb,
  Users,
  Brain,
  Heart,
  Shield
} from "lucide-react";
import SparkleNavbar from "../components/SparkleNavbar";
import { AnimatedButton } from "../components/ui/animated-button.jsx";
import { CardSpotlight } from "../components/ui/card-spotlight.jsx";
import Footer from "../components/Footer";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: Play,
      title: "Take the Quiz",
      description: "Start with our interactive quiz that presents real-life scenarios. Each question is designed to test your ability to spot green and red flags in various situations.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Brain,
      title: "Get Analyzed",
      description: "Our smart system analyzes your responses and identifies patterns in how you perceive situations, relationships, and social cues.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Target,
      title: "Receive Insights",
      description: "Get personalized feedback in three unique modes: Comfort (supportive), Roast (brutally honest), or Truth (balanced perspective).",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Apply & Improve",
      description: "Use your insights to make better decisions in real life. Track your progress and retake quizzes to see how you've grown.",
      color: "from-cyan-400 to-cyan-600"
    }
  ];

  const modes = [
    {
      icon: Heart,
      title: "Comfort Mode",
      description: "Gentle, supportive feedback that encourages growth while being kind to your feelings.",
      color: "text-pink-400",
      bgColor: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: Shield,
      title: "Roast Mode", 
      description: "Brutally honest, no-nonsense feedback that calls out your blind spots without sugar-coating.",
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Lightbulb,
      title: "Truth Mode",
      description: "Balanced, objective analysis that gives you the facts while remaining constructive.",
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-amber-500/20"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Real-Life Scenarios",
      description: "Questions based on actual dating, friendship, and workplace situations you encounter daily."
    },
    {
      icon: Brain,
      title: "Smart Analysis",
      description: "Advanced algorithms that understand context and nuance in your responses."
    },
    {
      icon: Target,
      title: "Actionable Advice",
      description: "Not just insights, but practical steps you can take to improve your situation awareness."
    }
  ];

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
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            How{" "}
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              RedGreen
            </span>{" "}
            Works
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Master the art of reading situations, people, and vibes. Our interactive system helps you develop better judgment through personalized quizzes and insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <AnimatedButton
              onClick={() => navigate("/quiz")}
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
              style={{ padding: "0.75em 2em", fontSize: "1.1rem" }}
            >
              Try It Now
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            Four Simple Steps
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <CardSpotlight
                  radius={200}
                  color="#0e4c59"
                  className="p-6 h-full"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                      <step.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-cyan-200">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </CardSpotlight>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-cyan-400" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-6"
          >
            Choose Your Feedback Style
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Get insights delivered in the tone that works best for you. Each mode provides the same valuable information, just with a different approach.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {modes.map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <CardSpotlight
                  radius={250}
                  color="#0e4c59"
                  className="p-8 h-full"
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${mode.bgColor} flex items-center justify-center border border-gray-700`}>
                      <mode.icon size={32} className={mode.color} />
                    </div>
                    <h3 className={`text-2xl font-semibold mb-4 ${mode.color}`}>
                      {mode.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16"
          >
            What Makes Us Different
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-200">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Ready to Level Up Your Vibe-Reading Skills?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12"
          >
            Join thousands of users who've improved their ability to read situations and make better decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <AnimatedButton
              onClick={() => navigate("/quiz")}
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
              style={{ padding: "0.75em 2em", fontSize: "1.1rem" }}
            >
              Start Quiz
            </AnimatedButton>
            
            <AnimatedButton
              onClick={() => navigate("/")}
              className="text-cyan-400 font-semibold border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              variant="outline"
              size="default"
              rounded="custom"
              borderRadius="100px"
              style={{ padding: "0.75em 2em", fontSize: "1.1rem" }}
            >
              Learn More
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HowItWorks;