# 🚀 COMPLETE DEPLOYMENT GUIDE

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ GitHub account (madhurtoshniwal03@gmail.com)
- ✅ Groq API key (already in .env)
- ✅ Vercel account (free - will create if needed)
- ✅ Git installed on your computer

---

## 🔐 STEP 1: Prepare .gitignore

**CRITICAL**: Never commit your API key to GitHub!

Your `.gitignore` should already have:
```
.env
node_modules/
dist/
```

Let's verify this is correct.

---

## 📤 STEP 2: Push to GitHub

### Option A: Using VS Code Terminal (Recommended)

Open PowerShell terminal in VS Code and run these commands:

```powershell
# Navigate to project directory
cd D:\agent\interview-ai-agent

# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/MadhurToshniwal/AI-Interview-agent.git

# Add all files
git add .

# Commit with message
git commit -m "Initial commit: AI Interview Practice Partner with Resume Upload"

# Push to GitHub
git branch -M main
git push -u origin main
```

### If Git Asks for Credentials:

**Email**: madhurtoshniwal03@gmail.com
**Password**: Use Personal Access Token (not your GitHub password)

**To get Personal Access Token**:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token (starts with `ghp_...`)
5. Use this as password when git asks

---

## 🌐 STEP 3: Deploy to Vercel

### 3.1: Create Vercel Account

1. Go to: https://vercel.com/signup
2. Click "Continue with GitHub"
3. Sign in with your GitHub account (madhurtoshniwal03@gmail.com)
4. Authorize Vercel to access your GitHub

### 3.2: Import Your Project

1. In Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Click **"Import Git Repository"**
3. Find **"AI-Interview-agent"** in the list
4. Click **"Import"**

### 3.3: Configure Project

**Framework Preset**: Vite
- Vercel should auto-detect this ✅

**Root Directory**: `./`
- Leave as default ✅

**Build Command**: `npm run build`
- Already configured ✅

**Output Directory**: `dist`
- Already configured ✅

**Install Command**: `npm install`
- Already configured ✅

### 3.4: Add Environment Variable

**THIS IS CRITICAL!**

1. Click **"Environment Variables"** section
2. Add variable:
   - **Name**: `VITE_GROQ_API_KEY`
   - **Value**: `YOUR_GROQ_API_KEY_FROM_ENV_FILE`
   - **Environment**: Production, Preview, Development (select all)
3. Click **"Add"**

**Note**: Copy your actual Groq API key from the `.env` file in your local project.

### 3.5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. You'll get a URL like: `https://ai-interview-agent-abc123.vercel.app`

---

## ✅ STEP 4: Test Live Deployment

### 4.1: Visit Your Live URL

Open the Vercel URL in browser

### 4.2: Test Checklist

- [ ] Homepage loads correctly
- [ ] Can select a role
- [ ] Resume upload works (try uploading a PDF)
- [ ] Interview starts without errors
- [ ] Voice input works (grant microphone permission)
- [ ] AI responds to your answers
- [ ] Live dashboard updates
- [ ] Interview completes and shows feedback

### 4.3: If Something Breaks

**Check Vercel Logs**:
1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Check "Function Logs" and "Build Logs"

**Common Issues**:

**Issue**: "API key not found"
- **Fix**: Add `VITE_GROQ_API_KEY` in Vercel Environment Variables

**Issue**: PDF upload fails
- **Fix**: Already handled - PDF worker is included in build

**Issue**: Build fails
- **Fix**: Check `package.json` has all dependencies

---

## 📝 STEP 5: Update README with Live Link

Once deployed, update your README:

```bash
# Edit README.md and change this line:
# **🔗 Live Demo**: [Try it now!](https://your-deployed-app.vercel.app)

# To your actual Vercel URL:
# **🔗 Live Demo**: [Try it now!](https://ai-interview-agent-abc123.vercel.app)
```

Then commit and push:
```powershell
git add README.md
git commit -m "Add live demo link"
git push
```

