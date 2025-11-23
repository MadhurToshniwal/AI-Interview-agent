# 📁 Project File Structure

Complete guide to navigating the Interview Practice Partner codebase.

---

## 🗂️ Root Directory

```
interview-ai-agent/
├── 📄 Documentation Files
│   ├── README.md              (Main documentation - START HERE)
│   ├── QUICKSTART.md          (5-minute setup guide)
│   ├── DEPLOYMENT.md          (Vercel deployment instructions)
│   ├── DEMO_SCENARIOS.md      (How to test all 4 personas)
│   ├── FEATURES.md            (Comprehensive feature breakdown)
│   ├── PROJECT_SUMMARY.md     (Executive summary for evaluators)
│   ├── CHECKLIST.md           (Setup and demo preparation checklist)
│   └── FILE_STRUCTURE.md      (This file)
│
├── 📦 Configuration Files
│   ├── package.json           (Dependencies and scripts)
│   ├── package-lock.json      (Dependency lock file)
│   ├── vite.config.js         (Vite build configuration)
│   ├── tailwind.config.js     (Tailwind CSS customization)
│   ├── postcss.config.js      (PostCSS configuration)
│   ├── eslint.config.js       (ESLint rules)
│   ├── vercel.json            (Vercel deployment config)
│   ├── .gitignore             (Git ignore rules)
│   ├── .env.example           (Environment variable template)
│   └── .env                   (Your actual API keys - DO NOT COMMIT)
│
├── 🌐 Public Assets
│   ├── index.html             (Main HTML template)
│   └── public/                (Static assets)
│
├── 💻 Source Code
│   └── src/                   (All application code)
│
├── 📦 Build Output
│   ├── dist/                  (Production build - created by npm run build)
│   └── node_modules/          (Dependencies - created by npm install)
```

---

## 📂 src/ Directory (Application Code)

```
src/
├── 🎨 Styling
│   ├── index.css              (Main CSS - Tailwind directives + custom styles)
│   └── App.css                (Legacy - can be removed)
│
├── 🚀 Application Entry
│   ├── main.jsx               (React app entry point)
│   └── App.jsx                (Main app component - orchestrates screens)
│
├── 🧩 Components (UI Layer)
│   └── components/
│       ├── RoleSelection.jsx       (Role & difficulty selection screen)
│       ├── InterviewInterface.jsx  (Main interview experience)
│       └── FeedbackDashboard.jsx   (Post-interview feedback display)
│
├── 🛠️ Services (Business Logic)
│   └── services/
│       └── interviewService.js     (Core AI logic, voice services, role configs)
│
└── 📸 Assets
    └── assets/                (Images, icons - React logo included)
```

---

## 📄 Key Files Explained

### Documentation Files

**README.md** (500+ lines)
- **Purpose**: Main project documentation
- **Contains**: Overview, features, setup, architecture, deployment
- **Read first**: Yes, start here
- **Audience**: Everyone

**QUICKSTART.md** (150 lines)
- **Purpose**: 5-minute setup guide
- **Contains**: Step-by-step setup, troubleshooting
- **Read first**: Yes, if you want to run quickly
- **Audience**: Developers setting up locally

**DEPLOYMENT.md** (350 lines)
- **Purpose**: Vercel deployment guide
- **Contains**: Two deployment methods, environment variable setup
- **Read first**: No, after local setup works
- **Audience**: Developers deploying to production

**DEMO_SCENARIOS.md** (400 lines)
- **Purpose**: Testing guide for evaluators
- **Contains**: 4 persona tests, expected behaviors, success criteria
- **Read first**: Yes, if you're evaluating the project
- **Audience**: Evaluators, QA testers

**FEATURES.md** (600 lines)
- **Purpose**: Deep dive into all features
- **Contains**: Every feature explained, technical details, why it's TOP 1%
- **Read first**: No, for deeper understanding
- **Audience**: Technical evaluators

**PROJECT_SUMMARY.md** (400 lines)
- **Purpose**: Executive summary
- **Contains**: Quick overview, key highlights, evaluation alignment
- **Read first**: Yes, if you're an evaluator short on time
- **Audience**: Evaluators, hiring managers

