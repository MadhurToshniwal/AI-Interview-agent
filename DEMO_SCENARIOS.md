# 🎭 Demo Scenarios Guide

This guide shows evaluators how to test the 4 key user personas the Interview Practice Partner handles intelligently.

---

## 🎯 Overview

The AI agent adapts to these 4 distinct user behaviors:

1. **😕 Confused User** - Needs guidance and clarification
2. **⚡ Efficient User** - Wants to get straight to business
3. **💬 Chatty User** - Goes off-topic, needs gentle redirection
4. **🎭 Edge Case User** - Tests system limits (silence, one-word answers)

---

## Scenario 1: 😕 Confused User

### Goal
Test how the agent handles users who are uncertain, need guidance, or don't understand the process.

### How to Test

1. **Start the app** and on the role selection screen, DON'T select a role yet
2. **Use voice or text** and say something like:
   - *"Um, I want interview practice... for jobs?"*
   - *"I'm not sure what to do here"*
   - *"Can you help me?"*

### What to Observe

✅ **Expected Behavior:**
- Agent should be **patient and encouraging**
- Provides **clear guidance** on what to do next
- Asks **clarifying questions** to understand needs
- Walks user through the process step-by-step

### During Interview Test

Give vague, uncertain answers:
- *"Um, I worked on projects... I guess?"*
- *"I'm not sure what you mean by that"*
- *"I think... maybe... it was okay?"*

✅ **Expected Behavior:**
- Agent asks **specific probing questions**
- Encourages user to provide **concrete examples**
- Shows **empathy and patience**
- Provides **STAR framework hints** to help structure answers

---

## Scenario 2: ⚡ Efficient User

### Goal
Test how the agent handles users who are experienced, time-conscious, and want to practice efficiently.

### How to Test

1. **Start the app**
2. **Quickly select** Software Engineer role
3. **Don't adjust settings**, just click "Start Interview"
4. Give **concise, well-structured answers** using STAR method

**Example Answer:**
> *"At my last internship, our deployment pipeline was taking 45 minutes. I researched containerization, proposed Docker, and implemented it with the team. This reduced deployment time by 60% to under 18 minutes and improved our release frequency from weekly to daily."*

### What to Observe

✅ **Expected Behavior:**
- Agent **recognizes strong answers** with acknowledgment
  - *"Excellent, I can see you have solid experience..."*
- Asks **deeper technical questions** to challenge you
- Maintains **professional, brisk pace**
- Doesn't waste time with basic questions

### Follow-Up Test

When agent asks a follow-up, give another strong, concise answer.

✅ **Expected Behavior:**
- Agent continues to **raise difficulty**
- Probes **edge cases and trade-offs**
- Respects your expertise level

---

## Scenario 3: 💬 Chatty User

### Goal
Test how the agent handles users who go off-topic, ramble, or talk excessively without structure.

### How to Test

1. **Start a Product Manager interview**
2. When asked a question, **start answering then drift off-topic**

**Example Response:**
> *"Oh yeah, I worked on a mobile app feature... Actually, speaking of mobile apps, have you seen the new Instagram update? It's crazy how social media keeps evolving. I remember when Facebook first came out in college... anyway, where was I? Oh right, so the app had this feature..."*

Or mention unrelated topics:
- Weather: *"It's so hot today, I can barely think..."*
- Movies: *"This reminds me of that scene in The Social Network..."*
- Food: *"Sorry, I'm distracted, I'm really hungry..."*

### What to Observe

✅ **Expected Behavior:**
- Agent **politely redirects** you back to the question
  - *"That's interesting, but let's get back to your mobile app project. Tell me more about..."*
- Shows **patience** but maintains control
- Gently **refocuses** the conversation
- Doesn't get derailed by tangents

### Stress Test

Try going off-topic **multiple times** in one interview.

✅ **Expected Behavior:**
- Agent remains **professional and patient**
- Each redirect is **polite but firm**
- Still completes the interview successfully

---

## Scenario 4: 🎭 Edge Case User

### Goal
Test how the system handles unusual behaviors and edge cases.

### Test 4A: Silent User

1. **Start an interview**
2. When asked a question, **stay completely silent**
3. **Wait 30+ seconds** without answering

✅ **Expected Behavior:**
- After ~30 seconds, agent **gently prompts** you
  - *"Take your time. If you need me to rephrase the question, just let me know."*
- Shows **patience and understanding**
- Doesn't rush or pressure

