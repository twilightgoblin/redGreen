# RedGreen 🚩💚

**Know the vibes. Spot the signals. Navigate life smarter.**

RedGreen is an interactive relationship analysis platform that helps you decode interactions, relationships, and situations through dynamic quizzes. Get personalized insights in three distinct modes: Comfort, Roast, and Truth.

![RedGreen Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)

## ✨ Features

### 🎯 **Adaptive Quiz Engine**
- **Akinator-style intelligence**: Questions adapt based on your previous answers
- **40+ dynamic questions** across 15+ relationship themes
- **Smart theme selection**: Follow-up questions target specific behavioral patterns
- **10-question sessions** for quick, focused analysis

### 🎭 **Three Response Modes**
- **💖 Comfort Mode**: Supportive, understanding advice
- **🔥 Roast Mode**: Brutally honest, humorous takes
- **👁️ Truth Mode**: Wise, philosophical insights

### 🚦 **Flag Detection System**
- **💚 Green Flags**: Healthy relationship behaviors
- **🚩 Red Flags**: Concerning patterns and warning signs
- **🤷‍♀️ Mixed Signals**: Inconsistent or neutral behaviors

### 🎨 **Modern UI/UX**
- **Stunning animations** with Framer Motion
- **Interactive 3D elements** using Three.js and React Three Fiber
- **Responsive design** optimized for all devices
- **Dynamic backgrounds** that adapt to your quiz results
- **Particle effects** and smooth transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/redgreen.git
cd redgreen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
redgreen/
├── src/
│   ├── api/
│   │   └── mockQuizAPI.js          # Adaptive quiz engine & question bank
│   ├── components/
│   │   ├── ui/                     # Reusable UI components
│   │   │   ├── Lamp.jsx           # Hero section lamp effect
│   │   │   ├── animated-button.jsx # Interactive buttons
│   │   │   ├── canvas-reveal-effect.jsx
│   │   │   └── card-spotlight.jsx  # Spotlight card effects
│   │   ├── Footer.jsx
│   │   ├── ProgressBar.jsx         # Quiz progress indicator
│   │   ├── QuestionCard.jsx        # Individual quiz questions
│   │   ├── ResultPage.jsx          # Final results display
│   │   ├── SlidingText.jsx         # Animated text sections
│   │   ├── SparkleNavbar.jsx       # Navigation with effects
│   │   ├── SplashCursor.jsx        # Custom cursor effects
│   │   └── VibeBreak.jsx          # Mid-quiz break screen
│   ├── pages/
│   │   ├── AboutUs.jsx
│   │   ├── Features.jsx            # Feature showcase
│   │   ├── HowItWorks.jsx
│   │   └── Quiz.jsx               # Main quiz interface
│   ├── lib/
│   │   └── utils.js               # Utility functions
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── public/
├── package.json
└── vite.config.js
```

## 🧠 How It Works

### Adaptive Quiz Algorithm

RedGreen uses an intelligent question selection system inspired by Akinator:

1. **Random Starter**: Begin with one of 5 carefully crafted starter questions
2. **Theme-Based Follow-ups**: Each answer triggers questions from related themes
3. **Smart Scoring**: 0-3 point scale across Green, Red, and Beige flags
4. **Dynamic Adaptation**: Questions adapt based on emerging patterns
5. **Intelligent Completion**: Quiz ends after 10 questions or when patterns are clear

### Question Themes

- **Communication** - How they express themselves
- **Trust & Boundaries** - Respect for limits and honesty
- **Emotional Support** - Care during difficult times
- **Conflict Resolution** - Handling disagreements
- **Growth & Independence** - Supporting personal development
- **Consistency** - Reliability in behavior
- **Accountability** - Taking responsibility
- **And 8+ more specialized themes**

### Scoring System

```javascript
// Example scoring logic
if (greenRatio >= 0.65) return "green";    // Strong green flag pattern
if (redRatio >= 0.35) return "red";        // Concerning red flag pattern  
return "beige";                            // Mixed signals pattern
```

## 🎨 Tech Stack

### Frontend
- **React 19.1.1** - Latest React with concurrent features
- **Vite 7.1.7** - Lightning-fast build tool
- **Framer Motion 12.23.24** - Smooth animations
- **React Router DOM 7.9.4** - Client-side routing

### Styling & UI
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Conditional classes

### 3D & Effects
- **Three.js 0.180.0** - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **GSAP 3.13.0** - Advanced animations
- **React Scroll Parallax** - Scroll effects

### Development
- **ESLint** - Code linting
- **Vite Plugin React** - React support for Vite

## 🎯 Usage Examples

### Taking the Quiz

```javascript
// Start a new quiz session
const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
const quizData = await mockAPI.startQuiz(sessionId);

// Answer questions
const response = await mockAPI.answerQuestion(sessionId, questionId, optionIndex);

// Get final results
const result = await mockAPI.getResult(sessionId);
```

### Custom Question Themes

```javascript
// Add new question theme
const customTheme = {
  "custom_theme": [
    {
      "id": "custom_1",
      "text": "Your custom question here?",
      "theme": "custom_theme",
      "options": [
        {
          "text": "Option 1",
          "flagImpact": { "green": 3, "beige": 0, "red": 0 },
          "followUpThemes": ["communication", "trust"]
        }
        // ... more options
      ]
    }
  ]
};
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=RedGreen
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
```

### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

## 🎨 Customization

### Adding New Response Modes

```javascript
// In mockQuizAPI.js
function getCustomResponse(flag) {
  const responses = {
    green: ["Your custom green response..."],
    red: ["Your custom red response..."],
    beige: ["Your custom beige response..."]
  };
  return getRandomResponse(responses[flag]);
}
```

### Styling Components

```javascript
// Custom Tailwind classes
const customStyles = {
  primary: "bg-gradient-to-r from-cyan-500 to-blue-600",
  secondary: "bg-gray-800/50 backdrop-blur-sm",
  accent: "text-cyan-400 hover:text-cyan-300"
};
```

## 📱 Responsive Design

RedGreen is fully responsive and optimized for:
- **Desktop** (1920px+)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for incredible animation capabilities
- **Three.js** community for 3D graphics inspiration
- **Tailwind CSS** for utility-first styling
- **React** team for the amazing framework
- **Vite** for blazing-fast development experience

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/redgreen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/redgreen/discussions)
- **Email**: support@redgreen.app

---

**Made with ❤️ for better relationships and clearer communication.**

*Know the vibes. Spot the signals. Navigate life smarter.*
