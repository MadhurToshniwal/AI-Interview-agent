# ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly before your demo or deployment.

---

## 🚀 Pre-Flight Checklist

### 1. API Key Configuration

- [ ] Visit https://makersuite.google.com/app/apikey
- [ ] Create a Google Gemini API key (FREE)
- [ ] Copy the API key
- [ ] Open `.env` file in the project root
- [ ] Replace `VITE_GEMINI_API_KEY=` with your actual key
- [ ] Save the `.env` file
- [ ] Verify the key has no extra spaces or quotes

**Your `.env` should look like:**
```
VITE_GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

---

### 2. Dependencies Installation

- [ ] Open terminal in project directory
- [ ] Run: `npm install`
- [ ] Wait for installation to complete
- [ ] Verify no errors in console
- [ ] Check `node_modules` folder exists

---

### 3. Build Test

- [ ] Run: `npm run build`
- [ ] Verify build completes successfully
- [ ] Check `dist` folder is created
- [ ] No errors in console

**Expected output:**
```
✓ built in X.XXs
```

---

### 4. Development Server Test

- [ ] Run: `npm run dev`
- [ ] Server starts successfully
- [ ] Note the URL (usually http://localhost:5173)
- [ ] Open browser and visit the URL
- [ ] See the landing page with role selection

---

### 5. Basic Functionality Test

- [ ] Click on "Software Engineer" role
- [ ] Click "Start Interview"
- [ ] Allow microphone access (or use text input)
- [ ] See the first question appear
- [ ] Answer with voice or text
- [ ] AI generates a follow-up question
- [ ] Complete at least 3 questions
- [ ] Click "End Interview Early"
- [ ] See comprehensive feedback dashboard

---

### 6. Voice Features Test (Optional but Recommended)

- [ ] Chrome or Edge browser (recommended for voice)
- [ ] Microphone connected and working
- [ ] Allow microphone permissions
- [ ] Click "Start Speaking"
- [ ] See waveform animation
- [ ] See real-time transcript of your voice
- [ ] Hear AI speak the question (text-to-speech)

**If voice doesn't work:**
- [ ] Switch to text input (button provided)
- [ ] All features still work with typing

---

### 7. UI/UX Test

- [ ] All 3 roles are selectable
- [ ] Difficulty settings work
- [ ] Progress bar shows correctly
- [ ] Conversation history displays
- [ ] Feedback scores render properly
- [ ] Mobile responsive (test on phone if possible)

---

### 8. Edge Cases Test

- [ ] Try staying silent for 30+ seconds → See gentle prompt
- [ ] Try one-word answer "Yes" → See follow-up
- [ ] Try going off-topic → See redirection
- [ ] Check error handling works

---

### 9. Documentation Review

- [ ] README.md opens correctly
- [ ] QUICKSTART.md is clear
- [ ] DEPLOYMENT.md has deployment steps
- [ ] DEMO_SCENARIOS.md explains test cases
- [ ] All markdown files render properly

---

### 10. Deployment Preparation (Before Vercel)

- [ ] `.env` is NOT committed to git
- [ ] `.gitignore` includes `.env`
- [ ] All code is committed
- [ ] Build works locally: `npm run build`
- [ ] Have Gemini API key ready to add to Vercel

---

## 🎯 Demo Preparation

### Before Showing to Evaluators:

- [ ] Test all 4 demo scenarios (see DEMO_SCENARIOS.md)
- [ ] Practice explaining the adaptive features
- [ ] Have the architecture diagram ready (in README)
- [ ] Be ready to show code (especially interviewService.js)
- [ ] Test on mobile device
- [ ] Prepare talking points about design decisions

### Key Features to Highlight:

- [ ] Adaptive difficulty based on responses
- [ ] Real interviewer behaviors (pauses, follow-ups)
- [ ] 4 persona detection (Confused, Efficient, Chatty, Edge)
- [ ] Live feedback hints during interview
- [ ] Comprehensive post-interview analysis
- [ ] Voice + text input flexibility
- [ ] Edge case handling
- [ ] Production-ready deployment

---

## 🚢 Deployment Checklist (Vercel)

### Option 1: GitHub Integration

- [ ] Code pushed to GitHub repository
- [ ] Visit vercel.com and sign in
- [ ] Import GitHub repository
- [ ] Framework auto-detected as Vite
- [ ] Add environment variable: `VITE_GEMINI_API_KEY`
- [ ] Deploy to production
- [ ] Test live URL
- [ ] Share URL in application

### Option 2: Vercel CLI

- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Run: `vercel login`
- [ ] Run: `vercel --prod`
- [ ] Add environment variable: `vercel env add VITE_GEMINI_API_KEY`
- [ ] Redeploy: `vercel --prod`
- [ ] Test live URL

---

## 🎭 Quick Demo Script (2 Minutes)

Use this script to quickly demonstrate the app:

**1. Landing Page (15 seconds)**
"This is Interview Practice Partner - an AI agent that conducts realistic mock interviews."

**2. Role Selection (15 seconds)**
"It supports 3 roles: Software Engineer, Product Manager, and Sales. Each has custom questions."

**3. Start Interview (30 seconds)**
"I'll select Software Engineer and start. Notice the voice input - I can speak naturally."
*Give one answer*

**4. Adaptive Follow-Up (30 seconds)**
"See how it asked an intelligent follow-up based on my answer? That's the adaptive AI at work."

**5. Feedback (30 seconds)**
"After the interview, you get comprehensive feedback with scores, strengths, improvements, and specific examples."

**Total: 2 minutes**

---

## 🐛 Troubleshooting Checklist

### Build Fails
- [ ] Delete `node_modules` and `package-lock.json`
- [ ] Run `npm install` again
- [ ] Ensure Node.js 16+ installed
- [ ] Check for syntax errors

### API Key Error
- [ ] Verify `.env` file exists
- [ ] Check API key is correct
- [ ] No extra spaces around key
- [ ] Restart dev server after changing `.env`

### Voice Not Working
- [ ] Using Chrome or Edge browser
- [ ] Microphone permissions allowed
- [ ] Not on Firefox (limited support)
- [ ] Try text input as fallback

### Vercel Deployment Issues
- [ ] Environment variable added correctly
- [ ] Variable name is exactly `VITE_GEMINI_API_KEY`
- [ ] Build succeeds locally
- [ ] Check deployment logs in Vercel

---

## ✨ Final Verification

Before submitting or demoing:

- [ ] ✅ Application runs locally without errors
- [ ] ✅ All 3 roles work
- [ ] ✅ Voice or text input works
- [ ] ✅ AI generates responses
- [ ] ✅ Feedback displays correctly
- [ ] ✅ Documentation is complete
- [ ] ✅ Build succeeds
- [ ] ✅ Deployment ready (or deployed)
- [ ] ✅ Demo scenarios tested
- [ ] ✅ Confident explaining features

---

## 🎉 You're Ready!

If all checkboxes above are complete, your Interview Practice Partner is production-ready and demo-ready!

**Good luck with your internship application!** 🚀

---

## 📋 Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

---

**Need help?** Check the comprehensive README.md or troubleshooting sections in the documentation.
