// Mock API functions for quiz functionality
// In a real app, these would be actual API calls

// Adaptive question system - questions are organized by themes and follow-ups
const questionBank = {
  // Starting question - always asked first
  starter: {
    "id": "q_start",
    "text": "Your partner gets a message from an ex. How do they react?",
    "theme": "trust_boundaries",
    "options": [
      { 
        "text": "They ignore it and respect boundaries.", 
        "flagImpact": { "green": 2, "beige": 0, "red": 0 },
        "followUpThemes": ["communication", "respect", "support"]
      },
      { 
        "text": "They respond casually.", 
        "flagImpact": { "green": 1, "beige": 1, "red": 0 },
        "followUpThemes": ["communication", "boundaries", "trust"]
      },
      { 
        "text": "They hide it or lie to me.", 
        "flagImpact": { "green": 0, "beige": 0, "red": 2 },
        "followUpThemes": ["trust", "honesty", "control"]
      }
    ]
  },

  // Theme-based question pools
  themes: {
    communication: [
      {
        "id": "comm_1",
        "text": "When you argue, how do they react?",
        "theme": "communication",
        "options": [
          { 
            "text": "Calmly, tries to resolve.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "respect", "growth"]
          },
          { 
            "text": "Avoids the issue.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_support", "conflict", "boundaries"]
          },
          { 
            "text": "Yells, blames, or ghosts.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "emotional_support"]
          }
        ]
      },
      {
        "id": "comm_2",
        "text": "Do they listen when you need to vent?",
        "theme": "communication",
        "options": [
          { 
            "text": "Always, with empathy.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "respect"]
          },
          { 
            "text": "Half listens, distracted.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_support", "priorities", "respect"]
          },
          { 
            "text": "Dismissive or blames me.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "emotional_support", "respect"]
          }
        ]
      }
    ],

    trust: [
      {
        "id": "trust_1",
        "text": "They share important decisions with you?",
        "theme": "trust",
        "options": [
          { 
            "text": "Always include me.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "support", "growth"]
          },
          { 
            "text": "Sometimes forget.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "priorities", "respect"]
          },
          { 
            "text": "Never consults me.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      },
      {
        "id": "trust_2",
        "text": "Do they trust your decisions?",
        "theme": "trust",
        "options": [
          { 
            "text": "Absolutely.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "respect"]
          },
          { 
            "text": "Depends on mood.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "emotional_support", "consistency"]
          },
          { 
            "text": "Never, always doubting.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    respect: [
      {
        "id": "respect_1",
        "text": "Do they respect your boundaries?",
        "theme": "respect",
        "options": [
          { 
            "text": "Always, no drama.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "communication"]
          },
          { 
            "text": "Most of the time.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "consistency", "trust"]
          },
          { 
            "text": "They push or ignore them.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "emotional_support"]
          }
        ]
      },
      {
        "id": "respect_2",
        "text": "They respect your personal space?",
        "theme": "respect",
        "options": [
          { 
            "text": "Yes, fully.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "support", "growth"]
          },
          { 
            "text": "Sometimes oversteps.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["boundaries", "communication", "consistency"]
          },
          { 
            "text": "No, controlling.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "emotional_support"]
          }
        ]
      }
    ],

    support: [
      {
        "id": "support_1",
        "text": "How do they handle your successes?",
        "theme": "support",
        "options": [
          { 
            "text": "Celebrate you fully.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["growth", "respect", "communication"]
          },
          { 
            "text": "Neutral reaction.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_support", "priorities", "communication"]
          },
          { 
            "text": "Downplays or feels jealous.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "emotional_support", "respect"]
          }
        ]
      },
      {
        "id": "support_2",
        "text": "How do they react to your hobbies or friends?",
        "theme": "support",
        "options": [
          { 
            "text": "Encouraging and supportive.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["growth", "trust", "respect"]
          },
          { 
            "text": "Indifferent.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["priorities", "emotional_support", "communication"]
          },
          { 
            "text": "Jealous or controlling.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "trust"]
          }
        ]
      }
    ],

    emotional_support: [
      {
        "id": "emotion_1",
        "text": "Do they support your emotional needs?",
        "theme": "emotional_support",
        "options": [
          { 
            "text": "Always, genuinely.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["growth", "communication", "respect"]
          },
          { 
            "text": "Sometimes.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "priorities", "communication"]
          },
          { 
            "text": "Rarely or manipulative.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "respect"]
          }
        ]
      },
      {
        "id": "emotion_2",
        "text": "They compliment and appreciate you…",
        "theme": "emotional_support",
        "options": [
          { 
            "text": "Genuinely and often.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "communication"]
          },
          { 
            "text": "Sometimes, inconsistent.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "communication", "priorities"]
          },
          { 
            "text": "Rarely or manipulative.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    control: [
      {
        "id": "control_1",
        "text": "They cancel plans last minute. How do they explain?",
        "theme": "control",
        "options": [
          { 
            "text": "Honestly, with a good reason.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "trust"]
          },
          { 
            "text": "Vague excuse.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "honesty", "priorities"]
          },
          { 
            "text": "Blames me or makes drama.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["boundaries", "respect", "emotional_support"]
          }
        ]
      },
      {
        "id": "control_2",
        "text": "They check on you multiple times a day. How do you feel?",
        "theme": "control",
        "options": [
          { 
            "text": "Loved and secure.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "communication", "support"]
          },
          { 
            "text": "A bit overwhelmed.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["boundaries", "communication", "balance"]
          },
          { 
            "text": "Smothered and trapped.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["boundaries", "respect", "trust"]
          }
        ]
      }
    ],

    growth: [
      {
        "id": "growth_1",
        "text": "Do they encourage you to grow as a person?",
        "theme": "growth",
        "options": [
          { 
            "text": "Yes, constantly.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "respect", "trust"]
          },
          { 
            "text": "Sometimes.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["priorities", "communication", "support"]
          },
          { 
            "text": "No, holds me back.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "respect"]
          }
        ]
      },
      {
        "id": "growth_2",
        "text": "They respect your career/ambitions?",
        "theme": "growth",
        "options": [
          { 
            "text": "Yes, they encourage growth.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "trust", "communication"]
          },
          { 
            "text": "Neutral, sometimes distracted.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["priorities", "emotional_support", "communication"]
          },
          { 
            "text": "Discouraging or competitive.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "support"]
          }
        ]
      }
    ],

    boundaries: [
      {
        "id": "bound_1",
        "text": "If they make a mistake, they…",
        "theme": "boundaries",
        "options": [
          { 
            "text": "Apologize and fix it.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "growth"]
          },
          { 
            "text": "Say sorry but repeat it.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "communication", "respect"]
          },
          { 
            "text": "Blame you or deny it.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "emotional_support"]
          }
        ]
      },
      {
        "id": "bound_2",
        "text": "Do they apologize when needed?",
        "theme": "boundaries",
        "options": [
          { 
            "text": "Yes, sincerely.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "growth"]
          },
          { 
            "text": "Half-hearted.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "emotional_support", "communication"]
          },
          { 
            "text": "Never apologizes.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    honesty: [
      {
        "id": "honest_1",
        "text": "They talk about your relationship with their friends. How do they do it?",
        "theme": "honesty",
        "options": [
          { 
            "text": "Respectfully, positive vibes.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "trust", "support"]
          },
          { 
            "text": "Neutral, sometimes shares too much.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["boundaries", "communication", "respect"]
          },
          { 
            "text": "Gossips or mocks you.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["respect", "boundaries", "emotional_support"]
          }
        ]
      }
    ],

    consistency: [
      {
        "id": "consist_1",
        "text": "They celebrate your achievements?",
        "theme": "consistency",
        "options": [
          { 
            "text": "With excitement and pride.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "growth", "communication"]
          },
          { 
            "text": "Polite acknowledgment.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["emotional_support", "priorities", "communication"]
          },
          { 
            "text": "Downplays or gets jealous.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "support"]
          }
        ]
      }
    ],

    priorities: [
      {
        "id": "prior_1",
        "text": "How do they handle conflict with friends/family?",
        "theme": "priorities",
        "options": [
          { 
            "text": "Mature and respectful.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "respect", "growth"]
          },
          { 
            "text": "Sometimes passive-aggressive.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "emotional_support", "boundaries"]
          },
          { 
            "text": "Explosive and dramatic.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "respect"]
          }
        ]
      },
      {
        "id": "q26",
        "text": "They respect your friends and family?",
        "theme": "priorities",
        "options": [
          { 
            "text": "Yes, supportive and polite.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "support", "communication"]
          },
          { 
            "text": "Neutral or sometimes awkward.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "social_skills", "effort"]
          },
          { 
            "text": "Disrespectful or judgmental.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "respect", "boundaries"]
          }
        ]
      }
    ],

    // New themes for additional questions
    social_media: [
      {
        "id": "q21",
        "text": "Your partner posts about you on social media. How do they do it?",
        "theme": "social_media",
        "options": [
          { 
            "text": "Genuinely proud, positive posts.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["respect", "support", "pride"]
          },
          { 
            "text": "Occasionally shares, nothing special.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["priorities", "effort", "communication"]
          },
          { 
            "text": "Uses it to make others jealous or passive-aggressive.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "manipulation", "boundaries"]
          }
        ]
      },
      {
        "id": "q30",
        "text": "Do they respect your digital privacy (phone, social media)?",
        "theme": "social_media",
        "options": [
          { 
            "text": "Always, trust is strong.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "respect", "boundaries"]
          },
          { 
            "text": "Sometimes snoops.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["trust", "boundaries", "insecurity"]
          },
          { 
            "text": "Always checks without permission.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "boundaries", "trust"]
          }
        ]
      }
    ],

    thoughtfulness: [
      {
        "id": "q22",
        "text": "They surprise you with thoughtful gestures?",
        "theme": "thoughtfulness",
        "options": [
          { 
            "text": "Often and heartfelt.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["support", "effort", "love_language"]
          },
          { 
            "text": "Sometimes, nothing major.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["effort", "priorities", "communication"]
          },
          { 
            "text": "Rarely or selfish gestures.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["selfishness", "effort", "emotional_support"]
          }
        ]
      },
      {
        "id": "q29",
        "text": "Do they celebrate your quirks?",
        "theme": "thoughtfulness",
        "options": [
          { 
            "text": "Yes, loves the weird stuff.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["acceptance", "support", "love"]
          },
          { 
            "text": "Sometimes laughs but teases.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["boundaries", "sensitivity", "communication"]
          },
          { 
            "text": "Judges or criticizes quirks.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["control", "acceptance", "respect"]
          }
        ]
      }
    ],

    crisis_handling: [
      {
        "id": "q23",
        "text": "They check in when they're upset. How do they behave?",
        "theme": "crisis_handling",
        "options": [
          { 
            "text": "Communicates calmly, explains feelings.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["communication", "emotional_intelligence", "maturity"]
          },
          { 
            "text": "Half venting, half ignoring.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["communication", "emotional_support", "consistency"]
          },
          { 
            "text": "Ghosts or explodes without context.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
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
        "text": "Do they handle money responsibly?",
        "theme": "financial_responsibility",
        "options": [
          { 
            "text": "Yes, transparent and reasonable.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["trust", "maturity", "partnership"]
          },
          { 
            "text": "Sometimes careless, sometimes okay.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["consistency", "priorities", "communication"]
          },
          { 
            "text": "Irresponsible or secretive.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
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
        "text": "Do they make an effort to understand your emotions?",
        "theme": "empathy",
        "options": [
          { 
            "text": "Yes, actively listens and empathizes.", 
            "flagImpact": { "green": 2, "beige": 0, "red": 0 },
            "followUpThemes": ["emotional_intelligence", "care", "connection"]
          },
          { 
            "text": "Sometimes half-listens.", 
            "flagImpact": { "green": 0, "beige": 2, "red": 0 },
            "followUpThemes": ["attention", "priorities", "emotional_support"]
          },
          { 
            "text": "Dismisses or ignores feelings.", 
            "flagImpact": { "green": 0, "beige": 0, "red": 2 },
            "followUpThemes": ["emotional_neglect", "disrespect", "invalidation"]
          }
        ]
      }
    ]
  }
};

const quizData = {
  "title": "Red Or Green ?",
  "intro": "Answer honestly — we'll figure out if your partner is a Green, Beige, or Red Flag.",
  "maxQuestions": 10,
  "totalQuestionPool": 40 // Now we have 40+ questions to choose from!
};

// Mock storage for user sessions
const userSessions = new Map();

// Adaptive question selection logic
function selectNextQuestion(userId, previousAnswer) {
  const session = userSessions.get(userId);
  if (!session) return null;

  const { askedQuestions, questionCount } = session;
  
  // If we've asked 10 questions, we're done
  if (questionCount >= quizData.maxQuestions) {
    return null;
  }

  let nextThemes = [];
  
  if (previousAnswer && previousAnswer.followUpThemes) {
    nextThemes = previousAnswer.followUpThemes;
  } else {
    // Default themes for early questions
    nextThemes = ['communication', 'trust', 'respect'];
  }

  // Find an unasked question from the preferred themes
  for (const theme of nextThemes) {
    const themeQuestions = questionBank.themes[theme];
    if (themeQuestions) {
      for (const question of themeQuestions) {
        if (!askedQuestions.has(question.id)) {
          return question;
        }
      }
    }
  }

  // If no themed questions available, pick any unasked question
  for (const theme of Object.keys(questionBank.themes)) {
    const themeQuestions = questionBank.themes[theme];
    for (const question of themeQuestions) {
      if (!askedQuestions.has(question.id)) {
        return question;
      }
    }
  }

  return null;
}

export const mockAPI = {
  // Initialize quiz session
  startQuiz: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Initialize session with starter question
        const session = {
          green: 0,
          red: 0,
          beige: 0,
          askedQuestions: new Set(),
          questionCount: 0,
          currentQuestion: questionBank.starter
        };
        
        userSessions.set(userId, session);
        console.log('Starting quiz with question:', questionBank.starter);
        
        resolve({
          question: questionBank.starter,
          questionNumber: 1,
          totalQuestions: quizData.maxQuestions
        });
      }, 500);
    });
  },

  // Get next question based on previous answer
  getNextQuestion: async (userId, previousAnswer = null) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = userSessions.get(userId);
        if (!session) {
          resolve(null);
          return;
        }

        const nextQuestion = selectNextQuestion(userId, previousAnswer);
        
        if (nextQuestion) {
          session.currentQuestion = nextQuestion;
          session.questionCount += 1;
          session.askedQuestions.add(nextQuestion.id);
          userSessions.set(userId, session);
          
          console.log(`Question ${session.questionCount}:`, nextQuestion);
          
          resolve({
            question: nextQuestion,
            questionNumber: session.questionCount,
            totalQuestions: quizData.maxQuestions
          });
        } else {
          resolve(null); // Quiz complete
        }
      }, 300);
    });
  },

  // Update user answer and get next question
  updateAnswer: async (userId, questionId, selectedOption) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = userSessions.get(userId);
        if (!session) {
          resolve({ error: 'Session not found' });
          return;
        }

        const { flagImpact } = selectedOption;

        // Add the flag impacts to the session scores
        session.green += flagImpact.green || 0;
        session.red += flagImpact.red || 0;
        session.beige += flagImpact.beige || 0;

        userSessions.set(userId, session);

        // Get next question based on this answer
        const nextQuestion = selectNextQuestion(userId, selectedOption);
        
        if (nextQuestion) {
          session.currentQuestion = nextQuestion;
          session.questionCount += 1;
          session.askedQuestions.add(nextQuestion.id);
          userSessions.set(userId, session);
          
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
          // Quiz complete
          resolve({
            success: true,
            scores: { green: session.green, red: session.red, beige: session.beige },
            quizComplete: true
          });
        }
      }, 200);
    });
  },

  // GET /api/quiz/result - Get final result
  getResult: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const session = userSessions.get(userId);
        const scores = session ? { green: session.green, red: session.red, beige: session.beige } : { green: 0, red: 0, beige: 0 };
        const dominantFlag = getDominantFlag(scores);

        const result = {
          dominantFlag,
          scores,
          questionsAsked: session ? session.questionCount : 0,
          toneResponses: {
            comfort: getComfortResponse(dominantFlag),
            roast: getRoastResponse(dominantFlag),
            truth: getTruthResponse(dominantFlag)
          }
        };

        resolve(result);
      }, 300);
    });
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

