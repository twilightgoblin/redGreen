// Mock API functions for quiz functionality
// In a real app, these would be actual API calls

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
function getAllQuestions() {
  const allQuestions = [...questionBank.starters];
  
  // Add all questions from themes
  Object.values(questionBank.themes).forEach(themeQuestions => {
    allQuestions.push(...themeQuestions);
  });
  
  return allQuestions;
}

// --- Helper: Get random starter question ---
function getRandomStarter() {
  const starters = questionBank.starters;
  return starters[Math.floor(Math.random() * starters.length)];
}

// --- Helper: Find question by ID ---
function findQuestionById(questionId) {
  const allQuestions = getAllQuestions();
  return allQuestions.find(q => q.id === questionId);
}

// --- Helper: Get random unanswered question ---
function getRandomUnansweredQuestion(userId) {
  const session = userSessions.get(userId);
  if (!session) return null;
  
  const allQuestions = getAllQuestions();
  const remaining = allQuestions.filter(q => !session.askedQuestions.has(q.id));
  
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
}

// --- 🎯 Smart Question Selection Based on Theme ---
function getNextQuestionByTheme(userId, theme) {
  const session = userSessions.get(userId);
  if (!session) return null;
  
  // Get questions from the specified theme
  const themeQuestions = questionBank.themes[theme] || [];
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
  startQuiz: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get a random starter question
        const starterQuestion = getRandomStarter();
        
        // Initialize session with random starter question
        const session = {
          green: 0,
          red: 0,
          beige: 0,
          askedQuestions: new Set(),
          questionCount: 1, // Start at 1 since we're giving the first question
          currentTheme: starterQuestion.theme,
          currentQuestion: starterQuestion
        };
        
        // Mark starter question as asked
        session.askedQuestions.add(starterQuestion.id);
        
        userSessions.set(userId, session);
        console.log('🎯 Starting adaptive quiz with random starter:', starterQuestion.text);
        
        resolve({
          question: starterQuestion,
          questionNumber: 1,
          totalQuestions: quizData.maxQuestions
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

        const question = findQuestionById(questionId);
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

        // 🎯 Update current theme based on answer
        if (selectedOption.followUpThemes && selectedOption.followUpThemes.length > 0) {
          session.currentTheme = selectedOption.followUpThemes[
            Math.floor(Math.random() * selectedOption.followUpThemes.length)
          ];
        }

        // 🔄 Get next question
        const nextQuestion = selectNextQuestion(userId, selectedOption);
        
        if (nextQuestion && session.questionCount < quizData.maxQuestions) {
          session.currentQuestion = nextQuestion;
          session.questionCount += 1;
          session.askedQuestions.add(nextQuestion.id);
          userSessions.set(userId, session);
          
          console.log(`🎯 Q${session.questionCount}: ${nextQuestion.text} (Theme: ${session.currentTheme})`);
          
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
        }
      }, 200);
    });
  },

  // 3️⃣ Legacy support - Update answer (redirects to answerQuestion)
  updateAnswer: async (userId, questionId, selectedOption) => {
    // Find the option index
    const question = findQuestionById(questionId);
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
            comfort: getComfortResponse(dominantFlag),
            roast: getRoastResponse(dominantFlag),
            truth: getTruthResponse(dominantFlag)
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
      )
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

function getComfortResponse(flag) {
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


function getRoastResponse(flag) {
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

function getTruthResponse(flag) {
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
