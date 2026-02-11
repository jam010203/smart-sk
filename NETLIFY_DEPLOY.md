# Deploy SK to Netlify – Step-by-Step Guide

Your project is a **Vite + React** app. Follow these steps to deploy it on Netlify.

**Already deployed and want the URL `https://smart-sk-system.netlify.app`?**  
Go to [Netlify Dashboard](https://app.netlify.com) → your site → **Site configuration** → **General** → **Change site name** → enter **`smart-sk-system`** → Save. Your live URL will then be **https://smart-sk-system.netlify.app**.

---

## Prerequisites

1. **Git** – Your code in a Git repo (GitHub, GitLab, or Bitbucket).
2. **Netlify account** – Sign up at [https://www.netlify.com](https://www.netlify.com) (free tier is enough).

---

## Step 1: Put Your Code on Git (if not already)

1. Open a terminal in your project folder: `c:\Users\WINDOWS\Desktop\SK`
2. Initialize Git (if needed) and create a repo on GitHub/GitLab/Bitbucket, then run:

```bash
git init
git add .
git commit -m "Prepare for Netlify deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual repo URL. If the repo already exists and is connected, just make sure the latest code is pushed.

---

## Step 2: Log In to Netlify

1. Go to **[https://app.netlify.com](https://app.netlify.com)** and log in (or sign up).
2. You’ll land on the **Team overview** (sites list).

---

## Step 3: Create a New Site from Git

1. Click **“Add new site”** → **“Import an existing project”**.
2. Choose **“Deploy with GitHub”** (or GitLab / Bitbucket if you use that).
3. If asked, **authorize Netlify** to access your Git provider and select the account/org that owns the repo.
4. In the list of repositories, **select your SK repo** (the one you pushed in Step 1).
5. Click **“Import”** or **“Next”**.

---

## Step 4: Configure Build Settings

Netlify will read `netlify.toml` from your repo. You should see (or can confirm):

| Setting           | Value           |
|------------------|-----------------|
| **Build command**  | `npm run build` |
| **Publish directory** | `dist`       |
| **Base directory**   | (leave empty) |

- If these are **not** pre-filled, enter:
  - **Build command:** `npm run build`
  - **Publish directory:** `dist`
- Leave **Base directory** empty unless your app lives in a subfolder.
- **Environment variables:** Add any your app needs (e.g. Supabase—see "Supabase on Netlify" below; add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy). If you don’t use env vars yet, skip this.

Then click **“Deploy site”** (or **“Deploy [site name]”**).

---

## Step 5: Wait for the First Deploy

1. Netlify will **clone the repo**, run `npm install` and `npm run build`, and publish the `dist` folder.
2. The **Deploy log** will show progress; wait until the status is **“Published”** (green).
3. If the build **fails**, open the log and fix the reported errors (e.g. missing env vars, wrong Node version), then push a new commit or trigger **“Retry deploy”**.

---

## Step 6: Open Your Live Site

1. When the deploy is **Published**, Netlify shows a **site URL** (e.g. `https://random-name-12345.netlify.app`). After changing the site name to **smart-sk-system** (Step 8), your URL will be **https://smart-sk-system.netlify.app**.
2. Click the link to open your SK app.
3. Test login, navigation, and main features to confirm everything works.

---

## Step 7: (Optional) Use a Custom Domain

1. In Netlify: **Site configuration** → **Domain management** → **Add custom domain** (or **Add domain**).
2. Enter your domain (e.g. `sk.yourbarangay.gov.ph`).
3. Follow Netlify’s instructions to **point your domain** to Netlify (DNS records or Netlify DNS).
4. Netlify will provision **HTTPS** for the custom domain.

---

## Step 8: Change Site Name to Get smart-sk-system.netlify.app

1. Go to **Site configuration** → **General** → **Site details**.
2. Click **“Change site name”** and enter: **`smart-sk-system`** (lowercase, hyphens only).
3. Save. Your site URL will be: **https://smart-sk-system.netlify.app**.

---

## Automatic Deploys

- Every **push to the branch** you connected (e.g. `main`) will trigger a new build and deploy.
- You can see all deploys under **Deploys** in the left sidebar.

---

## "Dangerous site" or "Not secure" in Chrome

- **Always use the HTTPS URL**: **https://smart-sk-system.netlify.app**. Netlify provides HTTPS by default; do not open the site via `http://`.
- If you use a **custom domain**, add it in Netlify and enable **HTTPS** in **Domain management** so Chrome does not flag the site.
- The project’s `netlify.toml` includes security headers (HSTS, X-Frame-Options, etc.) to improve trust when the site is served over HTTPS.

## Real-time updates after deploy

- **index.html** is served with `Cache-Control: no-cache`, so a full page reload (e.g. F5 or reopening the tab) loads the latest deploy.
- The app checks for a new version every 10 minutes and shows a **“New version available. Refresh now”** banner when a new deploy is live. Users can click **Refresh now** to get the latest version.

## Troubleshooting

| Problem | What to do |
|--------|------------|
| **Build fails** | Check the **Deploy log** for the exact error (e.g. `npm run build` failure). Fix the error locally, commit, and push. |
| **404 on refresh / direct URL** | Ensure `netlify.toml` has the SPA redirect (`/* → /index.html`). It’s already in this project. |
| **Blank page** | Check browser console and **build log**. Often caused by wrong **base** in Vite (e.g. if app is not at root). For root deploy, no `base` in `vite.config.js` is correct. |
| **Node version** | If build fails with Node errors, add in Netlify: **Site configuration** → **Environment** → **Environment variables** → `NODE_VERSION` = `20` (or the version you use locally). |
| **Dangerous site warning** | Use the **HTTPS** URL only. Add a custom domain in Netlify and enable HTTPS if needed. |

---

## Supabase on Netlify (accounts + activity sync)

So that **generated accounts** and **Active users** stay in sync on the live site (and across all browsers):

1. **Site configuration** → **Environment variables** (or **Build & deploy** → **Environment**).
2. Add:
   - **Key:** `VITE_SUPABASE_URL` → **Value:** your Supabase Project URL (e.g. `https://xxxxx.supabase.co`)
   - **Key:** `VITE_SUPABASE_ANON_KEY` → **Value:** your Supabase anon public key  
   (Get both from [Supabase](https://supabase.com) → your project → **Settings** → **API**.)
3. Save. Then go to **Deploys** → **Trigger deploy** → **Deploy site** so the build includes these variables.

Without these, the Netlify site runs but accounts and activity do not sync with Supabase.

---

## Quick Reference

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Config file:** `netlify.toml` (in the repo)
- **SPA redirect:** All routes → `/index.html` (in `netlify.toml`)
- **Supabase:** Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify env, then redeploy.

Once your repo is connected and the first deploy succeeds, you’re done. Future pushes to the same branch will deploy automatically.