function getComfortResponse(flag) {
  const responses = {
    green: [
      "Your partner sounds like a keeper! 💚 Respectful, caring, and genuine — cherish this rare find!",
      "Big green vibes 🌿 They communicate, they care, they show up. Keep nurturing this love!",
      "Healthy love alert 🚨 They genuinely have your back. Appreciate it, bestie!",
      "Solid gold partner 🥇 Honest, supportive, and trustworthy. You're lucky!",
      "Nothing but good energy 💚 They make life easier and happier.",
      "You've got a real one 💖 Treat them right, they're rare!",
      "Green flags everywhere! 🌱 Respect, care, and love in full force.",
      "Partner is basically a walking safe space 🛡️ Keep them close.",
      "Your relationship energy = wholesome 💛 Keep it thriving.",
      "Cherish this! 💚 This is what healthy love actually looks like."
    ],
    red: [
      "Heads up 💔 Some behaviors are concerning. You deserve someone who lifts you up, not drags you down.",
      "Red flags everywhere 🚩 Don't ignore patterns that hurt your wellbeing. Prioritize yourself.",
      "Warning ⚠️ These behaviors could be toxic. Set boundaries and protect your peace.",
      "Danger zone 😬 Toxic vibes detected — take care of yourself first.",
      "This ain't cute 💀 Red flags are real. Protect your mental health.",
      "Oof… 🚨 Be cautious, these behaviors are not minor quirks.",
      "Your wellbeing > everything. Don't let red flags slide.",
      "Big warning sign ⚡ Listen to your gut, not hope.",
      "Concerning patterns detected 💣 Time for tough conversations.",
      "Major alert 🚨 Consider boundaries or serious action."
    ],
    beige: [
      "Your partner is... complicated 🤷‍♀️ Not bad, not amazing — communicate to clarify expectations.",
      "Meh vibes ⚪ They're okay, but not outstanding. Decide if 'fine' is enough for you.",
      "Neutral energy 😐 Some things are good, some are meh. Don't settle if you want more.",
      "They're… average? 😅 Nothing wrong, but nothing exciting either.",
      "Some green, some red, mostly beige ⚪ Keep observing their patterns.",
      "Mid-level energy 🟡 Could get better, could get worse. Talk it out.",
      "They pass, but not impressing 💭 Ask yourself if you want more.",
      "Neutral zone ⚪ Nothing alarming, nothing jaw-dropping. Just… okay.",
      "Kind of bland 💁‍♂️ Not harmful, just meh. Decide your tolerance.",
      "Beige alert ⚪ Some good habits, some lazy vibes. Reflect and communicate."
    ]
  };
  return getRandomResponse(responses[flag]);
}

