# 🚢 Deployment Guide - Vercel

Deploy your Interview Practice Partner to the world for FREE!

## Why Vercel?

- ✅ **100% FREE** for personal projects
- ✅ **Zero configuration** for Vite apps
- ✅ **Automatic HTTPS** and CDN
- ✅ **Instant deployments** with GitHub integration
- ✅ **Environment variables** support

## Prerequisites

- GitHub account
- Vercel account (sign up at vercel.com with GitHub)
- Your code pushed to a GitHub repository

---

## Method 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Interview Practice Partner"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/interview-ai-agent.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your `interview-ai-agent` repository
5. Click **"Import"**

### Step 3: Configure Build Settings

Vercel will auto-detect Vite. Verify these settings:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Click **"Deploy"** (but wait - we need to add the API key first!)

### Step 4: Add Environment Variables

**BEFORE** the first deployment completes:

1. Click **"Environment Variables"** in the deployment settings
2. Add a new variable:
   - **Name:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key (starts with `AIza...`)
   - **Environments:** Check all (Production, Preview, Development)
3. Click **"Add"**
4. Click **"Deploy"**

### Step 5: Wait for Deployment

- Vercel will build and deploy your app (usually 30-60 seconds)
- You'll get a URL like: `https://interview-ai-agent.vercel.app`
- Click the URL to test your live app! 🎉

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

From your project directory:

```bash
# First deployment (preview)
vercel

# Production deployment
vercel --prod
```

### Step 4: Add Environment Variable

```bash
# Add your Gemini API key
vercel env add VITE_GEMINI_API_KEY

# When prompted:
# - Enter your API key
# - Select all environments (Production, Preview, Development)
```

### Step 5: Redeploy with Environment Variable

```bash
vercel --prod
```

---

## Post-Deployment Checklist

After your app is deployed, test these:

- [ ] Visit your Vercel URL
- [ ] Role selection works
- [ ] Can start an interview
- [ ] Voice input works (or text fallback)
- [ ] AI generates responses
- [ ] Feedback dashboard displays correctly
- [ ] Mobile responsive design looks good

---

## Updating Your Deployment

### If Using GitHub Integration:

Just push to your main branch:

```bash
git add .
git commit -m "Update feature X"
git push
```

Vercel will automatically redeploy! ✨

### If Using CLI:

```bash
vercel --prod
```

---

## Custom Domain (Optional)

Want a custom domain like `my-interview-ai.com`?

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Vercel dashboard → Project Settings → Domains
3. Click **"Add Domain"**
4. Enter your domain
5. Follow Vercel's DNS configuration instructions
6. Wait for DNS propagation (5-60 minutes)

---

## Environment Variables Management

### View Current Variables

In Vercel Dashboard:
1. Go to your project
2. Settings → Environment Variables

### Update API Key

1. Edit the variable in Vercel dashboard
2. Redeploy your app (push to GitHub or use CLI)

### Security Best Practices

- ✅ **DO:** Use environment variables for API keys
- ✅ **DO:** Keep `.env` in `.gitignore`
- ✅ **DO:** Use different keys for dev and prod
- ❌ **DON'T:** Hardcode API keys in source code
- ❌ **DON'T:** Commit `.env` files to GitHub

---

## Monitoring & Analytics

### View Deployment Logs

1. Vercel Dashboard → Your Project
2. Click on a deployment
3. View **"Logs"** tab for build and runtime logs

### Analytics (Optional)

Vercel provides free analytics:
1. Project Settings → Analytics
2. Enable analytics
3. View page views, performance metrics, etc.

---

## Troubleshooting Deployment

### Build Fails

**Error:** "Command failed: npm run build"

**Solutions:**
- Check build logs in Vercel dashboard
- Test locally: `npm run build`
- Ensure all dependencies are in `package.json`
- Check Node.js version compatibility

### API Key Not Working

**Error:** "Failed to start interview"

**Solutions:**
- Verify environment variable is named exactly: `VITE_GEMINI_API_KEY`
- Check the key value has no extra spaces
- Redeploy after adding/updating environment variables
- Remember: Vite requires `VITE_` prefix for client-side variables

### 404 Errors on Routes

**Solution:**
- Verify `vercel.json` has proper rewrites configuration (already included)
- This ensures all routes redirect to `index.html` for React Router

### Slow Performance

**Solutions:**
- Vercel automatically optimizes with CDN
- Check your Gemini API key quota/limits
- Consider enabling caching headers (advanced)

---

## Cost & Limits

### Vercel Free Tier Includes:

- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments for every push
- ✅ Unlimited collaborators

### Gemini API Free Tier Includes:

- ✅ 15 requests per minute
- ✅ 1 million tokens per day
- ✅ More than enough for personal interview practice!

---

## Going Further

### Add a Preview Environment

Every PR automatically gets a preview URL:
1. Create a pull request on GitHub
2. Vercel creates a unique preview deployment
3. Test changes before merging
4. Merge to main → auto-deploys to production

### Team Collaboration

Invite team members:
1. Vercel Dashboard → Project Settings → Team
2. Invite by email
3. Collaborators can view deployments and logs

### Performance Optimization

Already included in this project:
- ✅ Vite production build optimization
- ✅ Code splitting
- ✅ Minification
- ✅ Tree shaking

---

## Example Deployment Commands

```bash
# Quick deployment workflow
git add .
git commit -m "Add new feature"
git push origin main

# Vercel CLI workflow
vercel --prod

# Check deployment status
vercel inspect [deployment-url]

# View logs
vercel logs [deployment-url]

# Remove deployment
vercel remove [deployment-name]
```

---

## Support Resources

- 📖 Vercel Documentation: https://vercel.com/docs
- 💬 Vercel Community: https://github.com/vercel/vercel/discussions
- 🔧 Vite Deployment Guide: https://vitejs.dev/guide/static-deploy.html

---

## Success!

Your Interview Practice Partner is now live and accessible to the world! 🌍

**Share your deployed URL:**
- Add to your resume
- Share with friends for practice
- Include in your internship application
- Post on LinkedIn/Twitter

---

**Next Steps:**
- Test thoroughly on different devices
- Gather feedback from friends
- Iterate and improve
- Show it off in your internship application! 🚀

Good luck with your internship! 💪
