# ✅ TEST CHECKLIST - Interview AI Agent

## 🎯 TEST 1: Without Resume (Role-Based Questions)

### Steps:
1. Go to http://localhost:5177
2. Select a role (Software Engineer, Product Manager, or Sales)
3. **DO NOT upload resume**
4. Click "Start Interview"

### Expected Behavior:
✅ Should ask 10 questions total
✅ Questions should be role-specific (from question bank)
✅ Should NOT mention any resume or projects
✅ Should ask generic behavioral/technical questions
✅ Should adapt to your answers (vague → ask for example, etc.)

### Example Questions (Software Engineer):
- "Tell me about yourself and your experience in software development."
- "Describe your approach to debugging a complex production issue."
- "Tell me about a time you disagreed with a team member."

---

## 🎯 TEST 2: With Resume (Personalized Questions)

### Steps:
1. Go to http://localhost:5177
2. Select a role
3. **Upload your PDF resume** OR paste resume text
4. Wait for "✓ Uploaded" confirmation
5. Click "Start Interview"

### Expected Behavior:
✅ Should ask 10 questions total
✅ First question about your SPECIFIC project/experience
✅ After you answer, ONE follow-up about SAME project
✅ Then moves to DIFFERENT project/experience
✅ Cycles through all resume items
✅ Questions mention exact project/company names from YOUR resume

### Example Flow:
**Q1:** "Tell me about your React Dashboard project you mentioned."
**You answer**
**Q2:** "What technical challenges did you face with the React Dashboard?" ← Follow-up on SAME project
**You answer**
**Q3:** "I see you interned at Google. Tell me about that experience." ← MOVES to different item
**You answer**
**Q4:** "How did you measure your impact at Google?" ← Follow-up on Google internship
**You answer**
**Q5:** "Tell me about your E-commerce Platform project..." ← MOVES to another item
...and so on

---

## 🎯 TEST 3: Voice Stops After Interview Completes

### Steps:
1. Start an interview (with or without resume)
2. Answer all 10 questions
3. **Watch what happens when report is generated**

### Expected Behavior:
✅ After question 10, interviewer STOPS speaking
✅ Loading spinner shows "Generating feedback..."
✅ NO voice speaks during feedback generation
✅ Feedback report appears silently
✅ No more questions after 10

### What to Check:
- ❌ Interviewer should NOT speak after "Interview complete"
- ❌ Interviewer should NOT ask question 11
- ✅ Smooth transition to feedback screen

---

## 🎯 TEST 4: All 4 Personas Still Work

### Confused User Test:
**Give vague answers**: "Um, I think I did some coding stuff..."
- ✅ Should ask: "Can you give me a specific example?"
- ✅ Should ask: "Tell me more about that..."

### Efficient User Test:
**Use STAR + metrics**: "At Google (Situation), I was tasked with improving API performance (Task). I implemented caching which (Action) reduced latency by 40% (Result)."
- ✅ Should ask deeper technical questions
- ✅ Should acknowledge good structure

### Chatty User Test:
**Talk too much** (200+ words rambling)
- ✅ Should politely refocus: "That's interesting, but let's focus on..."

### Edge Case Test:
**One-word answer**: "Yes."
- ✅ Should prompt: "Can you elaborate on that?"

---

## 🎯 TEST 5: Advanced Features

### Live Dashboard (4 Metrics):
✅ Communication Score updates after each answer
✅ STAR Usage shows when you use Situation/Task/Action/Result
✅ Confidence Meter tracks uncertainty words ("um", "maybe")
✅ Technical Depth shows when you give examples

### Real-time Coaching Tips:
✅ Appears in green box after weak answers
✅ Tips like "Try using STAR method"
✅ Disappears after 10 seconds

### Sentiment Analysis:
✅ Live emoji shows your mood (😊 confident, 😟 nervous)

---

## 🎯 TEST 6: PDF Upload

### Steps:
1. Upload a PDF resume
2. Check browser console (F12 → Console)
3. Should see: "Extracted text length: XXX"
4. Should NOT see raw PDF code (%PDF-1.5)

### Expected:
✅ PDF text extracted properly
✅ No errors in console
✅ Resume preview shows actual text, not binary

---

## 🚨 CRITICAL BUGS TO WATCH FOR

### ❌ BUG: Interviewer speaks after interview ends
**How to test**: Complete all 10 questions
**Expected**: Silence after question 10
**If broken**: Voice continues speaking during feedback

### ❌ BUG: Asks same project multiple times
**How to test**: Upload resume with 3+ projects
**Expected**: Each project gets 2 questions (initial + follow-up), then moves on
**If broken**: AI keeps asking about same project 3+ times

### ❌ BUG: Resume mode breaks without resume
**How to test**: Don't upload resume
**Expected**: Generic role questions work fine
**If broken**: Errors or weird behavior

---

## ✅ VERIFIED FIXES

✅ **Questions increased from 7 to 10**
✅ **Resume flow: 1 initial + 1 follow-up per item, then move on**
✅ **Voice stops when interview completes** (voiceService.stop() called)
✅ **Works WITH and WITHOUT resume**
✅ **PDF parsing using pdfjs-dist library**

---

## 🔥 READY TO TEST!

**Start server**: Already running on http://localhost:5177

**Quick Test**:
1. Test WITHOUT resume (should ask generic questions)
2. Test WITH resume (should ask about YOUR specific projects)
3. Complete interview (voice should stop at the end)
4. Check that each resume item gets exactly 2 questions

**Report any issues!** 🚀