### Test 4B: One-Word Answers

Give extremely brief answers:
- Question: *"Tell me about a challenging project"*
- Your answer: *"E-commerce."*

Or:
- Question: *"How did you handle that?"*
- Your answer: *"Good."*

✅ **Expected Behavior:**
- Agent recognizes **incomplete answers**
- Asks **open-ended follow-up** to get more detail
  - *"Could you elaborate on that? I'd love to hear more details about your experience."*
- Encourages **specific examples**

### Test 4C: Mid-Interview Role Change

1. **Start a Sales interview**
2. After 2-3 questions, say:
   - *"Actually, can we change to a software engineer interview instead?"*

✅ **Expected Behavior:**
- Agent **acknowledges the request**
- Politely suggests **finishing current interview** first
  - *"I understand you'd like to switch focus. Let's finish this interview first, then you can start a new one for software engineering."*
- Maintains interview flow

### Test 4D: Nonsensical Response

Give a completely random answer:
- Question: *"Tell me about your sales experience"*
- Your answer: *"Purple elephants dance in the moonlight"*

✅ **Expected Behavior:**
- Agent **gracefully handles** unexpected input
- May ask for **clarification**
- Doesn't break or error out

### Test 4E: API Failure Simulation

1. **Remove or invalidate** your Gemini API key in `.env`
2. **Try to start an interview**

✅ **Expected Behavior:**
- Shows **clear error message**
  - *"Failed to start interview. Please check your API key in the .env file."*
- Doesn't crash the app
- User can go back and try again

---

## 🧪 Advanced Testing

### Test Persona Detection

The agent builds a profile over the interview:

**Nervous User:**
- Use lots of filler words: *"Um, uh, like, you know, kind of, sort of..."*
- Give hesitant answers

**Expected:** Agent provides more **encouragement and hints**

**Overconfident User:**
- Give answers without evidence: *"I'm the best at everything"*
- Make grand claims without metrics

**Expected:** Agent asks for **specific examples and proof**

---

## 📊 Feedback Quality Test

After completing any interview, check the feedback dashboard:

✅ **Verify these elements exist:**
- [ ] Overall grade (A-F) and percentage score
- [ ] 5 individual scores (STAR, Technical, Communication, Confidence, Overall)
- [ ] Personality profile detection
- [ ] At least 2-3 strengths with examples
- [ ] At least 2-3 improvements with actionable advice
- [ ] Key takeaway message
- [ ] Full interview transcript

✅ **Verify feedback quality:**
- [ ] Scores seem **accurate** based on your answers
- [ ] Improvements are **specific and actionable**
- [ ] Examples reference **actual things you said**
- [ ] Feedback is **encouraging yet honest**

---

## 🎯 Quick Test Matrix

| Persona | What to Do | Expected Agent Response |
|---------|-----------|------------------------|
| Confused | Vague, uncertain answers | Patient guidance, clarifying questions |
| Efficient | Strong, concise STAR answers | Deeper questions, higher difficulty |
| Chatty | Off-topic rambling | Polite redirection to question |
| Edge - Silent | Don't answer for 30s | Gentle prompt after timeout |
| Edge - Brief | One-word answers | Open-ended follow-ups |
| Edge - Switch | Request role change | Suggests finishing current interview |

---

## 🏆 Success Criteria

The Interview Practice Partner **passes** if:

1. ✅ All 4 personas are **handled intelligently**
2. ✅ Agent **never breaks or crashes**
3. ✅ Redirects are **polite and professional**
4. ✅ Feedback is **specific and actionable**
5. ✅ Edge cases are **handled gracefully**
6. ✅ User experience remains **smooth throughout**

---

## 💡 Tips for Evaluators

- **Try each scenario** at least once
- **Mix behaviors** in a single interview (confused → efficient)
- **Test voice AND text** input methods
- **Check mobile responsiveness** on phone/tablet
- **Review the generated feedback** carefully

---

## 🎬 Suggested Testing Flow

**5-Minute Quick Test:**
1. Confused user scenario (2 min)
2. One-word answer edge case (1 min)
3. Check feedback quality (2 min)

**15-Minute Comprehensive Test:**
1. Confused user - full interview
2. Efficient user - full interview
3. Chatty user - test redirection
4. All edge cases
5. Review feedback for both interviews

---

**Happy Testing! 🚀**

This agent is designed to handle the messy reality of human conversation - not just perfect, structured responses. Try to break it, test edge cases, and see how it adapts!
