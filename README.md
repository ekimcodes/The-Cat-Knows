
<div align="center">
  <br />
  <h1>🐱 The Cat Knows</h1>
  <p>
    <strong>You are the toy. It is the hunter.</strong>
  </p>
  <p>
    Can you outsmart an AI that learns from your movement?
  </p>
  <br />

  <p>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  </p>
</div>

<br />

## ✨ Overview

**The Cat Knows** is a minimalist browser game where your mouse cursor becomes the prey. You play as a small mouse, pursued by an AI Cat that evolves its strategy the longer you survive.

Starting as a clumsy kitten, the AI observes your movement patterns, learns your speed, and unlocks sophisticated hunting techniques—from ambush stalking to predictive interception.

## 🧠 The AI Brain

The core of the game is an adaptive AI that shifts through **4 Hunting Phases**:

| Phase | Name | Behavior Profile |
|:---:|:--- |:--- |
| **I** | **The Novice** | **Direct Pursuit.** The cat chases you relentlessly but lacks foresight. Easy to outrun, but persistent. |
| **II** | **The Student** | **Predictive Tracking.** The cat begins to "lead" its target, aiming for where you *will be*, not where you are. |
| **III** | **The Stalker** | **Stealth & Ambush.** The cat learns patience. It will creep slowly when you are far, freeze if you look at it, and pounce with explosive speed when close. |
| **IV** | **The Master** | **Total Interception.** The AI utilizes complex pathfinding adjustments to cut off escape routes and trap you in corners. |

## 🎮 How to Play

1. **Start**: Click "Start Game" to begin the simulation.
2. **Survive**: Move your cursor (the mouse) to avoid the Cat.
3. **Observe**: Watch the Cat's behavior change as the timer ticks up.
4. **Score**: Every time you are caught, the "Caught" counter goes up. Unlike normal games, you don't "lose"—you just try to survive longer next time.

> **Tip:** The AI struggles with erratic, chaotic movement. Smooth, predictable circles are a death sentence in Phase 4.

## 🛠️ Installation

Clone the repository and install dependencies to run the simulation locally.

```bash
# Clone repo
git clone https://github.com/yourusername/the-cat-knows.git

# Enter directory
cd the-cat-knows

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🎨 Design Philosophy

Built with a "Toy-First" design philosophy:
- **Minimalist Aesthetics**: Warm stone colors and clean iconography keep the focus on the behavior.
- **Fluid Animation**: Powered by Framer Motion to give the cat a lifelike, organic weight.
- **Unobtrusive HUD**: Critical stats (Phase, Time, Score) are presented clearly without breaking immersion.

---

<div align="center">
  <p><em>Created with ❤️ by Edwin Kim</em></p>
</div>
