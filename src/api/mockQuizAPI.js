// Mock API functions for quiz functionality
// In a real app, these would be actual API calls

// Helper function to shuffle array elements using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to shuffle options in a question while preserving the structure and scoring
// This ensures that the same pointing system is maintained for both partner and self assessments
// but the options appear in random order to prevent pattern recognition
function shuffleQuestionOptions(question) {
  return {
    ...question,
    options: shuffleArray(question.options)
  };
}

// Helper function to create shuffled versions of all questions at the start of quiz
function createShuffledQuestionBank(mode = 'partner') {
  if (mode === 'self') {
    // Shuffle both the question order AND the options within each question
    const shuffledQuestions = shuffleArray(selfQuestionBank.questions);
    return {
      questions: shuffledQuestions.map(q => shuffleQuestionOptions(q))
    };
  }

  // For partner mode, shuffle all questions in all categories
  const shuffledBank = {
    starters: questionBank.starters.map(q => shuffleQuestionOptions(q)),
    themes: {}
  };

  // Shuffle questions in each theme
  Object.keys(questionBank.themes).forEach(theme => {
    shuffledBank.themes[theme] = questionBank.themes[theme].map(q => shuffleQuestionOptions(q));
  });

  return shuffledBank;
}

// Adaptive question system - questions are organized by themes and follow-ups
const questionBank = {
  // Pool of good starter questions - randomly selected
  starters: [
    {
      "id": "start_1",
      "text": "Your partner gets a message from an ex. How do they react?",
      "theme": "trust_boundaries",
      "options": [
        {
          "text": "They ignore it and respect boundaries.",
          "flagImpact": { "green": 3, "beige": 0, "red": 0 },
          "followUpThemes": ["communication", "respect", "support"]
        },
        {
          "text": "They respond casually and tell me about it.",
          "flagImpact": { "green": 2, "beige": 1, "red": 0 },
          "followUpThemes": ["communication", "boundaries", "trust"]
        },
        {
          "text": "They respond but seem secretive about it.",
          "flagImpact": { "green": 0, "beige": 2, "red": 1 },
          "followUpThemes": ["trust", "communication", "honesty"]
        },
        {
          "text": "They hide it or lie to me about it.",
          "flagImpact": { "green": 0, "beige": 0, "red": 3 },
          "followUpThemes": ["trust", "honesty", "control"]
        }
      ]
    },
    {
      "id": "start_2",
      "text": "When you argue, how do they react?",
      "theme": "communication",
      "options": [
        {
          "text": "Stays calm and works toward a solution.",
          "flagImpact": { "green": 3, "beige": 0, "red": 0 },
          "followUpThemes": ["support", "respect", "growth"]
        },
        {
          "text": "Gets a bit defensive but eventually talks it out.",
          "flagImpact": { "green": 1, "beige": 2, "red": 0 },
          "followUpThemes": ["communication", "emotional_support", "growth"]
        },
        {
          "text": "Shuts down or avoids the conversation.",
          "flagImpact": { "green": 0, "beige": 2, "red": 1 },
          "followUpThemes": ["emotional_support", "conflict", "boundaries"]
        },
        {
          "text": "Gets aggressive, yells, or storms out.",
          "flagImpact": { "green": 0, "beige": 0, "red": 3 },
          "followUpThemes": ["control", "respect", "emotional_support"]
        }
      ]
    },
    {
      "id": "start_3",
      "text": "How well do they respect your boundaries?",
      "theme": "respect",
      "options": [
        {
          "text": "Perfectly - they never cross lines.",
          "flagImpact": { "green": 3, "beige": 0, "red": 0 },
          "followUpThemes": ["support", "growth", "communication"]
        },
        {
          "text": "Pretty well, with occasional slip-ups.",
          "flagImpact": { "green": 2, "beige": 1, "red": 0 },
          "followUpThemes": ["communication", "consistency", "trust"]
        },
        {
          "text": "Sometimes they test or push boundaries.",
          "flagImpact": { "green": 0, "beige": 2, "red": 1 },
          "followUpThemes": ["boundaries", "communication", "respect"]
        },
        {
          "text": "They regularly ignore or violate my boundaries.",
          "flagImpact": { "green": 0, "beige": 0, "red": 3 },
          "followUpThemes": ["control", "boundaries", "emotional_support"]
        }
      ]
    },
    {
      "id": "start_4",
      "text": "How do they react when you achieve something big?",
      "theme": "support",
      "options": [
        {
          "text": "They're genuinely excited and celebrate with me.",
          "flagImpact": { "green": 3, "beige": 0, "red": 0 },
          "followUpThemes": ["growth", "respect", "communication"]
        },
        {
          "text": "They're happy for me but not overly enthusiastic.",
          "flagImpact": { "green": 1, "beige": 2, "red": 0 },
          "followUpThemes": ["emotional_support", "priorities", "communication"]
        },
        {
          "text": "They seem indifferent or change the subject.",
          "flagImpact": { "green": 0, "beige": 2, "red": 1 },
          "followUpThemes": ["emotional_support", "priorities", "selfishness"]
        },
        {
          "text": "They downplay it or seem jealous/competitive.",
          "flagImpact": { "green": 0, "beige": 0, "red": 3 },
          "followUpThemes": ["control", "emotional_support", "respect"]
        }
      ]
    },
    {
      "id": "start_5",
      "text": "When you need to vent, how do they respond?",
      "theme": "emotional_support",
      "options": [
        {
          "text": "They give me their full attention and support.",
          "flagImpact": { "green": 3, "beige": 0, "red": 0 },
          "followUpThemes": ["support", "growth", "respect"]
        },
        {
          "text": "They listen and try to help, though sometimes distracted.",
          "flagImpact": { "green": 2, "beige": 1, "red": 0 },
          "followUpThemes": ["emotional_support", "priorities", "communication"]
        },
        {
          "text": "They half-listen or seem bored by it.",
          "flagImpact": { "green": 0, "beige": 2, "red": 1 },
          "followUpThemes": ["emotional_support", "priorities", "respect"]
        },
        {
          "text": "They dismiss my feelings or make it about them.",
          "flagImpact": { "green": 0, "beige": 0, "red": 3 },
          "followUpThemes": ["control", "emotional_support", "respect"]
        }
      ]
    }
  ],

  // Theme-based question pools
  themes: {
    communication: [
      {
        "id": "comm_new_1",
        "text": "How do they communicate when they're stressed?",
        "theme": "communication",
        "options": [
          {
            "text": "They tell me what's wrong and ask for support.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "emotional_support", "trust"]
          },
          {
            "text": "They're a bit moody but eventually open up.",
            "flagImpact": { "green": 1, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_support", "patience", "communication"]
          },
          {
            "text": "They become distant and shut me out.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["emotional_support", "boundaries", "trust"]
          },
          {
            "text": "They take their stress out on me.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "emotional_abuse", "respect"]
          }
        ]
      }
    ],

    trust: [
      {
        "id": "trust_1",
        "text": "How do they handle important decisions that affect both of you?",
        "theme": "trust",
        "options": [
          {
            "text": "Always discuss it with me first and value my input.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "support", "partnership"]
          },
          {
            "text": "Usually include me, but sometimes decide alone.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "priorities", "respect"]
          },
          {
            "text": "Often forget to include me or tell me after.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["communication", "priorities", "consideration"]
          },
          {
            "text": "Make decisions without me and expect me to go along.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      },
      {
        "id": "trust_2",
        "text": "How much do they trust your judgment and decisions?",
        "theme": "trust",
        "options": [
          {
            "text": "Completely - they respect my choices.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "respect"]
          },
          {
            "text": "Mostly, but sometimes question bigger decisions.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "support", "trust"]
          },
          {
            "text": "It depends on their mood or the situation.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "emotional_support", "communication"]
          },
          {
            "text": "They constantly doubt or second-guess me.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    respect: [
      {
        "id": "respect_2",
        "text": "How well do they respect your personal space and alone time?",
        "theme": "respect",
        "options": [
          {
            "text": "Perfectly - they understand when I need space.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "support", "growth"]
          },
          {
            "text": "Pretty well, but sometimes want more attention than I can give.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["boundaries", "communication", "balance"]
          },
          {
            "text": "They struggle with it and sometimes overstep.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["boundaries", "communication", "consistency"]
          },
          {
            "text": "They don't respect it at all and can be controlling.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "boundaries", "emotional_support"]
          }
        ]
      }
    ],

    support: [
      {
        "id": "support_2",
        "text": "How do they react when you spend time on your hobbies or with friends?",
        "theme": "support",
        "options": [
          {
            "text": "They're genuinely encouraging and interested in what I enjoy.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["growth", "trust", "respect"]
          },
          {
            "text": "They're supportive but sometimes seem a bit left out.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["insecurity", "communication", "balance"]
          },
          {
            "text": "They're mostly indifferent or distracted by their own things.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["priorities", "emotional_support", "communication"]
          },
          {
            "text": "They act jealous, possessive, or try to discourage it.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "boundaries", "trust"]
          }
        ]
      }
    ],

    emotional_support: [
      {
        "id": "emotion_1",
        "text": "How well do they support you emotionally when you're going through tough times?",
        "theme": "emotional_support",
        "options": [
          {
            "text": "They're incredibly supportive and always there for me.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["growth", "communication", "respect"]
          },
          {
            "text": "They try to help but sometimes don't know what to say.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "emotional_intelligence", "effort"]
          },
          {
            "text": "They're inconsistent - sometimes supportive, sometimes not.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "priorities", "communication"]
          },
          {
            "text": "They're dismissive, make it about them, or use it against me.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "boundaries", "respect"]
          }
        ]
      },
      {
        "id": "emotion_2",
        "text": "How often do they give you genuine compliments and show appreciation?",
        "theme": "emotional_support",
        "options": [
          {
            "text": "Regularly and sincerely - they make me feel valued.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "communication"]
          },
          {
            "text": "Sometimes, but it feels genuine when they do.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["consistency", "communication", "effort"]
          },
          {
            "text": "Rarely, and when they do it feels forced or generic.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "communication", "priorities"]
          },
          {
            "text": "Almost never, or only when they want something from me.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    control: [
      {
        "id": "control_1",
        "text": "When they have to cancel plans last minute, how do they handle it?",
        "theme": "control",
        "options": [
          {
            "text": "They apologize sincerely and explain the genuine reason.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "trust"]
          },
          {
            "text": "They let me know but don't seem too concerned about it.",
            "flagImpact": { "green": 1, "beige": 2, "red": 0 },
            "followUpThemes": ["consideration", "priorities", "communication"]
          },
          {
            "text": "They give vague excuses or seem to expect me to just deal with it.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["communication", "honesty", "priorities"]
          },
          {
            "text": "They blame me, get defensive, or make it my fault somehow.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["boundaries", "respect", "emotional_support"]
          }
        ]
      },
      {
        "id": "control_2",
        "text": "They check in with you multiple times throughout the day. How does this make you feel?",
        "theme": "control",
        "options": [
          {
            "text": "Loved and cared for - it feels sweet and genuine.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "communication", "support"]
          },
          {
            "text": "Mostly good, though sometimes it feels like a bit much.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["boundaries", "communication", "balance"]
          },
          {
            "text": "Overwhelmed - it feels excessive and clingy.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["boundaries", "communication", "space"]
          },
          {
            "text": "Suffocated and controlled - like they're monitoring me.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["boundaries", "respect", "trust"]
          }
        ]
      }
    ],

    growth: [
      {
        "id": "growth_1",
        "text": "How do they respond to your personal growth and self-improvement efforts?",
        "theme": "growth",
        "options": [
          {
            "text": "They actively encourage and celebrate my growth.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "respect", "trust"]
          },
          {
            "text": "They're supportive but not particularly invested in it.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["priorities", "communication", "support"]
          },
          {
            "text": "They're indifferent or sometimes seem annoyed by changes in me.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["resistance", "communication", "insecurity"]
          },
          {
            "text": "They actively discourage it or try to hold me back.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "boundaries", "respect"]
          }
        ]
      },
      {
        "id": "growth_2",
        "text": "How do they respond to your career goals and ambitions?",
        "theme": "growth",
        "options": [
          {
            "text": "They're my biggest cheerleader and actively support my goals.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "trust", "communication"]
          },
          {
            "text": "They're generally supportive but not super engaged.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["priorities", "emotional_support", "communication"]
          },
          {
            "text": "They seem neutral or distracted when I talk about work.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["priorities", "emotional_support", "interest"]
          },
          {
            "text": "They're discouraging, competitive, or try to undermine me.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "support"]
          }
        ]
      }
    ],

    boundaries: [
      {
        "id": "bound_1",
        "text": "When they make a mistake that affects you, how do they handle it?",
        "theme": "boundaries",
        "options": [
          {
            "text": "They apologize sincerely and take steps to fix it.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "growth"]
          },
          {
            "text": "They apologize but don't seem to learn from it.",
            "flagImpact": { "green": 1, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "communication", "growth"]
          },
          {
            "text": "They give a half-hearted apology and move on quickly.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "communication", "respect"]
          },
          {
            "text": "They blame me, deny it, or get defensive.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "emotional_support"]
          }
        ]
      },
      {
        "id": "bound_2",
        "text": "How readily do they apologize when they've done something wrong?",
        "theme": "boundaries",
        "options": [
          {
            "text": "They apologize quickly and sincerely without being asked.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "growth"]
          },
          {
            "text": "They apologize when I bring it up, and it seems genuine.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "awareness", "growth"]
          },
          {
            "text": "They apologize reluctantly or it feels forced.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "emotional_support", "communication"]
          },
          {
            "text": "They rarely or never apologize, even when clearly wrong.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    honesty: [
      {
        "id": "honest_1",
        "text": "How do they talk about your relationship when they're with their friends?",
        "theme": "honesty",
        "options": [
          {
            "text": "Always respectfully and positively, protecting our privacy.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "trust", "support"]
          },
          {
            "text": "Generally positive but sometimes shares more than I'd like.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["boundaries", "communication", "respect"]
          },
          {
            "text": "Neutral or sometimes complains about relationship issues.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["boundaries", "communication", "loyalty"]
          },
          {
            "text": "Gossips, mocks me, or shares private details inappropriately.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["respect", "boundaries", "emotional_support"]
          }
        ]
      }
    ],

    consistency: [
      {
        "id": "consist_1",
        "text": "How consistently do they celebrate your achievements and milestones?",
        "theme": "consistency",
        "options": [
          {
            "text": "Always with genuine excitement and pride in me.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "communication"]
          },
          {
            "text": "Usually supportive, but the enthusiasm varies.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["consistency", "emotional_support", "communication"]
          },
          {
            "text": "Polite acknowledgment but not much genuine excitement.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["emotional_support", "priorities", "communication"]
          },
          {
            "text": "Often downplays it, seems jealous, or makes it about them.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "support"]
          }
        ]
      }
    ],

    priorities: [
      {
        "id": "prior_1",
        "text": "How do they handle conflicts with their friends or family members?",
        "theme": "priorities",
        "options": [
          {
            "text": "Always mature, respectful, and solution-focused.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "growth"]
          },
          {
            "text": "Generally mature but sometimes gets a bit heated.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["emotional_regulation", "communication", "growth"]
          },
          {
            "text": "Can be passive-aggressive or avoidant during conflicts.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["communication", "emotional_support", "boundaries"]
          },
          {
            "text": "Often explosive, dramatic, or creates unnecessary drama.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "boundaries", "respect"]
          }
        ]
      },
      {
        "id": "q26",
        "text": "How do they treat your friends and family members?",
        "theme": "priorities",
        "options": [
          {
            "text": "Always respectful, kind, and makes an effort to connect.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "support", "communication"]
          },
          {
            "text": "Generally polite but doesn't go out of their way.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["effort", "social_skills", "priorities"]
          },
          {
            "text": "Neutral or sometimes awkward, but not rude.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["communication", "social_skills", "effort"]
          },
          {
            "text": "Often disrespectful, judgmental, or tries to isolate me from them.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    // New themes for additional questions
    social_media: [
      {
        "id": "q21",
        "text": "When your partner posts about you on social media, what's the vibe?",
        "theme": "social_media",
        "options": [
          {
            "text": "Genuinely proud and loving posts that make me feel special.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "support", "pride"]
          },
          {
            "text": "Sweet posts occasionally, but nothing too over-the-top.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["consistency", "effort", "communication"]
          },
          {
            "text": "Rarely posts about me, and when they do it's pretty generic.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["priorities", "effort", "communication"]
          },
          {
            "text": "Uses posts to show off, make others jealous, or be passive-aggressive.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "manipulation", "boundaries"]
          }
        ]
      },
      {
        "id": "q30",
        "text": "How do they handle your digital privacy (phone, social media, etc.)?",
        "theme": "social_media",
        "options": [
          {
            "text": "Complete respect - they never snoop or ask to check my stuff.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "respect", "boundaries"]
          },
          {
            "text": "Generally respectful but occasionally ask to see something.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["trust", "communication", "boundaries"]
          },
          {
            "text": "Sometimes snoop or look through my stuff when I'm not around.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["trust", "boundaries", "insecurity"]
          },
          {
            "text": "Regularly check my phone/social media without permission.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "boundaries", "trust"]
          }
        ]
      }
    ],

    thoughtfulness: [
      {
        "id": "q22",
        "text": "How often do they surprise you with thoughtful gestures or gifts?",
        "theme": "thoughtfulness",
        "options": [
          {
            "text": "Regularly with heartfelt, personal touches that show they know me.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "effort", "love_language"]
          },
          {
            "text": "Sometimes with sweet gestures, though not super elaborate.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["effort", "consistency", "communication"]
          },
          {
            "text": "Occasionally, but it's usually pretty generic or last-minute.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["effort", "priorities", "communication"]
          },
          {
            "text": "Rarely, and when they do it feels selfish or like they want something.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["selfishness", "effort", "emotional_support"]
          }
        ]
      },
      {
        "id": "q29",
        "text": "How do they react to your quirks and weird habits?",
        "theme": "thoughtfulness",
        "options": [
          {
            "text": "They love and celebrate all my weird quirks - it's part of what they adore about me.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["acceptance", "support", "love"]
          },
          {
            "text": "They find most of them endearing, though some they don't quite get.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["acceptance", "understanding", "communication"]
          },
          {
            "text": "They laugh at them but sometimes tease me in ways that sting.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["boundaries", "sensitivity", "communication"]
          },
          {
            "text": "They judge, criticize, or try to change my quirks.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "acceptance", "respect"]
          }
        ]
      }
    ],

    crisis_handling: [
      {
        "id": "q23",
        "text": "When they're upset about something, how do they communicate with you?",
        "theme": "crisis_handling",
        "options": [
          {
            "text": "They calmly explain what's wrong and how they're feeling.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "emotional_intelligence", "maturity"]
          },
          {
            "text": "They eventually open up but need some time to process first.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "emotional_processing", "patience"]
          },
          {
            "text": "They're moody and vague - I have to guess what's wrong.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["communication", "emotional_support", "consistency"]
          },
          {
            "text": "They either ghost me completely or explode without explanation.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "communication", "emotional_regulation"]
          }
        ]
      },
      {
        "id": "q31",
        "text": "How do they react if you're upset?",
        "theme": "crisis_handling",
        "options": [
          {
            "text": "Comforts and listens patiently.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["emotional_support", "empathy", "care"]
          },
          {
            "text": "Gets annoyed or distant.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_support", "patience", "priorities"]
          },
          {
            "text": "Gaslights or dismisses feelings.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["manipulation", "emotional_abuse", "boundaries"]
          }
        ]
      },
      {
        "id": "q34",
        "text": "Do they handle stress and anger constructively?",
        "theme": "crisis_handling",
        "options": [
          {
            "text": "Yes, calmly and respectfully.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["emotional_regulation", "maturity", "respect"]
          },
          {
            "text": "Sometimes lashes out.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_regulation", "consistency", "boundaries"]
          },
          {
            "text": "Explosive, blames others.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "emotional_abuse", "accountability"]
          }
        ]
      }
    ],

    financial_responsibility: [
      {
        "id": "q24",
        "text": "How do they handle money and financial responsibilities?",
        "theme": "financial_responsibility",
        "options": [
          {
            "text": "Very responsibly - transparent, budgets well, and discusses big purchases.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "maturity", "partnership"]
          },
          {
            "text": "Generally good but sometimes makes impulsive purchases.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["consistency", "communication", "self_control"]
          },
          {
            "text": "Inconsistent - sometimes careful, sometimes careless with money.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "priorities", "communication"]
          },
          {
            "text": "Irresponsible, secretive, or expects me to handle all the finances.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["trust", "honesty", "red_flags"]
          }
        ]
      }
    ],

    accountability: [
      {
        "id": "q25",
        "text": "Do they apologize when they mess up?",
        "theme": "accountability",
        "options": [
          {
            "text": "Yes, sincerely and immediately.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["maturity", "respect", "growth"]
          },
          {
            "text": "Half-heartedly.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["sincerity", "effort", "communication"]
          },
          {
            "text": "Never, blames you instead.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["manipulation", "control", "gaslighting"]
          }
        ]
      },
      {
        "id": "q27",
        "text": "Do they handle criticism well?",
        "theme": "accountability",
        "options": [
          {
            "text": "Yes, maturely and thoughtfully.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["growth", "maturity", "communication"]
          },
          {
            "text": "Defensive sometimes.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["insecurity", "communication", "growth"]
          },
          {
            "text": "Explosive or dismissive.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "emotional_regulation", "respect"]
          }
        ]
      },
      {
        "id": "q35",
        "text": "Do they admit when they don't know something?",
        "theme": "accountability",
        "options": [
          {
            "text": "Yes, honest and humble.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["honesty", "humility", "growth"]
          },
          {
            "text": "Sometimes pretends to know.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["insecurity", "honesty", "pride"]
          },
          {
            "text": "Never admits mistakes, fakes confidence.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["manipulation", "pride", "dishonesty"]
          }
        ]
      }
    ],

    future_planning: [
      {
        "id": "q28",
        "text": "Do they communicate future plans with you?",
        "theme": "future_planning",
        "options": [
          {
            "text": "Yes, involves you in decisions.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["partnership", "respect", "commitment"]
          },
          {
            "text": "Sometimes forgets or vague.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "priorities", "consideration"]
          },
          {
            "text": "Never considers your opinion.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "disrespect", "selfishness"]
          }
        ]
      }
    ],

    reliability: [
      {
        "id": "q32",
        "text": "Do they keep promises?",
        "theme": "reliability",
        "options": [
          {
            "text": "Always follow through.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "consistency", "respect"]
          },
          {
            "text": "Sometimes forget or delay.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "priorities", "organization"]
          },
          {
            "text": "Often break promises.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["trust", "disrespect", "unreliability"]
          }
        ]
      }
    ],

    personal_growth: [
      {
        "id": "q33",
        "text": "Do they encourage self-care and personal growth?",
        "theme": "personal_growth",
        "options": [
          {
            "text": "Yes, regularly supports growth.",
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "partnership"]
          },
          {
            "text": "Sometimes, inconsistent.",
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "priorities", "support"]
          },
          {
            "text": "Discourages or mocks self-improvement.",
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "insecurity", "sabotage"]
          }
        ]
      }
    ],

    empathy: [
      {
        "id": "q36",
        "text": "How well do they understand and respond to your emotions?",
        "theme": "empathy",
        "options": [
          {
            "text": "They're incredibly intuitive and supportive.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["emotional_intelligence", "care", "connection"]
          },
          {
            "text": "They try to understand but sometimes miss the mark.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "emotional_support", "effort"]
          },
          {
            "text": "They notice but don't really know how to help.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["emotional_support", "communication", "growth"]
          },
          {
            "text": "They're oblivious or dismissive of my feelings.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["emotional_neglect", "disrespect", "invalidation"]
          }
        ]
      }
    ],

    // New themes to prevent repetition
    conflict_resolution: [
      {
        "id": "conflict_1",
        "text": "When you disagree about something important, how do they handle it?",
        "theme": "conflict_resolution",
        "options": [
          {
            "text": "They listen to my perspective and work toward compromise.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "partnership"]
          },
          {
            "text": "They argue their point but eventually find middle ground.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["communication", "stubbornness", "compromise"]
          },
          {
            "text": "They get stubborn and refuse to budge on their position.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["stubbornness", "communication", "flexibility"]
          },
          {
            "text": "They shut down the conversation or get aggressive.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "communication", "respect"]
          }
        ]
      }
    ],

    daily_interactions: [
      {
        "id": "daily_1",
        "text": "How do they treat you during regular, everyday moments?",
        "theme": "daily_interactions",
        "options": [
          {
            "text": "Consistently kind, affectionate, and considerate.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["consistency", "love", "respect"]
          },
          {
            "text": "Generally good, with occasional off days.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["consistency", "moods", "communication"]
          },
          {
            "text": "Hot and cold - sometimes sweet, sometimes distant.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["consistency", "emotional_regulation", "confusion"]
          },
          {
            "text": "Often irritable, critical, or dismissive.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["emotional_abuse", "criticism", "respect"]
          }
        ]
      }
    ],

    independence: [
      {
        "id": "independence_1",
        "text": "How do they react when you want to spend time with friends or pursue hobbies?",
        "theme": "independence",
        "options": [
          {
            "text": "They encourage it and are happy I have my own interests.",
            "flagImpact": { "green": 3, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "trust", "healthy_boundaries"]
          },
          {
            "text": "They're fine with it but sometimes seem a bit left out.",
            "flagImpact": { "green": 2, "beige": 1, "red": 0 },
            "followUpThemes": ["insecurity", "communication", "balance"]
          },
          {
            "text": "They act hurt or make me feel guilty about it.",
            "flagImpact": { "green": 0, "beige": 2, "red": 1 },
            "followUpThemes": ["manipulation", "guilt", "boundaries"]
          },
          {
            "text": "They try to discourage it or create drama about it.",
            "flagImpact": { "green": 0, "beige": 0, "red": 3 },
            "followUpThemes": ["control", "isolation", "manipulation"]
          }
        ]
      }
    ]
  }
};

// Self-assessment question bank - using the provided questions
const selfQuestionBank = {
  questions: [
    {
      "id": 1,
      "text": "Your partner mentions their ex had a great sense of humor. How do you react?",
      "options": [
        { "text": "That's nice, everyone has good qualities.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Cool, but let's talk about something else.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Am I not funny enough for you?", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Why are you even thinking about them?", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 2,
      "text": "Your partner gets a text from someone attractive at 11 PM. What's your move?",
      "options": [
        { "text": "Trust them completely, no questions.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Casually ask who it was later.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Check their phone when they're not looking.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Demand to see the conversation right now.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 3,
      "text": "You see your partner laughing at someone else's Instagram story. Your reaction?",
      "options": [
        { "text": "Good for them, everyone needs laughs.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Wonder what was so funny but don't ask.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Ask to see what they're laughing at.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Feel jealous they're not laughing at your posts.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 4,
      "text": "Your partner wants to hang out with friends instead of you tonight. How do you feel?",
      "options": [
        { "text": "Happy they have good friendships.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "A little disappointed but totally fine.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Hurt that they'd choose friends over me.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Angry and make them feel guilty about it.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 5,
      "text": "Your partner gets promoted at work. Your first thought is:",
      "options": [
        { "text": "I'm so proud of them and their hard work!", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "That's great, hope they still have time for us.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Now they'll think they're better than me.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Great, now they'll be even busier and ignore me.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 6,
      "text": "Your partner starts a new hobby you don't understand. What do you do?",
      "options": [
        { "text": "Ask them to teach me about it.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Support them even if it's not my thing.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Make jokes about how weird it is.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Complain that they're wasting time on it.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 7,
      "text": "You and your partner have different political views. How do you handle it?",
      "options": [
        { "text": "Respect their perspective and have healthy debates.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Agree to disagree and avoid the topic.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Try to convince them they're wrong.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Get angry and question the relationship.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 8,
      "text": "Your partner's family doesn't seem to like you. What's your approach?",
      "options": [
        { "text": "Keep being kind and give it time.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Try harder to win them over.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Complain to my partner about them.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Make my partner choose between me and them.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 9,
      "text": "Your partner is going through a tough time at work. How do you support them?",
      "options": [
        { "text": "Listen actively and offer comfort without trying to fix everything.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Give advice on how to handle the situation.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Get frustrated that they're always stressed.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Make it about how their stress affects me.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 10,
      "text": "Your partner makes a big decision without consulting you. What's your reaction?",
      "options": [
        { "text": "Ask why they didn't include me and discuss it calmly.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Feel hurt but try to understand their reasoning.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Get upset and make them feel guilty.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Explode and demand they change their decision.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 11,
      "text": "You find out your partner has been venting about your relationship to their friends. How do you feel?",
      "options": [
        { "text": "Glad they have support, but want to talk about it together.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "A bit hurt but understand they need to vent sometimes.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Betrayed that they shared our private business.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Furious and demand they stop talking to those friends.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 12,
      "text": "Your partner wants to move to a different city for their career. What's your response?",
      "options": [
        { "text": "Let's figure out how to make this work for both of us.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "I'm nervous but willing to consider it.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "That's really inconvenient for me.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Absolutely not, they need to choose me or the job.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 13,
      "text": "Your partner has a close friend of the opposite gender. How do you handle it?",
      "options": [
        { "text": "Trust them and get to know the friend too.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Feel a bit uncomfortable but don't say anything.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Ask lots of questions about their friendship.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Demand they cut off the friendship.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 14,
      "text": "Your partner spends money on something expensive without telling you. What do you do?",
      "options": [
        { "text": "Ask about it calmly and discuss our financial boundaries.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Feel annoyed but let it slide this time.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Give them the silent treatment until they apologize.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Explode and make them return it immediately.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 15,
      "text": "Your partner posts a thirst trap on social media. How do you react?",
      "options": [
        { "text": "Hype them up in the comments - they look amazing!", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Like it but feel a bit weird about all the attention.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Ask them why they need validation from strangers.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Demand they delete it and never post like that again.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 16,
      "text": "Your partner wants to try something new in the bedroom that you're not sure about. What do you do?",
      "options": [
        { "text": "Talk openly about boundaries and what we're both comfortable with.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Say maybe but need time to think about it.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Feel pressured and agree even though I'm uncomfortable.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Get disgusted and shame them for even asking.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 17,
      "text": "Your partner gains weight and seems insecure about it. How do you respond?",
      "options": [
        { "text": "Reassure them they're beautiful and support their feelings.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Tell them it doesn't matter to me but avoid the topic.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Suggest they should work out more.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Agree that they've let themselves go.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 18,
      "text": "Your partner's mental health is affecting the relationship. What's your approach?",
      "options": [
        { "text": "Support them while encouraging professional help.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Try to be patient but feel overwhelmed sometimes.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Get frustrated that they're not 'getting better' fast enough.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Tell them to just get over it and stop being dramatic.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 19,
      "text": "Your partner wants to adopt a pet but you're not ready. How do you handle it?",
      "options": [
        { "text": "Discuss the responsibilities and timeline honestly.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Say maybe in the future but not now.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Give in reluctantly to make them happy.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Flat out refuse and get angry they even asked.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 20,
      "text": "Your partner forgets your birthday. What's your reaction?",
      "options": [
        { "text": "Gently remind them and plan something together.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Feel hurt but don't want to make a big deal.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Give them the cold shoulder until they figure it out.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Explode and make them feel terrible about it.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 21,
      "text": "Do you like being in control of plans?",
      "options": [
        { "text": "Nah, teamwork makes it fun.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Sometimes, I just prefer order.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Usually, I end up deciding.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Always — I hate losing control.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 22,
      "text": "Your partner gives feedback you don't like. You...",
      "options": [
        { "text": "Appreciate the honesty.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Defend yourself but stay calm.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Get defensive fast.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Take it as an attack.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 23,
      "text": "How do you show affection online?",
      "options": [
        { "text": "Sweet texts, calls, memes — all of it.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Occasionally, I'm not too expressive.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Only when I feel guilty.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Bare minimum — they should know already.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 24,
      "text": "Your partner forgets to text goodnight. You...",
      "options": [
        { "text": "Sleep peacefully, it's okay.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Notice but brush it off.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Bring it up playfully tomorrow.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Stay up angry and overthink.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 25,
      "text": "How do you handle boundaries?",
      "options": [
        { "text": "Respect them no matter what.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Try to understand them fully.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Push a little when I disagree.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Boundaries? That's optional.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 26,
      "text": "If they make a new friend of the opposite gender, you...",
      "options": [
        { "text": "Support it — trust is key.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Cool with it, but I stay observant.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Slightly jealous but don't say much.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Ask who, why, and for how long.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 27,
      "text": "Do you take accountability after being toxic?",
      "options": [
        { "text": "Absolutely, I reflect and fix it.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Eventually, once I cool off.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Only if they point it out.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Nah, they provoked it.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 28,
      "text": "Do you overthink small things in your relationship?",
      "options": [
        { "text": "Rarely — I trust the bond.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Sometimes, but I catch myself.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Frequently — can't help it.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "All the time — it's a full-time job.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 29,
      "text": "When your partner compliments someone else...",
      "options": [
        { "text": "I'm cool — they can admire people.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Notice it but don't react.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Act chill but store it in memory.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Instant side-eye and silence.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 30,
      "text": "Do you express gratitude often?",
      "options": [
        { "text": "Yes, love deserves appreciation.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Sometimes, not every time.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Rarely, I assume they know.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Never, it's cringe.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 31,
      "text": "How do you react when they disagree with you?",
      "options": [
        { "text": "I listen and try to understand.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Explain my side calmly.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Argue until I win.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Take it personally every time.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 32,
      "text": "Do you expect your partner to read your mind?",
      "options": [
        { "text": "Nope, I use my words.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Sometimes, it's obvious tho.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Yeah, they should just know me.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Always — if they cared, they'd know.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 33,
      "text": "How do you handle boredom in a relationship?",
      "options": [
        { "text": "Plan fun stuff or try new things.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Talk about it honestly.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Complain or drift a bit.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Flirt elsewhere for excitement.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 34,
      "text": "When they post something you don't like...",
      "options": [
        { "text": "Scroll on — not my problem.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Mention it politely later.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Make a passive story in response.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Confront instantly.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 35,
      "text": "How do you act when you're mad?",
      "options": [
        { "text": "Communicate and cool down.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Take space before responding.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Go quiet to make a point.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Say hurtful things then regret it.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 36,
      "text": "Do you support their ambitions?",
      "options": [
        { "text": "Fully — their growth excites me.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Most of the time, if it's realistic.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Support but feel distant about it.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Get insecure about it.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    },
    {
      "id": 37,
      "text": "How do you react when your partner needs alone time?",
      "options": [
        { "text": "Respect it, everyone needs space.", "flagImpact": { "green": 2, "beige": 0, "red": 0 } },
        { "text": "Check in once then back off.", "flagImpact": { "green": 1, "beige": 1, "red": 0 } },
        { "text": "Feel lowkey rejected.", "flagImpact": { "green": 0, "beige": 1, "red": 1 } },
        { "text": "Take it personally and start drama.", "flagImpact": { "green": 0, "beige": 0, "red": 2 } }
      ]
    }
  ]
};

const quizData = {
  "title": "Red Or Green ?",
  "intro": "Answer honestly — we'll figure out if your partner is a Green, Beige, or Red Flag.",
  "maxQuestions": 10,
  "totalQuestionPool": 40 // Now we have 40+ questions to choose from!
};

// 🧠 ADAPTIVE QUIZ ENGINE - Akinator Style
// Mock storage for user sessions
const userSessions = new Map();

// --- Helper: Flatten all questions from themes into a single searchable array ---
function getAllQuestions(mode = 'partner', shuffledBank = null) {
  if (mode === 'self') {
    return shuffledBank ? shuffledBank.questions : selfQuestionBank.questions;
  }

  const bank = shuffledBank || questionBank;
  const allQuestions = [...bank.starters];
  // Add all questions from themes
  Object.values(bank.themes).forEach(themeQuestions => {
    allQuestions.push(...themeQuestions);
  });

  return allQuestions;
}

// --- Helper: Get random starter question ---
function getRandomStarter(mode = 'partner', shuffledBank = null) {
  if (mode === 'self') {
    const questions = shuffledBank ? shuffledBank.questions : selfQuestionBank.questions;
    return questions[Math.floor(Math.random() * questions.length)];
  }

  const starters = shuffledBank ? shuffledBank.starters : questionBank.starters;
  return starters[Math.floor(Math.random() * starters.length)];
}

// --- Helper: Find question by ID ---
function findQuestionById(questionId, mode = 'partner', shuffledBank = null) {
  const allQuestions = getAllQuestions(mode, shuffledBank);
  return allQuestions.find(q => q.id === questionId);
}

// --- Helper: Get random unanswered question ---
function getRandomUnansweredQuestion(userId) {
  const session = userSessions.get(userId);
  if (!session) return null;

  const allQuestions = getAllQuestions(session.mode, session.shuffledBank);
  const remaining = allQuestions.filter(q => !session.askedQuestions.has(q.id));

  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
}

// --- 🎯 Smart Question Selection Based on Theme ---
function getNextQuestionByTheme(userId, theme) {
  const session = userSessions.get(userId);
  if (!session) return null;

  if (session.mode === 'self') {
    // For self-assessment, just pick any unanswered question
    return getRandomUnansweredQuestion(userId);
  }

  // Get questions from the specified theme for partner mode using shuffled bank
  const themeQuestions = session.shuffledBank.themes[theme] || [];
  const availableQuestions = themeQuestions.filter(q => !session.askedQuestions.has(q.id));

  if (availableQuestions.length > 0) {
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  }

  // Fallback to any unanswered question
  return getRandomUnansweredQuestion(userId);
}

// --- 🔄 Adaptive Question Selection Logic ---
function selectNextQuestion(userId, previousAnswer = null) {
  const session = userSessions.get(userId);
  if (!session) return null;

  // If we've asked max questions, we're done
  if (session.questionCount >= quizData.maxQuestions) {
    return null;
  }

  if (session.mode === 'self') {
    // For self-assessment, pick any unanswered question randomly from shuffled bank
    return getRandomUnansweredQuestion(userId);
  }

  let nextThemes = [];

  if (previousAnswer && previousAnswer.followUpThemes) {
    nextThemes = previousAnswer.followUpThemes;
  } else {
    // Default themes for early questions
    nextThemes = ['communication', 'trust', 'respect', 'support'];
  }

  // Try to find a question from preferred themes
  for (const theme of nextThemes) {
    const question = getNextQuestionByTheme(userId, theme);
    if (question) {
      return question;
    }
  }

  // If no themed questions available, pick any unanswered question
  return getRandomUnansweredQuestion(userId);
}

// --- 📊 Calculate Verdict Based on Scores ---
function calculateVerdict(scores) {
  const { green, beige, red } = scores;
  const total = green + beige + red;

  if (total === 0) return "beige"; // Default if no answers

  const greenRatio = green / total;
  const redRatio = red / total;

  // Updated scoring for 0-3 point scale (max 30 points per flag for 10 questions)
  // More nuanced thresholds
  if (greenRatio >= 0.65) return "green";  // Strong green flag pattern
  if (redRatio >= 0.35) return "red";      // Concerning red flag pattern  
  return "beige";                          // Mixed signals pattern
}

// --- 🚀 MAIN API FUNCTIONS ---
export const mockAPI = {
  // 1️⃣ Initialize quiz session
  startQuiz: async (userId, mode = 'partner') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create shuffled question bank for this session
        const shuffledBank = createShuffledQuestionBank(mode);
        
        let starterQuestion;

        if (mode === 'self') {
          // For self-assessment, get a random question from the shuffled bank
          starterQuestion = shuffledBank.questions[Math.floor(Math.random() * shuffledBank.questions.length)];
        } else {
          // Get a random starter question for partner mode from shuffled bank
          starterQuestion = getRandomStarter(mode, shuffledBank);
        }

        // Initialize session with starter question and shuffled bank
        const session = {
          mode: mode, // Store the quiz mode
          shuffledBank: shuffledBank, // Store the shuffled question bank
          green: 0,
          red: 0,
          beige: 0,
          askedQuestions: new Set(),
          questionCount: 1, // Start at 1 since we're giving the first question
          currentTheme: starterQuestion.theme || 'general',
          currentQuestion: starterQuestion
        };

        // Mark starter question as asked
        session.askedQuestions.add(starterQuestion.id);

        userSessions.set(userId, session);
        console.log(`🎯 Starting ${mode} quiz with shuffled options. Question:`, starterQuestion.text);
        console.log(`🔀 Shuffled options order:`, starterQuestion.options.map((opt, idx) => `${idx + 1}. ${opt.text.substring(0, 30)}...`));

        resolve({
          question: starterQuestion,
          questionNumber: 1,
          totalQuestions: quizData.maxQuestions,
          mode: mode
        });
      }, 500);
    });
  },

  // 2️⃣ Answer question and get next one (Akinator style!)
  answerQuestion: async (userId, questionId, optionIndex) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = userSessions.get(userId);
        if (!session) {
          resolve({ error: 'Session not found' });
          return;
        }

        const question = findQuestionById(questionId, session.mode, session.shuffledBank);
        if (!question) {
          resolve({ error: 'Invalid question ID' });
          return;
        }

        const selectedOption = question.options[optionIndex];
        if (!selectedOption) {
          resolve({ error: 'Invalid option index' });
          return;
        }

        // 📈 Update scores
        const { flagImpact } = selectedOption;
        session.green += flagImpact.green || 0;
        session.red += flagImpact.red || 0;
        session.beige += flagImpact.beige || 0;

        // 🎯 Update current theme based on answer (only for partner mode)
        if (session.mode === 'partner' && selectedOption.followUpThemes && selectedOption.followUpThemes.length > 0) {
          session.currentTheme = selectedOption.followUpThemes[
            Math.floor(Math.random() * selectedOption.followUpThemes.length)
          ];
        }

        // Check if we should continue or end the quiz
        if (session.questionCount >= quizData.maxQuestions) {
          // 🏁 Quiz complete - calculate final verdict
          userSessions.set(userId, session);
          const verdict = calculateVerdict({ green: session.green, red: session.red, beige: session.beige });

          console.log('🏁 Quiz complete! Verdict:', verdict, 'Scores:', { green: session.green, red: session.red, beige: session.beige });

          resolve({
            success: true,
            scores: { green: session.green, red: session.red, beige: session.beige },
            quizComplete: true,
            verdict: verdict
          });
          return;
        }

        // 🔄 Get next question
        const nextQuestion = selectNextQuestion(userId, selectedOption);

        if (nextQuestion) {
          session.currentQuestion = nextQuestion;
          session.questionCount += 1;
          session.askedQuestions.add(nextQuestion.id);



          userSessions.set(userId, session);

          console.log(`🎯 Q${session.questionCount}: ${nextQuestion.text}`);

          resolve({
            success: true,
            scores: { green: session.green, red: session.red, beige: session.beige },
            nextQuestion: {
              question: nextQuestion,
              questionNumber: session.questionCount,
              totalQuestions: quizData.maxQuestions
            }
          });
        } else {
          // 🏁 No more questions - quiz complete
          userSessions.set(userId, session);
          const verdict = calculateVerdict({ green: session.green, red: session.red, beige: session.beige });

          console.log('🏁 Quiz complete! Verdict:', verdict, 'Scores:', { green: session.green, red: session.red, beige: session.beige });

          resolve({
            success: true,
            scores: { green: session.green, red: session.red, beige: session.beige },
            quizComplete: true,
            verdict: verdict
          });
        }
      }, 200);
    });
  },

  // 3️⃣ Legacy support - Update answer (redirects to answerQuestion)
  updateAnswer: async (userId, questionId, selectedOption) => {
    const session = userSessions.get(userId);
    if (!session) return { error: 'Session not found' };

    // Find the option index using the shuffled bank
    const question = findQuestionById(questionId, session.mode, session.shuffledBank);
    if (!question) return { error: 'Question not found' };

    const optionIndex = question.options.findIndex(opt =>
      opt.text === selectedOption.text &&
      JSON.stringify(opt.flagImpact) === JSON.stringify(selectedOption.flagImpact)
    );

    if (optionIndex === -1) return { error: 'Option not found' };

    return mockAPI.answerQuestion(userId, questionId, optionIndex);
  },

  // 4️⃣ Get final result with verdict
  getResult: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = userSessions.get(userId);
        const scores = session ?
          { green: session.green, red: session.red, beige: session.beige } :
          { green: 0, red: 0, beige: 0 };

        const dominantFlag = calculateVerdict(scores);

        const result = {
          dominantFlag,
          scores,
          questionsAsked: session ? session.questionCount : 0,
          totalPossibleQuestions: quizData.totalQuestionPool,
          adaptiveFlow: true, // Flag to indicate this used adaptive logic
          toneResponses: {
            comfort: getComfortResponse(dominantFlag, session ? session.mode : 'partner'),
            roast: getRoastResponse(dominantFlag, session ? session.mode : 'partner'),
            truth: getTruthResponse(dominantFlag, session ? session.mode : 'partner')
          }
        };

        console.log('📊 Final Result:', result);
        resolve(result);
      }, 300);
    });
  },

  // 5️⃣ Debug function to see session state
  getSessionDebug: async (userId) => {
    const session = userSessions.get(userId);
    return session ? {
      scores: { green: session.green, red: session.red, beige: session.beige },
      questionCount: session.questionCount,
      currentTheme: session.currentTheme,
      askedQuestions: Array.from(session.askedQuestions)
    } : null;
  },

  // 6️⃣ Clear session (useful for retaking quiz)
  clearSession: async (userId) => {
    userSessions.delete(userId);
    console.log('🧹 Session cleared for user:', userId);
    return { success: true, message: 'Session cleared' };
  },

  // 7️⃣ Get available question count (for debugging)
  getQuestionPoolInfo: async () => {
    const allQuestions = getAllQuestions();
    const themeCount = Object.keys(questionBank.themes).length;
    const starterCount = questionBank.starters.length;

    return {
      totalQuestions: allQuestions.length,
      starterQuestions: starterCount,
      themes: themeCount,
      questionsPerTheme: Object.fromEntries(
        Object.entries(questionBank.themes).map(([theme, questions]) => [theme, questions.length])
      ),
      shufflingEnabled: true // Indicate that options are shuffled
    };
  },

  // 8️⃣ Test shuffling functionality (for debugging)
  testShuffling: async () => {
    console.log('🔀 Testing option shuffling...');
    
    // Test partner mode
    const partnerBank = createShuffledQuestionBank('partner');
    const originalQuestion = questionBank.starters[0];
    const shuffledQuestion = partnerBank.starters[0];
    
    console.log('Original options order:', originalQuestion.options.map(opt => opt.text.substring(0, 30) + '...'));
    console.log('Shuffled options order:', shuffledQuestion.options.map(opt => opt.text.substring(0, 30) + '...'));
    
    // Test self mode
    const selfBank = createShuffledQuestionBank('self');
    const originalSelfQ = selfQuestionBank.questions[0];
    const shuffledSelfQ = selfBank.questions[0];
    
    console.log('Original self options:', originalSelfQ.options.map(opt => opt.text.substring(0, 30) + '...'));
    console.log('Shuffled self options:', shuffledSelfQ.options.map(opt => opt.text.substring(0, 30) + '...'));
    
    return {
      partnerShuffled: JSON.stringify(originalQuestion.options) !== JSON.stringify(shuffledQuestion.options),
      selfShuffled: JSON.stringify(originalSelfQ.options) !== JSON.stringify(shuffledSelfQ.options),
      message: 'Check console for detailed comparison'
    };
  }
};

// Helper functions
function getDominantFlag(scores) {
  const { green, red, beige } = scores;
  if (green >= red && green >= beige) return 'green';
  if (red >= green && red >= beige) return 'red';
  return 'beige';
}

// Helper function to get random response from array
function getRandomResponse(responses) {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
}

function getComfortResponse(flag, mode = 'partner') {
  if (mode === 'self') {
    const responses = {
      green: [
        "💚 You’re doing such a beautiful job showing up with care and respect. The way you love — with gentleness, honesty, and patience — that’s real emotional maturity.",
        "🌿 You handle relationships with grace. The consistency, the understanding, the kindness — it’s something to be proud of. Keep protecting that peace.",
        "✨ You radiate grounded love. You don’t just care; you *show* it. That kind of emotional steadiness makes people feel safe around you.",
        "🌸 You’re emotionally self-aware and open-hearted — that’s such a rare combo. Keep leading with kindness; it changes everything.",
        "💫 You communicate honestly, you listen deeply, and you care genuinely. That’s healthy love, and it shows in the way people feel seen by you.",
        "🌼 You’ve built such a gentle strength — the kind that doesn’t shout but shows up quietly, consistently. Keep trusting that energy.",
        "💛 The way you respond with patience and compassion says so much about who you are. That’s real emotional maturity in motion.",
        "🌈 You’re the kind of person who makes relationships feel safe and calm. Keep choosing empathy — it’s your superpower.",
        "🌷 You bring light into your connections just by being intentional and kind. Keep nurturing that goodness; it’s rare.",
        "🌿 You’re doing better than you think. The way you care, reflect, and communicate — that’s what healthy love looks like.",
        "💚 You show up with love even when things get hard. That’s growth, that’s strength, that’s heart.",
        "🪷 You’re emotionally balanced and thoughtful — keep giving yourself credit for how far you’ve come."
      ],

      beige: [
        "🤍 You’re doing okay — more than okay, actually. You’re growing, learning, and figuring yourself out, and that takes real strength.",
        "🌤️ You’ve got a beautiful mix of good habits and growing edges. Be patient with yourself — balance takes time and care.",
        "💛 You’re not failing, you’re *learning*. Every small step you take to communicate better or pause before reacting — it all counts.",
        "🌱 You’re trying, and that matters more than perfection. Growth is quiet sometimes — trust the process.",
        "💫 You’re aware of where you shine and where you stumble. That self-awareness is already half the healing.",
        "🪞 Some days you show up perfectly, others not so much — and that’s okay. The goal isn’t perfection, it’s progress.",
        "🤝 You’re a work in progress, just like everyone else. Give yourself the same grace you offer others.",
        "🌸 You’ve got good intentions, and you’re learning to align your actions with them. That’s beautiful growth in motion.",
        "💛 You don’t need to have it all figured out. You’re allowed to evolve, slowly and softly.",
        "🌿 You care, you reflect, you’re learning — that’s what real emotional maturity looks like.",
        "🪷 You’re human, and being human means growing in layers. Be gentle with the parts of you that are still learning.",
        "✨ You’re not behind. You’re exactly where you need to be, learning what you need to learn."
      ],

      red: [
        "❤️‍🔥 Hey, take a breath — you’re not broken. You’re learning, and that takes courage. Awareness is a huge first step.",
        "💔 It’s okay to not have it all together. What matters is you’re reflecting, and that’s already healing in motion.",
        "🌱 You’re seeing things clearly now, and that’s powerful. You can’t change what you don’t see — and now you *can*.",
        "💫 Be gentle with yourself. You’re not failing; you’re becoming aware. That’s how transformation starts.",
        "🪷 Everyone has patterns they’re unlearning. The fact that you’re reflecting shows how much you care about growing.",
        "🌧️ Some lessons hurt, but they teach us how to love better. You’re doing the hard work — don’t rush it.",
        "🔥 Growth can feel messy and uncomfortable. But the fact that you’re here, reading this, means you’re already on your way.",
        "💛 You’re allowed to start again. You’re allowed to outgrow the version of you that didn’t know better.",
        "🌿 Healing isn’t linear. You’ll have good days and hard days — both are valid, both are progress.",
        "🪞 You’re being honest with yourself, and that’s brave. Keep taking small steps; change happens quietly, then all at once.",
        "❤️ You’re human — and humans make mistakes, learn, and try again. You’re doing just that, and it’s enough.",
        "✨ Don’t lose heart. You’re not defined by what went wrong, but by your willingness to grow from it."
      ]
    };

    return getRandomResponse(responses[flag]);
  }

  const responses = {
    green: [
      "Hey, it really seems like they care about you and respect your boundaries. Take a deep breath, enjoy the good vibes, and remember it’s okay to just be yourself with them.",
      "You’re in a healthy space. Appreciate the consistency and honesty — it’s rare to find, so let yourself feel secure and happy.",
      "Bro, they’re showing up for you. Keep communicating openly, cherish the small moments, and trust the relationship will grow naturally.",
      "Honestly, it’s refreshing to see someone keep it 100 with you. Enjoy that respect and transparency — you deserve it.",
      "You’re being valued and heard. Laugh together, share your thoughts, and know that being comfortable around someone is a huge green flag.",
      "It looks like they genuinely care. Keep the conversation flowing, trust the connection, and let things evolve at their own pace.",
      "Dude, the energy here is healthy. Focus on the positives, enjoy each other’s company, and don’t let overthinking cloud your experience.",
      "They’re patient and trustworthy. Let yourself feel safe, express yourself openly, and take joy in these small but meaningful moments.",
      "You’ve got someone consistent in your corner. Appreciate it, communicate openly, and let the bond strengthen naturally.",
      "This is a solid relationship vibe. Respect, care, and honesty are all there — let yourself enjoy it without stress."
    ],
    red: [
      "Hey, something feels off and that’s completely valid. You deserve to feel safe and respected, so take a moment to reflect and consider speaking up honestly.",
      "It seems like boundaries might be crossed. Trust your instincts, prioritize your peace, and remember it’s okay to set limits for your well-being.",
      "Bro, noticing red flags is your intuition protecting you. You don’t have to ignore them — communicate your feelings and act in your best interest.",
      "These vibes aren’t ideal. Try to approach the situation calmly, express your concerns clearly, and observe how they respond.",
      "Your mental health matters most. Step back if you need, talk things through if you feel safe, and don’t feel guilty prioritizing yourself.",
      "Some patterns seem concerning. Address them gently but firmly — you deserve clarity, respect, and security in any connection.",
      "It’s okay to feel uneasy. Have a conversation, protect your boundaries, and remember that leaving a toxic situation is completely valid.",
      "Warning signs are here for a reason. Stay aware, communicate openly, and don’t hesitate to create space for your own peace.",
      "It’s normal to feel unsure or uncomfortable. Listen to yourself, express your concerns, and act in a way that protects your emotional well-being.",
      "Some limits are being tested. Be firm, speak up honestly, and remember that your comfort and safety are your top priorities."
    ],
    beige: [
      "Hey, it feels like things are a bit neutral right now. That’s okay — open, honest conversation could help clarify where you both stand.",
      "The energy is kind of mixed. Talking through your feelings and checking in can help strengthen understanding and connection.",
      "Some things are good, some are just okay. Express yourself gently and see how the other person responds — clarity matters.",
      "Nothing extreme is happening, which is fine. Honest discussion might reveal opportunities to grow the connection or highlight what’s lacking.",
      "It’s a bit average right now. Try asking questions and sharing your perspective — it could make a big difference in how things develop.",
      "The vibe is neutral. Observe, reflect, and communicate openly to make sure you’re both aligned and happy with how things are going.",
      "Mid-level energy isn’t bad, but don’t ignore your needs. Express yourself and see if the connection has the potential to improve.",
      "Some okay vibes exist. Keep talking, be honest, and assess whether this relationship meets your expectations and makes you feel good.",
      "Nothing wrong, nothing outstanding. Ask questions, share how you feel, and take time to understand the dynamic fully.",
      "It’s a mixed space. Keep communication honest, trust your feelings, and make choices that help you feel secure and respected."
    ]
  };
  return getRandomResponse(responses[flag]);
}


function getRoastResponse(flag, mode = 'partner') {
  if (mode === 'self') {
    const responses = {
      green: [
        "💚 Okay but like… are you *sure* you’re not just softening everyone up so they don’t see your chaos? 😭 Green flag vibes only if you’re not secretly messy inside.",
        "Bro, you're serving 'perfect partner' energy ✨ but is it actually love or just clout? Real green flags don’t need an audience 👀.",
        "You're out here being a saint 😇 but can you actually say no without guilt-tripping yourself? Don’t die for vibes, bestie 💀.",
        "Green flags are cute and all 🌿 but don’t hide your skeletons behind them 💀. Growth > pretending.",
        "You're being ‘good partner’ energy 💛 but are you *actually* showing up for yourself or just trauma-bonded to martyrdom? 🪦",
        "Stop gaslighting yourself into thinking being flawless makes you lovable 😭 Authentic > sparkling, always 💫.",
        "You’re a green flag with a red heart underneath ❤️🔥 and girl… people can see it. Fix the roots, not just the leaves 🌱.",
        "Lowkey, your ‘perfect partner’ aura screams insecurity disguised as maturity 😬. Real growth doesn’t need a trophy 🏆.",
        "You’re playing the saint card ✨ but skipping the self-reflection chapter 📖. That’s like reading the cover and flexing it.",
        "Bro, being kind doesn’t mean you’re not chaotic 🌪️. Don’t let people applaud what’s really a coping mechanism 🫠.",
        "Green flag energy 💚 but make sure it’s not just a marketing campaign 📢 for your personality. Authenticity > aesthetics 🎨.",
        "Stop pretending being ‘good’ fixes your inner mess 💥. Real glow-up is messy, not Instagram-ready 📸."
      ],

      beige: [
        "Mid-tier energy detected 😬 You’re like WiFi that keeps cutting out 📶 — inconsistent and nobody knows if it’s gonna work.",
        "You’re the human equivalent of ‘maybe later’ 🤷‍♂️. Pick a lane or stop wasting everyone’s time ⏳.",
        "Flexing 'complex personality' 💫 but lowkey it’s just chaos wrapped in excuses 🫣. Pick a vibe.",
        "Beige energy alert ⚠️ literally why people settle for you. You’re neither here nor there, and it shows 👀.",
        "You’re confusing everyone with your ‘it’s complicated’ energy 😅. Spoiler: people just want clarity 📝, not a plot twist.",
        "Basically a participation award 🏅 in human form. Not terrible, not amazing — just… there.",
        "Half-assed commitment vibes detected 😬. You’re the reason everyone is overthinking their choices 🤯.",
        "Your neutrality screams avoidance 🚫. Stop trying to be everyone’s safe choice — pick *something* 🥱.",
        "You're beige like unsalted fries 🍟. Edible, but nobody’s excited about it 🤨.",
        "Inconsistency is your aesthetic 🎨. People see the chaos and roll their eyes 🙄. Own it or fix it.",
        "You’re not failing hard, but you’re not winning either 🥴. Congratulations on being a lukewarm existence 🫠.",
        "Beige energy: safe, boring, and slightly irritating 😐. That’s a vibe, but not a good one."
      ],

      red: [
        "Bro, you’re collecting red flags 🚩 like Pokémon 😭 Stop flexing toxicity like it’s a hobby 🎮.",
        "Oop, the drama is literally coming from inside the house 🏠💀 Yes, that’s *you*. Look in the mirror, bestie 🪞.",
        "Villain edit in a reality show vibes detected 🎬. Everyone sees it, you just think it’s mysterious energy 👀.",
        "Toxic main character energy 💥 Plot twist: nobody signed up for your narrative 📜, sis.",
        "Walking argument starter detected ⚡ You exhaust everyone just by existing 😬.",
        "Drama follows you like you’re scented in it 🌪️. Not a compliment, just a warning 🫣.",
        "Take a sabbatical from ruining vibes 🛑 People aren’t your emotional punching bags 🥊.",
        "Red flag city called 🏙️ — they want their mayor back 🧨. You’re a full-time hazard, my guy ⚠️.",
        "Chaotic and calling it personality 💫 People call it exhaustion 😵. There’s a difference.",
        "Unstable, reckless energy detected 💣 and you’re calling it passion 🔥. Honey, that’s abuse-adjacent behavior 🫠.",
        "Every relationship is a rollercoaster 🎢 with you. And not the fun kind — the ‘vomit and regret’ kind 🤮.",
        "You’re the human version of a warning label ⚠️ Nobody wants to touch it, but everyone’s secretly scared they might 😬."
      ]
    };

    return getRandomResponse(responses[flag]);
  }

  const responses = {
    green: [
      "Bro, stop imagining drama. They’re wholesome, not a Netflix plot.",
      "Chill, the only scam here is your overthinking.",
      "Yo, they’re a whole mood. Stop turning peace into a TikTok horror.",
      "Stop writing fanfiction about their flaws. They’re literally fine.",
      "Big green energy. Stop acting like every text is a conspiracy theory.",
      "Bro, they’re consistent. You’re just buffering.",
      "Relax, not everything is a red flag. Some people are just normal.",
      "Dude, quit imagining drama like it’s trending on Twitter.",
      "Stop turning kindness into a mystery. They’re literally good.",
      "Chill, bro. The only cap here is your paranoia."
    ],
    red: [
      "Oof, bro… this is a full-blown Conjuring horror series.",
      "Red flags louder than your notifications. Leave now.",
      "Bro, if drama were an Olympic sport, they’d be Michael Phelps.",
      "This isn’t love, it’s a season finale you don’t wanna be in.",
      "Stop simping for chaos. Toxic energy isn’t aesthetic.",
      "Bro, this human peaked in cringe. Run.",
      "Warning: major yikes. Your sanity > their nonsense.",
      "Red flag check: 100/10, do not collect.",
      "This is not cute, it’s a TikTok meltdown IRL.",
      "Bro, your life isn’t a meme. Get out before it becomes one."
    ],
    beige: [
      "Meh vibes only. This energy is so bland, even Instagram wouldn’t post it.",
      "Stop hyping average. They’re the plain toast of life.",
      "Neutral zone detected. Ask for more drip, not the beige.",
      "Mid-level energy, and you’re acting like it’s a vibe check.",
      "Bro, this ain’t a glow-up, it’s just okay.exe",
      "Some effort, some lazy. Don’t stan mediocrity.",
      "This is so basic, it belongs in a low-effort meme.",
      "Stop rewarding neutral. They’re crumbs, not a snack.",
      "Mid-tier energy detected. Upgrade your standards, bro.",
      "Plain energy alert. Not even funny, just… meh."
    ]
  };
  return getRandomResponse(responses[flag]);
}

function getTruthResponse(flag, mode = 'partner') {
  if (mode === 'self') {
    const responses = {
      green: [
        "Bro, you’re actually doing things right 👀 Showing up, respecting boundaries, communicating. Keep it consistent — don’t coast thinking it’s enough.",
        "Real talk 💯 You care and show it. But don’t forget to care for yourself too. Healthy love goes both ways.",
        "You make people feel safe and valued 🌿 That’s rare. Just don’t use your niceness to avoid the hard conversations.",
        "Conflict happens — you handle it well. But sometimes the real flex is admitting when *you* were wrong first 💪.",
        "You’re growing inside and it shows. Keep going, but stay humble — self-awareness isn’t a trophy, it’s a habit.",
        "You’re doing green flag stuff, but check if it’s genuine or just performative. Authenticity > image always.",
        "Respecting boundaries and communicating is huge 👏 Keep it up, but make sure you’re not quietly resenting yourself.",
        "You show up for people, but remember: the energy you give is the energy you deserve in return.",
        "Bro, you’re consistent — now level up by being emotionally brave too. Say the things you avoid.",
        "You’re on the right path 🌱 Keep growing, but don’t get lazy thinking you’ve ‘arrived’."
      ],

      beige: [
        "Look bro 🤝 You’re inconsistent — some days solid, some days messy. Stop confusing people, pick a lane.",
        "You’ve got good intentions, but that’s not enough 💥 People notice patterns, not promises.",
        "Your relationship game is a work in progress. Own your flaws, fix the weak spots, and double down on your strengths.",
        "Some days you’re reliable, others… not so much. Consistency > occasional heroics every time.",
        "You’re human — imperfect, yes. But don’t get comfortable being ‘kinda okay’. Level up your baseline.",
        "You’re not bad, but you’re not great either 😬 The difference? Awareness + action. Start stacking both.",
        "Stop excusing the messy parts of you 🫣 People feel them, even if you don’t. Face them and adjust.",
        "Neutral energy is boring and confusing. People want clarity — don’t leave them guessing.",
        "Be honest with yourself — sometimes you’re sabotaging your own growth. Catch it before it becomes habit.",
        "Small wins matter more than grand gestures. Focus on steady improvement, not occasional heroics."
      ],

      red: [
        "Bro… real talk 🔥 You might be the problem here. Stop blaming everyone else and check your own energy first.",
        "You’re pushing people away and calling it personality 😭 That’s not cute, it’s exhausting.",
        "Drama seems to follow you like a shadow 🌪️ Step back and reflect before you create more chaos.",
        "You’ve got toxic tendencies and it’s obvious 💀 Awareness is the first step — now do the work.",
        "Stop thinking passion excuses instability 😬 People notice, and it’s not inspiring, it’s draining.",
        "You’re creating red flags like collectibles 🏴‍☠️ Stop flexing chaos as if it’s a badge of honor.",
        "Your actions might be hurting people — don’t just feel bad, *do better*. That’s how you grow.",
        "You’re the villain edit in someone else’s story 🎬 Wake up, bro. Fix your script.",
        "Stop letting your drama run the show 🛑 People didn’t sign up for it. Take responsibility.",
        "You’ve got potential, but if you keep repeating patterns, you’ll burn everything down. Fix it now."
      ]
    };

    return getRandomResponse(responses[flag]);
  }

  const responses = {
    green: [
      "Bro, notice this carefully: consistency and respect aren’t common. Honor it, be present, and let trust deepen naturally.",
      "The wise see value where others overlook it. They care, they listen — nurture this connection with intention.",
      "Energy like this is rare. Observe, appreciate, and continue to give what you wish to receive.",
      "True harmony comes from mutual respect. Engage openly, cherish small acts of care, and let the relationship evolve.",
      "They honor your boundaries. Reflect on your own actions, communicate kindly, and watch how trust flourishes.",
      "Green flags are signals of growth. Be mindful, reciprocate honesty, and invest in what truly uplifts you.",
      "This is stability in motion. Appreciate it, participate consciously, and allow the bond to mature over time.",
      "Notice the patience and consistency. Align your intentions with clarity and gratitude — this is fertile ground for connection.",
      "They are trustworthy and caring. Focus on your presence, your responses, and the choices that cultivate mutual respect.",
      "The signs are clear: respect, honesty, and consistency abound. Honor them, and your path forward will be steady."
    ],
    red: [
      "Bro, reality is speaking — heed it. Harmful patterns are teaching you to protect your boundaries and self-worth.",
      "The wise do not ignore warning signs. Observe, reflect, and act decisively to preserve your peace.",
      "Toxicity is a teacher. Recognize the lesson, set limits, and move in ways that reinforce your growth.",
      "Harmful energy left unchecked can shape your life negatively. Act with courage, speak your truth, and step back if needed.",
      "Red flags are signposts, bro. They tell you where not to invest your heart and energy — honor them.",
      "The path of wisdom begins with awareness. Observe behaviors, trust your instincts, and act to safeguard your well-being.",
      "Toxicity is not subtle. Protect yourself, assert your boundaries, and let these experiences guide your growth.",
      "Danger signals are present. Treat them as lessons, not labels — act consciously and with clarity.",
      "Bro, do not normalize what diminishes you. Your peace, values, and boundaries are sacred — uphold them.",
      "Red flags illuminate truth. Face them, decide wisely, and allow this clarity to guide your next steps."
    ],
    beige: [
      "Neutral energy is a canvas, bro. Observe, reflect, and choose consciously what to invest your heart in.",
      "Mixed signals are life’s gentle nudge to ask questions, clarify, and act with awareness.",
      "Some good, some meh — your task is to discern patterns, communicate openly, and make choices that align with your growth.",
      "Ambiguity is a teacher. Reflect on what matters to you, discuss expectations, and proceed with intention.",
      "Bro, average behavior invites reflection. Decide what you will accept, what you will nurture, and where to set limits.",
      "Mid-level energy is an opportunity to see clearly. Engage, observe, and let wisdom guide your next steps.",
      "Mixed patterns are signposts. Seek clarity, express boundaries, and move in ways that honor your long-term peace.",
      "Some okay habits exist. Reflect, communicate, and consciously choose where your energy and heart go.",
      "Meh energy is feedback. Observe carefully, discuss honestly, and decide in alignment with your values.",
      "Mid-level signals teach discernment. Reflect deeply, talk openly, and act deliberately to ensure growth and respect."
    ]
  };
  return getRandomResponse(responses[flag]);
}