**CHECKLIST.md** (300 lines)
- **Purpose**: Setup and demo checklist
- **Contains**: Pre-flight checks, demo script, troubleshooting
- **Read first**: Before demoing or deploying
- **Audience**: Developers preparing to demo

---

### Source Code Files

**src/main.jsx** (~10 lines)
```javascript
// React app entry point
// Mounts App component to DOM
// Minimal boilerplate
```

**src/App.jsx** (~90 lines)
```javascript
// Main application orchestrator
// Manages screen state: role-selection → interview → feedback
// Handles navigation between screens
// Passes data between components
```

**src/index.css** (~100 lines)
```javascript
// Tailwind CSS directives
// Custom component classes (btn-primary, card, etc.)
// Waveform animation keyframes
// Global styles
```

**src/components/RoleSelection.jsx** (~180 lines)
```javascript
// Beautiful landing page
// 3 role cards (Software Engineer, Product Manager, Sales)
// Difficulty settings
// Features banner
// Demo scenarios showcase
```

**src/components/InterviewInterface.jsx** (~380 lines)
```javascript
// Main interview experience
// Voice + text input handling
// Real-time transcript display
// Conversation history
// Progress tracking
// Edge case handling (silence, one-word answers)
// Live hints display
```

**src/components/FeedbackDashboard.jsx** (~330 lines)
```javascript
// Post-interview feedback display
// Score visualizations (circular progress)
// Strengths and improvements
// Interview transcript
// Personality profile
// Action buttons (retry, restart)
```

**src/services/interviewService.js** (~650 lines)
```javascript
// ROLE_CONFIGS: Question banks for each role
// InterviewAgent: Core AI interview logic
//   - Response analysis
//   - Persona detection
//   - Follow-up generation
//   - Feedback generation
// VoiceService: Speech recognition & synthesis
```

---

## 🎯 Where to Look for Specific Features

### Want to see...

**Adaptive AI Logic?**
- 📍 `src/services/interviewService.js` → `InterviewAgent` class
- Lines 60-250: Core interview logic
- Lines 150-180: Response analysis
- Lines 200-240: Follow-up generation

**Voice Features?**
- 📍 `src/services/interviewService.js` → `VoiceService` class
- Lines 450-550: Speech recognition & synthesis
- 📍 `src/components/InterviewInterface.jsx`
- Lines 100-150: Voice input handling

**Persona Detection?**
- 📍 `src/services/interviewService.js`
- Lines 150-180: `analyzeResponse()` method
- Lines 250-270: `detectPersona()` method

**Feedback Scoring?**
- 📍 `src/services/interviewService.js`
- Lines 300-380: `generateFeedback()` method
- 📍 `src/components/FeedbackDashboard.jsx`
- Lines 1-330: Entire component

**UI/UX Polish?**
- 📍 `src/index.css` - Custom styles
- 📍 All component files - Tailwind classes
- 📍 `tailwind.config.js` - Color palette, animations

**Role-Specific Questions?**
- 📍 `src/services/interviewService.js`
- Lines 1-60: `ROLE_CONFIGS` object

**Edge Case Handling?**
- 📍 `src/services/interviewService.js`
- Lines 400-430: `handleEdgeCase()` method
- 📍 `src/components/InterviewInterface.jsx`
- Lines 150-250: Silence, one-word, off-topic handling

---

## 📊 File Size Breakdown

| File | Lines of Code | Purpose |
|------|---------------|---------|
| **interviewService.js** | 650 | Core AI logic |
| **InterviewInterface.jsx** | 380 | Main interview UI |
| **FeedbackDashboard.jsx** | 330 | Feedback display |
| **RoleSelection.jsx** | 180 | Role selection UI |
| **index.css** | 100 | Styling |
| **App.jsx** | 90 | App orchestration |
| **Total Source Code** | **1,730** | Production code |

---

## 📦 Configuration Files Explained

**package.json**
- Dependencies: React, Gemini AI SDK, Tailwind
- Scripts: dev, build, preview
- Metadata: name, version, description