function getRoastResponse(flag) {
  const responses = {
    green: [
      "Stop overthinking 😭 Your partner is solid! Appreciate what you have instead of looking for drama.",
      "Congrats, you hit relationship jackpot 🏆 Chill and stop trying to complicate perfection.",
      "Bestie, green flag vibes only 💚 Maybe focus on loving them instead of stressing unnecessarily.",
      "No cap, you're lucky af 💯 Don't play detective where nothing's wrong.",
      "They're actually great 😎 Stop making mountains out of molehills.",
      "Your partner = peak performance 🥳 Appreciate it, seriously.",
      "Solid human detected ✅ Stop roasting perfection.",
      "Relax, it's all green flags 🌿 Stop imagining problems.",
      "You've got a rare one 💛 Quit looking for flaws that aren't there.",
      "Bestie, they're wholesome 😇 Stop treating them like a suspect."
    ],
    red: [
      "Major red flag energy 🚩 Like, why are you still questioning it? Act before it hurts more.",
      "Oof 😬 Your partner is giving chaos, not love. Time to make some serious decisions.",
      "Red flags be like 💣 Don't ignore these warning signs hoping they'll change magically.",
      "Bro, it's messy 🚨 These behaviors aren't cute, act fast.",
      "Warning: toxic vibes detected ⚡ Don't waste time.",
      "They're sending red flag emojis in real life 🚩 Protect yourself.",
      "Drama alert 😬 This isn't healthy. Decide and act.",
      "Stop pretending it's fine 💀 These patterns are concerning.",
      "Red flags everywhere 🚨 Don't ignore reality.",
      "Major cringe 💣 Time to rethink boundaries and trust."
    ],
    beige: [
      "They're giving 'meh' energy 💀 Not bad, not great. Are you settling or just lazy?",
      "Your partner is basic-ish ⚪ and you're out here taking quizzes about it. Think twice.",
      "Mid-level vibes 😐 They're okay, but don't confuse okay with exceptional.",
      "They're fine… fine isn't always enough 💭",
      "Neutral territory ⚪ Could get better, could get worse. Stay alert.",
      "Some green, some red, mostly beige ⚪ Don't settle without thinking.",
      "Honestly… kind of basic 💀 Decide if that works for you.",
      "Meh vibes detected 😬 Reflect on your expectations.",
      "They pass, but not impressing 💭 Maybe demand more energy.",
      "Beige alert ⚪ Comfortable, but could be better. Keep assessing."
    ]
  };
  return getRandomResponse(responses[flag]);
}