Vercel will **automatically redeploy** when you push to GitHub! 🎉

---

## 🔄 STEP 6: Auto-Deployment Setup

**Good news**: Vercel automatically redeploys on every git push!

### How It Works:

1. You make changes to your code locally
2. Commit: `git add . && git commit -m "Update feature"`
3. Push: `git push`
4. Vercel detects the push
5. Automatically builds and deploys
6. Live site updates in 2-3 minutes

---

## 🎯 STEP 7: Final Submission Checklist

### For Your Internship Submission:

- [ ] **GitHub Repo**: https://github.com/MadhurToshniwal/AI-Interview-agent
- [ ] **Live Demo**: Your Vercel URL
- [ ] **Demo Video**: Recorded and uploaded (YouTube/Drive)
- [ ] **README Updated**: With live demo link

### What to Submit:

1. **GitHub Repository Link**: 
   ```
   https://github.com/MadhurToshniwal/AI-Interview-agent
   ```

2. **Live Demo URL**:
   ```
   https://your-app.vercel.app
   ```

3. **Demo Video Link**:
   ```
   (Upload to YouTube or Google Drive)
   ```

4. **Brief Description**:
   ```
   AI-powered interview practice agent with resume upload, 
   persona detection, and real-time feedback. Built with 
   React, Groq AI (Llama 3.3), and Web Speech API.
   ```

---

## 🔧 TROUBLESHOOTING

### If `git push` fails:

**Error**: "Repository not found"
```powershell
git remote -v  # Check remote URL
git remote set-url origin https://github.com/MadhurToshniwal/AI-Interview-agent.git
```

**Error**: "Permission denied"
- Use Personal Access Token (not password)
- Generate at: https://github.com/settings/tokens

### If Vercel build fails:

**Check**:
1. `package.json` has all dependencies
2. `.env` is in `.gitignore` (shouldn't be pushed)
3. Environment variable is added in Vercel dashboard

### If live site has errors:

1. Open browser console (F12)
2. Check for errors
3. Most common: Missing API key in Vercel env vars

---

## 📊 STEP 8: Monitor Your Deployment

### Vercel Analytics (Free)

1. Go to Vercel Dashboard
2. Click your project
3. Click "Analytics" tab
4. See:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### Usage Limits (Vercel Free Tier)

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month (plenty!)
- ✅ Automatic HTTPS
- ✅ Custom domains (optional)

---

## 🎉 SUCCESS CRITERIA

Your deployment is successful if:

✅ GitHub repo is public and accessible
✅ Vercel site loads without errors
✅ Can complete a full interview
✅ Resume upload works
✅ AI responds correctly
✅ Feedback generates at end
✅ No console errors

---

## 📞 SUPPORT

### If You Get Stuck:

1. **Vercel Issues**: https://vercel.com/docs
2. **GitHub Issues**: https://docs.github.com
3. **Check logs**: Vercel Dashboard → Deployments → Function Logs

### Quick Commands Reference:

```powershell
# Check git status
git status

# See commit history
git log --oneline

# Check remote
git remote -v

# Pull latest changes
git pull

# Force push (if needed)
git push -f origin main
```

---

## ✅ FINAL STEPS SUMMARY

**Complete these in order:**

1. ✅ Verify `.gitignore` has `.env`
2. ✅ Push to GitHub
3. ✅ Create Vercel account
4. ✅ Import GitHub repo to Vercel
5. ✅ Add `VITE_GROQ_API_KEY` environment variable
6. ✅ Deploy
7. ✅ Test live site
8. ✅ Update README with live URL
9. ✅ Push README update
10. ✅ Submit for internship

**Total time**: 15-20 minutes

---

## 🏆 YOU'RE READY!

Once deployed:
- Share your Vercel URL in demo video
- Include it in submission
- Show it running live during demo

**Your project is production-ready and will impress! 🚀**

---

**Last Updated**: November 23, 2025
