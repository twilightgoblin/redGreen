import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import VibeBreak from "../components/VibeBreak";
import ResultPage from "../components/ResultPage";
import ProgressBar from "../components/ProgressBar";
import SparkleNavbar from "../components/SparkleNavbar";

const Quiz = () => {
  const [mode, setMode] = useState(null); // 'partner' or 'self' - null means show selection
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions] = useState(10);
  const [showVibeBreak, setShowVibeBreak] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scores, setScores] = useState({ green: 0, red: 0, beige: 0 });
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [backgroundGradient, setBackgroundGradient] = useState("from-gray-900 to-black");

  const startQuiz = async (selectedMode) => {
    try {
      setMode(selectedMode);
      setLoading(true);
      
      const { mockAPI } = await import('../api/mockQuizAPI');
      
      // Clear any existing session first
      await mockAPI.clearSession(sessionId);
      
      const quizData = await mockAPI.startQuiz(sessionId, selectedMode);
      console.log(`🎯 Started fresh ${selectedMode} quiz:`, quizData);
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
    // Initialize the quiz - show mode selection first
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
          comfort: getComfortResponse(dominant, mode),
          roast: getRoastResponse(dominant, mode),
          truth: getTruthResponse(dominant, mode)
        }
      };
      setResult(fallbackResult);
    }
    setShowResult(true);
  };

  const getComfortResponse = (flag, quizMode = mode) => {
    if (quizMode === 'self') {
      const responses = {
        green: "You're emotionally mature and know how to love right 💚 You handle relationships with grace and respect. That's beautiful energy to bring to the world.",
        red: "Hey, we all have areas to work on 🔥 Your awareness is the first step to growth. Sometimes recognizing patterns is the hardest part.",
        beige: "You're human, and that's perfectly okay 🤝 You have some great qualities and some areas for growth. That's normal and healthy."
      };
      return responses[flag];
    } else {
      const responses = {
        green: "You're giving off such peaceful, balanced energy 🌿 You handle conflicts with grace and always try to see the best in people. That's a rare gift in this world.",
        red: "Hey, your passion is actually your superpower 🔥 You stand up for yourself and don't let people walk all over you. Sometimes the world needs that fire.",
        beige: "You're the master of reading the room and adapting 🤝 You know when to pick your battles and when to let things slide. That's emotional intelligence right there."
      };
      return responses[flag];
    }
  };

  const getRoastResponse = (flag, quizMode = mode) => {
    if (quizMode === 'self') {
      const responses = {
        green: "Okay but like... are you sure you're not just people-pleasing? 😭 Sometimes being 'too nice' is actually avoiding conflict. Make sure you're not losing yourself trying to be perfect.",
        red: "Bestie, you might be the drama 💀 Time for some reflection. Maybe try asking 'Am I the problem?' before pointing fingers. Just a thought.",
        beige: "You're really out here being inconsistent and calling it 'complex' 🤡 Pick a lane - are you the green flag or the red flag? The mixed signals are confusing everyone."
      };
      return responses[flag];
    } else {
      const responses = {
        green: "Okay but like... do you ever get mad? 😭 Sometimes people need to know they messed up. Being too understanding might be why some folks keep walking all over you.",
        red: "Bestie, you're out here choosing violence as your first option 💀 Maybe try counting to 10 before you burn every bridge? Just a thought.",
        beige: "You're really out here playing 4D chess while everyone else is playing checkers 🤡 But sometimes people just need you to be direct instead of all mysterious."
      };
      return responses[flag];
    }
  };

  const getTruthResponse = (flag, quizMode = mode) => {
    if (quizMode === 'self') {
      const responses = {
        green: "Real talk 👀 You're emotionally mature and know how to love right. Keep nurturing these healthy patterns - they're rare and valuable. You're the prize, not the problem.",
        red: "You might be the drama 🚩 But awareness is the first step to growth. Reflect on these patterns, work on yourself, and remember - you can change. Growth is always possible.",
        beige: "You're human with both strengths and areas for growth 🧠 The key is consistency. Work on being the partner you'd want to have. Small changes make big differences."
      };
      return responses[flag];
    } else {
      const responses = {
        green: "Real talk 👀 Your green flag energy is beautiful, but make sure you're not being green because you're afraid of conflict. Healthy boundaries aren't mean - they're necessary.",
        red: "You see red flags everywhere because you're looking for them 🚩 Sometimes your quick reactions protect you, but they might also be pushing away good people. Trust your gut, but maybe give people a chance to explain.",
        beige: "You're playing it safe, and honestly? That's smart 🧠 But don't let 'keeping the peace' become 'avoiding all confrontation.' Sometimes the uncomfortable conversations are the ones worth having."
      };
      return responses[flag];
    }
  };

  const getVibeMessage = () => {
    const dominant = getDominantFlag();
    if (mode === 'self') {
      const messages = {
        green: "You're showing some healthy patterns so far 💚 Halfway there - let's see the full picture!",
        red: "Hmm, seeing some concerning patterns 🚩 Let's dig deeper to understand your relationship style...",
        beige: "You're giving mixed signals about yourself 🤷‍♀️ Halfway through - the picture is getting clearer..."
      };
      return messages[dominant];
    } else {
      const messages = {
        green: "Your partner's looking pretty solid so far 💚 Halfway there - let's see if this holds up!",
        red: "Oop, seeing some red flags already 🚩 Let's dig deeper to confirm the pattern...",
        beige: "Your partner's sending mixed signals 🤷‍♀️ Halfway through - the picture is getting clearer..."
      };
      return messages[dominant];
    }
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
          <p className="text-cyan-200 text-lg">
            {mode === 'self' ? 'Loading your self-assessment...' : 'Loading your partner analysis...'}
          </p>
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

  // Mode selection screen
  if (!mode && !loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000 ease-in-out`}>
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-50">
          <SparkleNavbar
            items={["Home", "Features", "About", "Contact"]}
            color="#1E90FF"
          />
        </div>
        
        <div className="flex items-center justify-center min-h-screen px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl w-full"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="text-6xl mb-6"
            >
              🤔
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4"
            >
              Choose Your Vibe Check
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed px-4"
            >
              What are we analyzing today?
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 mb-8 border border-gray-700/30"
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                Both quizzes use the same scoring system: <span className="text-green-400 font-medium">Green flags</span> for healthy patterns, 
                <span className="text-red-400 font-medium"> Red flags</span> for concerning behaviors, and 
                <span className="text-yellow-400 font-medium"> Mixed signals</span> for inconsistent patterns.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4"
            >
              <motion.button
                onClick={() => startQuiz('partner')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-cyan-700/10 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6 sm:p-8 text-white font-semibold transition-all duration-300 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/20 w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 text-center">
                  <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">💕</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-2">Test Your Partner</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                    Analyze their behavior patterns and discover if they're showing green or red flags in your relationship.
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400">
                    <span>Are they green or red?</span>
                    <span className="text-base sm:text-lg">🤔</span>
                  </div>
                </div>
              </motion.button>
              
              <motion.button
                onClick={() => startQuiz('self')}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-gradient-to-br from-red-500/10 via-pink-600/10 to-red-700/10 backdrop-blur-sm border border-red-400/20 rounded-2xl p-6 sm:p-8 text-white font-semibold transition-all duration-300 hover:border-red-400/40 hover:shadow-2xl hover:shadow-red-500/20 w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 text-center">
                  <div className="text-4xl sm:text-5xl mb-2 group-hover:scale-110 transition-transform duration-300">🪞</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-300 mb-2">Know Your Flag</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
                    Take an honest look at your own relationship behaviors and patterns. Self-awareness is the first step to growth.
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-red-400">
                    <span>Are you the problem or the prize?</span>
                    <span className="text-base sm:text-lg">✨</span>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (showIntro && !loading && mode) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${backgroundGradient} transition-all duration-1000 ease-in-out`}>
        {/* Navigation */}
        <div className="fixed top-0 left-0 w-full z-50">
          <SparkleNavbar
            items={["Home", "Features", "About", "Contact"]}
            color="#1E90FF"
          />
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
              {mode === 'self' ? 'Know Your Flag' : 'Red Or Green ?'}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {mode === 'self' 
                ? "Answer honestly — we'll figure out if you're the problem or the prize."
                : "Answer honestly — we'll figure out if your partner is a Green Or Red Flag."
              }
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
                  <span>{mode === 'self' ? 'Green = You\'re the prize' : 'Green = Healthy behaviors'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">🚩</span>
                  <span>{mode === 'self' ? 'Red = You might be the drama' : 'Red = Concerning patterns'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">🤷‍♀️</span>
                  <span>{mode === 'self' ? 'Mixed = You\'re human' : 'Mixed Signals = Inconsistent vibes'}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={() => {
                setShowIntro(false);
                // Start the actual quiz
                const initQuiz = async () => {
                  try {
                    setLoading(true);
                    const { mockAPI } = await import('../api/mockQuizAPI');
                    await mockAPI.clearSession(sessionId);
                    const quizData = await mockAPI.startQuiz(sessionId, mode);
                    setCurrentQuestion(quizData.question);
                    setQuestionNumber(quizData.questionNumber);
                    setScores({ green: 0, red: 0, beige: 0 });
                    setLoading(false);
                  } catch (error) {
                    console.error('Failed to start quiz:', error);
                    setLoading(false);
                  }
                };
                initQuiz();
              }}
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
      <div className="fixed top-0 left-0 w-full z-50">
        <SparkleNavbar
          items={["Home", "Features", "About", "Contact"]}
          color="#1E90FF"
        />
      </div>
      
      <div className="container mx-auto px-4 py-8 pt-20 mobile-container">
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