function getTruthResponse(flag) {
  const responses = {
    green: [
      "Real talk 👀 Consistent green flag behavior — respect, care, and support. Rare find!",
      "Truth bomb 💣 Your partner is genuinely healthy for you. Don't let past baggage mess it up.",
      "Fact: They respect, listen, and support you. Keep someone like this close.",
      "Straight up ✅ They're doing everything right, don't overthink it.",
      "Your partner = actual goals 🏆 Trust this energy.",
      "Real AF 💚 They communicate, they respect, they love. That's rare.",
      "Fact check 🧐 Solid green vibes. Appreciate it.",
      "No cap, they're healthy for you 💛 Don't second guess this.",
      "Big truth bomb 💣 They're the real deal.",
      "Honestly, they're top tier 💯 Treat this as a blessing."
    ],
    red: [
      "Truth bomb 💥 These are concerning patterns, not quirks. Trust your gut and set boundaries.",
      "No sugarcoating 🚨 Red flags aren't optional. Protect your mental health first.",
      "Real talk 💣 They're causing stress, not love. Don't wait for change that may never come.",
      "Fact: These behaviors can hurt you ⚠️ Set boundaries now.",
      "Truth incoming 💣 Toxic patterns detected. Act wisely.",
      "Red flags exist for a reason 🚩 Don't ignore them.",
      "Reality check 😬 These behaviors aren't cute or minor.",
      "Honestly 💀 If it feels off, it probably is. Protect yourself.",
      "Major truth bomb 💥 Don't pretend it's harmless.",
      "Straight facts 💣 Your partner is showing harmful patterns."
    ],
    beige: [
      "Honestly? 📊 Average vibes — not abusive, not perfect. Decide if this is enough for you.",
      "Straight talk 😐 They're fine, but fine isn't everything. Ask yourself what you truly want.",
      "Fact check 🧐 Some things right, others wrong. Don't settle if you deserve more.",
      "Neutral vibes ⚪ Nothing extreme either way. Reflect on what you need.",
      "Truth bomb 💣 They're okay, but could be better. Decide consciously.",
      "Beige reality 😬 Not terrible, not amazing. Observe and decide.",
      "Honestly… meh 😐 Can they improve? Will they? Decide accordingly.",
      "Some green, some red, mostly beige ⚪ Use judgment wisely.",
      "Fact: They're average 💭 Not harmful, but not thrilling either.",
      "Real talk 🧐 Some good, some bad. Choose wisely."
    ]
  };
  return getRandomResponse(responses[flag]);
}