**vite.config.js**
- React plugin configuration
- Build optimization settings

**tailwind.config.js**
- Custom color palette (primary shades)
- Animation keyframes (wave, pulse-slow)
- Content paths for purging

**vercel.json**
- Build command: `npm run build`
- Output directory: `dist`
- Rewrites for SPA routing

**.env.example**
- Template for environment variables
- Shows what keys are needed
- Safe to commit

**.env**
- Your actual API keys
- NEVER commit this file
- Listed in .gitignore

---

## 🚀 Important Notes

### Files to NEVER Edit

❌ `node_modules/` - Dependencies managed by npm
❌ `dist/` - Build output, regenerated on each build
❌ `package-lock.json` - Managed by npm
❌ `.env` in git - Contains secrets

### Files You SHOULD Edit

✅ `.env` - Add your API key here
✅ `src/` files - Customize features
✅ `README.md` - Update author name
✅ `package.json` - Update author field

### Files Generated Automatically

🔄 `dist/` - Run `npm run build`
🔄 `node_modules/` - Run `npm install`
🔄 `package-lock.json` - Run `npm install`

---

## 🔍 Quick Navigation Guide

**Setting up for first time?**
1. Read `QUICKSTART.md`
2. Edit `.env` with your API key
3. Run `npm install`
4. Run `npm run dev`

**Want to understand architecture?**
1. Read `README.md` → Architecture section
2. Review `src/App.jsx` → Screen flow
3. Check `src/services/interviewService.js` → Business logic

**Preparing to demo?**
1. Read `DEMO_SCENARIOS.md` → Test all personas
2. Read `CHECKLIST.md` → Verify everything works
3. Practice 2-minute demo script

**Deploying to Vercel?**
1. Read `DEPLOYMENT.md` → Follow steps
2. Use `vercel.json` config (already set up)
3. Add environment variables in Vercel dashboard

**Evaluating the project?**
1. Read `PROJECT_SUMMARY.md` → Quick overview
2. Read `DEMO_SCENARIOS.md` → Test scenarios
3. Read `FEATURES.md` → Deep dive

---

## 📈 Code Statistics

**Total Project:**
- Source code: ~1,730 lines
- Documentation: ~2,500 lines
- Configuration: ~100 lines
- **Total: ~4,330 lines**

**Language Breakdown:**
- JavaScript/JSX: 1,730 lines (40%)
- Markdown: 2,500 lines (58%)
- CSS: 100 lines (2%)

**Components:**
- 3 major React components
- 1 comprehensive service layer
- 2 service classes (InterviewAgent, VoiceService)

---

## 🎯 File Priority for Code Review

**Must Review (Core Logic):**
1. ⭐⭐⭐ `src/services/interviewService.js` - AI brain
2. ⭐⭐⭐ `src/components/InterviewInterface.jsx` - Main UX
3. ⭐⭐ `src/components/FeedbackDashboard.jsx` - Feedback quality
4. ⭐⭐ `src/App.jsx` - App flow

**Nice to Review (Polish):**
5. ⭐ `src/components/RoleSelection.jsx` - Landing page
6. ⭐ `src/index.css` - Styling

**Reference (Documentation):**
7. 📖 `README.md` - Main docs
8. 📖 `PROJECT_SUMMARY.md` - Quick summary

---

## 🗺️ Data Flow

```
User Action (Voice/Text)
    ↓
InterviewInterface.jsx (UI Layer)
    ↓
VoiceService (Speech Recognition)
    ↓
InterviewAgent.analyzeResponse() (Analysis)
    ↓
InterviewAgent.generateFollowUp() (Gemini AI)
    ↓
VoiceService (Text-to-Speech)
    ↓
InterviewInterface.jsx (Display)
    ↓
After 7 questions...
    ↓
InterviewAgent.generateFeedback() (Gemini AI)
    ↓
FeedbackDashboard.jsx (Display Results)
```

---

**Navigation made easy!** 🧭

Use this guide to quickly find what you're looking for in the codebase.
