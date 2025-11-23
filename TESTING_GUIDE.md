# 🧪 TESTING CHECKLIST - ALL 4 PERSONAS

## Before You Start
- [ ] Groq API key added to `.env` file
- [ ] Server running on http://localhost:5175
- [ ] Microphone permission granted
- [ ] Browser console open (F12) to check for errors

---

## ✅ PERSONA 1: THE CONFUSED USER
**Goal**: Show agent provides patient guidance for unclear responses

### Test Scenario
1. Start interview (any role)
2. Give vague answers:
   - "Um, I'm not sure..."
   - "Maybe I did something like that..."
   - "I don't really remember..."
3. Give very short answers (1-2 words)
4. Leave long pauses (10-15 seconds)

### Expected Behavior
✅ Agent asks clarifying questions
✅ Agent offers to rephrase question
✅ Agent provides hints (check for hint tooltip)
✅ Agent remains patient and encouraging
✅ No errors in console

### Demo Video Notes
- Show hint tooltip appearing
- Highlight patient tone in agent's responses
- Show "Could you elaborate?" type follow-ups

---

## ✅ PERSONA 2: THE EFFICIENT USER
**Goal**: Show agent increases difficulty for strong answers

### Test Scenario
1. Start interview (Software Engineer recommended)
2. Give STAR-format answers:
   - **Situation**: "At my last internship at Company X..."
   - **Task**: "I was tasked with improving page load time..."
   - **Action**: "I implemented lazy loading and code splitting..."
   - **Result**: "This reduced load time by 40% and improved user retention by 15%"
3. Include metrics in every answer
4. Give detailed, structured responses (100-150 words)

### Expected Behavior
✅ Agent asks more challenging follow-up questions
✅ Agent probes deeper: "How did you measure that?", "What alternatives did you consider?"
✅ Question difficulty increases noticeably
✅ Fewer hints provided
✅ Feedback dashboard shows high STAR framework score

### Demo Video Notes
- Point out metrics in your answers
- Highlight how follow-up questions get harder
- Show STAR framework score (should be 8-10/10)

---

## ✅ PERSONA 3: THE CHATTY USER
**Goal**: Show agent politely redirects off-topic responses

### Test Scenario
1. Start interview
2. Go off-topic in answers:
   - "Oh, speaking of coding, have you seen that new movie about AI?"
   - "I love working with teams! By the way, the weather has been great lately..."
   - "That reminds me of this game I was playing..."
3. Give overly long answers (200+ words rambling)
4. Mention unrelated topics: weather, sports, food, movies

### Expected Behavior
✅ Agent detects off-topic keywords
✅ Agent redirects politely: "That's interesting! But let's get back to..."
✅ Agent maintains professional tone
✅ Interview stays on track
✅ No crashes or errors

### Demo Video Notes
- Show clear off-topic response from you
- Highlight agent's redirect message
- Emphasize gentle but firm redirection

---

## ✅ PERSONA 4: THE EDGE CASE USER
**Goal**: Show agent handles unusual inputs gracefully

### Test Scenario A: Silence
1. Start interview
2. Don't respond for 30 seconds
3. Expected: "Take your time. If you need me to rephrase..."

### Test Scenario B: One-Word Answers
1. Answer with just "Yes" or "No"
2. Try "Fine" or "Okay"
3. Expected: "Could you elaborate on that?"

### Test Scenario C: Invalid Input
1. Type gibberish: "asdfghjkl"
2. Type numbers only: "123456"
3. Expected: Agent handles gracefully

### Test Scenario D: Microphone Issues
1. Deny microphone permission
2. Expected: Falls back to text input with helpful error message

### Test Scenario E: Rapid Switching
1. Try to use voice and text simultaneously
2. Stop mid-sentence
3. Expected: No crashes, clean state management

### Expected Behaviors
✅ 30s silence triggers gentle prompt
✅ One-word answers get "elaborate" request
✅ Invalid inputs handled without crashes
✅ Mic denial shows clear error + text fallback
✅ No console errors
✅ Clean UI state transitions

### Demo Video Notes
- Show silence timer (mention "30 second timeout")
- Show one-word handling
- Show fallback to text input
- Emphasize "no crashes, graceful degradation"

---

## 🎭 ROLE-SPECIFIC TESTING

### Software Engineer Role
- [ ] Test technical questions
- [ ] Test behavioral questions
- [ ] Check for code/system design questions
- [ ] Verify feedback mentions technical depth

### Product Manager Role
- [ ] Test product sense questions
- [ ] Test strategy questions
- [ ] Test stakeholder questions
- [ ] Verify feedback mentions user empathy

### Sales Role
- [ ] Test methodology questions
- [ ] Test relationship questions
- [ ] Test closing technique questions
- [ ] Verify feedback mentions persuasion skills

---

## 📊 FEEDBACK DASHBOARD TESTING

After completing each interview:

### Visual Elements
- [ ] Overall score displays (percentage)
- [ ] 5 circular score indicators (STAR, Technical, Communication, Confidence, Overall)
- [ ] Strengths section (should list 2-3 points)
- [ ] Improvements section (should show 2-3 areas with examples)
- [ ] Top answers highlighted
- [ ] Weak answers identified
- [ ] Full conversation transcript shown

### Score Validation
- [ ] Confused user: Lower scores (40-60%)
- [ ] Efficient user: High scores (80-95%)
- [ ] Chatty user: Medium scores (60-75%)
- [ ] Edge case user: Variable scores

