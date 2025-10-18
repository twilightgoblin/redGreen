import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuestionCard from "../components/QuestionCard";
import VibeBreak from "../components/VibeBreak";
import ResultPage from "../components/ResultPage";
import ProgressBar from "../components/ProgressBar";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions] = useState(10);
  const [showVibeBreak, setShowVibeBreak] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({ green: 0, red: 0, beige: 0 });
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [backgroundGradient, setBackgroundGradient] = useState("from-gray-900 to-black");

  const startQuiz = async () => {
    try {
      const { mockAPI } = await import('../api/mockQuizAPI');
      
      // Clear any existing session first
      await mockAPI.clearSession(sessionId);
      
      const quizData = await mockAPI.startQuiz(sessionId);
      console.log('🎯 Started fresh quiz:', quizData);
      setCurrentQuestion(quizData.question);
      setQuestionNumber(quizData.questionNumber);
      setScores({ green: 0, red: 0, beige: 0 }); // Reset scores
      setLoading(false);
      setShowIntro(false);
    } catch (error) {
      console.error('Failed to start quiz:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initialize the quiz
    setLoading(false);
  }, []);

  useEffect(() => {
    // Update background based on dominant flag
    const dominant = getDominantFlag();
    switch (dominant) {
      case 'green':
        setBackgroundGradient("from-green-900/20 via-gray-900 to-black");
        break;
      case 'red':
        setBackgroundGradient("from-red-900/20 via-gray-900 to-black");
        break;
      case 'beige':
        setBackgroundGradient("from-yellow-900/20 via-gray-900 to-black");
        break;
      default:
        setBackgroundGradient("from-gray-900 to-black");
    }
  }, [scores]);

  const getDominantFlag = () => {
    const { green, red, beige } = scores;
    if (green >= red && green >= beige) return 'green';
    if (red >= green && red >= beige) return 'red';
    return 'beige';
  };

  const handleAnswer = async (selectedOption) => {
    try {
      const { mockAPI } = await import('../api/mockQuizAPI');
      
      // Find the option index
      const optionIndex = currentQuestion.options.findIndex(opt => 
        opt.text === selectedOption.text && 
        JSON.stringify(opt.flagImpact) === JSON.stringify(selectedOption.flagImpact)
      );
      
      if (optionIndex === -1) {
        console.error('Option not found');
        return;
      }
      
      const response = await mockAPI.answerQuestion(sessionId, currentQuestion.id, optionIndex);
      
      console.log('🎯 Adaptive answer response:', response);
      
      if (response.success) {
        // Update local scores
        setScores(response.scores);
        
        if (response.quizComplete) {
          // Quiz is complete, get final result
          console.log('🏁 Quiz completed with verdict:', response.verdict);
          await getResult();
        } else if (response.nextQuestion) {
          // Check if we should show vibe break (at question 5)
          if (response.nextQuestion.questionNumber === 5) {
            setShowVibeBreak(true);
            setTimeout(() => {
              setShowVibeBreak(false);
              setCurrentQuestion(response.nextQuestion.question);
              setQuestionNumber(response.nextQuestion.questionNumber);
            }, 5000);
          } else {
            // Move to next question immediately
            setCurrentQuestion(response.nextQuestion.question);
            setQuestionNumber(response.nextQuestion.questionNumber);
          }
        }
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const getResult = async () => {
    try {
      const { mockAPI } = await import('../api/mockQuizAPI');
      const resultData = await mockAPI.getResult(sessionId);
      setResult(resultData);
    } catch (error) {
      // Fallback result
      const dominant = getDominantFlag();
      const fallbackResult = {
        dominantFlag: dominant,
        scores: scores,
        toneResponses: {
          comfort: getComfortResponse(dominant),
          roast: getRoastResponse(dominant),
          truth: getTruthResponse(dominant)
        }
      };
      setResult(fallbackResult);
    }
    setShowResult(true);
  };

  const getComfortResponse = (flag) => {
    const responses = {
      green: "You're giving off such peaceful, balanced energy 🌿 You handle conflicts with grace and always try to see the best in people. That's a rare gift in this world.",
      red: "Hey, your passion is actually your superpower 🔥 You stand up for yourself and don't let people walk all over you. Sometimes the world needs that fire.",
      beige: "You're the master of reading the room and adapting 🤝 You know when to pick your battles and when to let things slide. That's emotional intelligence right there."
    };
    return responses[flag];
  };

  const getRoastResponse = (flag) => {
    const responses = {
      green: "Okay but like... do you ever get mad? 😭 Sometimes people need to know they messed up. Being too understanding might be why some folks keep walking all over you.",
      red: "Bestie, you're out here choosing violence as your first option 💀 Maybe try counting to 10 before you burn every bridge? Just a thought.",
      beige: "You're really out here playing 4D chess while everyone else is playing checkers 🤡 But sometimes people just need you to be direct instead of all mysterious."
    };
    return responses[flag];
  };

  const getTruthResponse = (flag) => {
    const responses = {
      green: "Real talk 👀 Your green flag energy is beautiful, but make sure you're not being green because you're afraid of conflict. Healthy boundaries aren't mean - they're necessary.",
      red: "You see red flags everywhere because you're looking for them 🚩 Sometimes your quick reactions protect you, but they might also be pushing away good people. Trust your gut, but maybe give people a chance to explain.",
      beige: "You're playing it safe, and honestly? That's smart 🧠 But don't let 'keeping the peace' become 'avoiding all confrontation.' Sometimes the uncomfortable conversations are the ones worth having."
    };
    return responses[flag];
  };

  const getVibeMessage = () => {
    const dominant = getDominantFlag();
    const messages = {
      green: "Your partner's looking pretty solid so far 💚 Halfway there - let's see if this holds up!",
      red: "Oop, seeing some red flags already 🚩 Let's dig deeper to confirm the pattern...",
      beige: "Your partner's sending mixed signals 🤷‍♀️ Halfway through - the picture is getting clearer..."
    };
    return messages[dominant];
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-200 text-lg">Loading your partner analysis...</p>
        </motion.div>
      </div>
    );
  }

  // Debug logging
  console.log('Quiz state:', { 
    loading, 
    showIntro, 
    showResult, 
    questionNumber,
    currentQuestion,
    scores
  });

  if (showResult && result) {
    return <ResultPage result={result} onRestart={() => window.location.reload()} />;
  }

  if (showIntro && !loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000 ease-in-out`}>
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => window.location.href = '/'}
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2"
            >
              ← Back to Home
            </button>
            <div className="text-cyan-400 font-semibold"> Red Or Green ?</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="text-6xl mb-6"
            >
              💘
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Red Or Green ?
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Answer honestly — we'll figure out if your partner is a Green Or Red Flag.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gray-800/50 rounded-2xl p-6 mb-8 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">What to expect:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">💚</span>
                  <span>Green = Healthy behaviors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">🚩</span>
                  <span>Red = Concerning patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🤷‍♀️</span>
                  <span>Mixed Signals = Inconsistent vibes</span>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={startQuiz}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Start Quiz ({totalQuestions} questions)
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000 ease-in-out`}>
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => window.location.href = '/'}
            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <div className="text-cyan-400 font-semibold">Partner Flag Finder 💘</div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 pt-20">
        <ProgressBar 
          current={questionNumber} 
          total={totalQuestions} 
        />
        
        <AnimatePresence mode="wait">
          {showVibeBreak ? (
            <VibeBreak 
              key="vibe-break"
              message={getVibeMessage()}
              questionNumber={questionNumber}
            />
          ) : currentQuestion ? (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
              onAnswer={handleAnswer}
            />
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-white text-center">
                <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading next question...</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
