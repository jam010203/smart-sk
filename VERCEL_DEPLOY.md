# Deploy SK to Vercel

## If Chrome shows "Dangerous site" (Google Safe Browsing)

Your app is safe; the warning is usually a **false positive** on new Vercel URLs. To get unblocked:

1. **Use only HTTPS**  
   Always open the site with `https://` (e.g. `https://your-app.vercel.app`).

2. **Request a Safe Browsing review** (required — this is what removes the flag):
   - Open: **https://safebrowsing.google.com/safebrowsing/report_error/**
   - Paste your **full Vercel URL** (e.g. `https://sk-xxxx.vercel.app`).
   - Choose **"I believe this is a safe site"** / **"This is a false positive"**.
   - Add a short note, e.g.:  
     *"This is our legitimate SK (Sangguniang Kabataan) app for barangay management. We own and operate this site. No malware or phishing."*
   - Submit. Google usually rechecks within **24–48 hours** and removes the warning.

3. **Optional**: Add the site in [Google Search Console](https://search.google.com/search-console), verify ownership, and request a security review if the warning persists.

The project already sends strong security headers (HSTS, X-Frame-Options, etc.) and includes a `security.txt` and meta description so the site presents as legitimate. **Only Google can clear the red "Dangerous site" page** — the report form above is the way to do it.

---

## Option A: Deploy with Vercel CLI (quick)

1. **Install Vercel CLI** (one-time):
   ```bash
   npm i -g vercel
   ```
   Or use without installing: `npx vercel`

2. **From the project folder**, run:
   ```bash
   npm run deploy:vercel
   ```
   Or:
   ```bash
   vercel --prod
   ```

3. **First time only**: Log in when prompted and link the project. Choose your Vercel account/team and accept the default settings (Vite is auto-detected from `vercel.json`).

4. After the build finishes, Vercel will print your live URL, e.g.:
   - `https://sk-xxxx.vercel.app` or a custom domain you added.

---

## Option B: Deploy from Git (recommended for ongoing updates)

1. Go to **[vercel.com](https://vercel.com)** and sign in (GitHub/GitLab/Bitbucket).
2. Click **Add New…** → **Project** and **import** your SK repository.
3. Vercel will detect Vite and use:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   (These are set in `vercel.json`.)
4. Click **Deploy**. Every push to your main branch can auto-deploy if you enable that in Project Settings.

---

*If Chrome shows "Dangerous site", see the section at the top of this file.*