### Feedback Quality
- [ ] Feedback is personalized (mentions specific things you said)
- [ ] "Better answer" examples provided
- [ ] Actionable advice given
- [ ] No generic/template responses

---

## 🎬 DEMO VIDEO RECORDING GUIDE

### Equipment Setup (Before Recording)
- [ ] Close unnecessary tabs/applications
- [ ] Full screen browser window (F11)
- [ ] Test microphone for voiceover
- [ ] Start screen recording software (OBS Studio, Loom, etc.)

### Recording Structure (10 minutes max)

#### Section 1: Introduction (1 min)
- [ ] Quick intro: "I built an AI interview practice agent"
- [ ] Show landing page briefly
- [ ] Mention tech stack: "React + Groq AI + Web Speech API"

#### Section 2: Confused User Demo (2 min)
- [ ] Start Software Engineer interview
- [ ] Give vague answer: "Um, I've done some coding..."
- [ ] Give one-word answer: "Yes"
- [ ] Wait 10 seconds (show patience)
- [ ] VOICEOVER: "Notice how the agent provides hints and remains patient"
- [ ] Point out hint tooltip on screen

#### Section 3: Efficient User Demo (2 min)
- [ ] Restart interview OR continue
- [ ] Give strong STAR answer with metrics
- [ ] VOICEOVER: "Watch how the questions get harder"
- [ ] Show next question is more challenging
- [ ] Complete interview
- [ ] Show feedback dashboard
- [ ] VOICEOVER: "High STAR framework score because I used structured answers"

#### Section 4: Chatty User Demo (1.5 min)
- [ ] Start new interview
- [ ] Go off-topic: "Have you seen that new movie?"
- [ ] VOICEOVER: "Agent politely redirects me back on topic"
- [ ] Show redirect message clearly

#### Section 5: Edge Cases Demo (2 min)
- [ ] Show silence handling (wait 20-30 seconds)
- [ ] Show one-word answer handling
- [ ] Toggle to text input mode
- [ ] VOICEOVER: "The agent handles all edge cases gracefully"

#### Section 6: Architecture & Design (1.5 min)
- [ ] Quickly show file structure in VS Code
- [ ] Open `interviewService.js` - scroll to show code
- [ ] VOICEOVER: "Clean architecture with separate components and services"
- [ ] Open README.md briefly
- [ ] VOICEOVER: "Comprehensive documentation explaining design decisions"

#### Closing (30 sec)
- [ ] Show deployed Vercel link (if deployed)
- [ ] VOICEOVER: "100% free to build and deploy"
- [ ] Show GitHub repo
- [ ] Thank you

### Post-Recording
- [ ] Watch full video
- [ ] Check audio quality
- [ ] Verify all 4 personas shown
- [ ] Confirm under 10 minutes
- [ ] Export in high quality (1080p recommended)
- [ ] Upload to YouTube (unlisted) or Loom
- [ ] Test the link

---

## 🐛 COMMON ISSUES & FIXES

### Issue: "Failed to process your response"
**Fix**: Check Groq API key in `.env` file
```bash
# .env should have:
VITE_GROQ_API_KEY=gsk_your_actual_key_here
```

### Issue: Microphone not working
**Fix**: 
1. Check browser permissions (click lock icon in URL bar)
2. Use Chrome/Edge (best compatibility)
3. Fallback to text input if needed

### Issue: Agent gives generic responses
**Fix**: This is normal - Groq AI adapts over time. Try giving more detailed answers.

### Issue: Console shows CORS error
**Fix**: This shouldn't happen with Groq's `dangerouslyAllowBrowser: true` setting. Check your API key.

### Issue: Build fails
**Fix**: 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## ✅ FINAL PRE-SUBMISSION CHECKLIST

### Code Quality
- [ ] No console errors during any test
- [ ] No broken features
- [ ] All 3 roles work
- [ ] Voice input/output works
- [ ] Text fallback works
- [ ] Feedback generates properly

### Documentation
- [ ] README.md complete
- [ ] Setup instructions clear
- [ ] Architecture explained
- [ ] Design decisions documented
- [ ] All Gemini references updated to Groq

### Demo Video
- [ ] All 4 personas demonstrated
- [ ] Under 10 minutes
- [ ] Good audio quality
- [ ] Screen clearly visible
- [ ] No slides (pure product demo)
- [ ] Uploaded and link tested

### GitHub
- [ ] Code pushed to public repo
- [ ] .env.example included (not actual .env)
- [ ] README visible on repo page
- [ ] No sensitive keys in code
- [ ] Repo link works

### Submission Form
- [ ] GitHub link filled
- [ ] Demo video link filled
- [ ] Name and email correct
- [ ] Submitted before deadline (24th Nov, 2pm)

---

## 🎯 SUCCESS CRITERIA

Your submission should demonstrate:
✅ **Conversational Quality**: Natural, adaptive dialogue
✅ **Agentic Behavior**: Autonomous decision-making, persona detection
✅ **Technical Implementation**: Clean code, error handling, documentation
✅ **Intelligence & Adaptability**: Real-time analysis, dynamic difficulty

**You're aiming for TOP 1%** - Make sure every detail is polished!

---

**Next Steps:**
1. Get Groq API key → https://console.groq.com/keys
2. Test all 4 personas (use this checklist)
3. Record demo video (follow script above)
4. Push to GitHub
5. Submit form

**Good luck! 🚀**
