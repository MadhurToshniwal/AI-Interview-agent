# 🚀 Quick Start Guide

## Prerequisites Check

Before you begin, make sure you have:
- ✅ Node.js 16 or higher installed
- ✅ npm or yarn package manager
- ✅ A modern browser (Chrome, Edge, or Firefox recommended)
- ✅ A Google account (for Gemini API key)

## Step-by-Step Setup

### 1. Get Your FREE Gemini API Key (2 minutes)

1. Open your browser and go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click the **"Create API Key"** button
4. Click **"Create API key in new project"**
5. Copy the API key that appears (it will look like: `AIzaSy...`)

**Important:** Keep this key private! Never share it or commit it to GitHub.

### 2. Configure Your Environment (1 minute)

1. Open the `.env` file in the project root
2. Replace the placeholder with your actual API key:

```env
VITE_GEMINI_API_KEY=AIzaSyYOUR_ACTUAL_KEY_HERE
```

3. Save the file

### 3. Install Dependencies (2 minutes)

Open your terminal in the project directory and run:

```bash
npm install
```

Wait for all packages to download and install.

### 4. Start the Development Server (30 seconds)

```bash
npm run dev
```

You should see output like:
```
VITE v7.2.4  ready in 330 ms
➜  Local:   http://localhost:5173/
```

### 5. Open in Browser

1. Open your browser
2. Go to: `http://localhost:5173`
3. You should see the Interview Practice Partner landing page! 🎉

## Quick Test

1. **Click** on "Software Engineer" role
2. **Click** "Start Interview"
3. **Allow** microphone access when prompted (or use text input)
4. **Answer** the first question
5. **Watch** the AI generate an intelligent follow-up!

## Troubleshooting

### "Failed to start interview. Please check your API key."

**Solution:**
- Make sure you created the `.env` file
- Verify your API key is correct (no extra spaces)
- Restart the dev server: `Ctrl+C` then `npm run dev`

### "Microphone permission denied"

**Solutions:**
- Click the microphone icon in the browser address bar and allow access
- OR use the "Switch to Text Input" option

### Build fails or errors on install

**Solutions:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Or on Windows:
rmdir /s node_modules
del package-lock.json
npm install
```

### Server won't start

**Solutions:**
- Check if port 5173 is already in use
- Try: `npm run dev -- --port 3000` to use a different port
- Make sure you're in the correct directory

## Next Steps

- ✅ Read the [README.md](./README.md) for full documentation
- ✅ Try all 4 demo scenarios (Confused, Efficient, Chatty, Edge Case)
- ✅ Practice interviews for different roles
- ✅ Deploy to Vercel (see DEPLOYMENT.md)

## Need Help?

- 📖 Check the full README.md
- 🐛 Review the Troubleshooting section
- 💡 Make sure your .env file is configured correctly

---

**You're ready to practice! Good luck with your interview preparation! 🚀**
