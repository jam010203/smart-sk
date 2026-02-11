# Get account sync working on Netlify (smart-sk-system.netlify.app)

If **Manage User** on the live site still shows "Firebase" or "this browser only" and accounts don’t sync:

## 1. Push the latest code

Make sure the repo that Netlify builds from has the **current** app code (Supabase, no Firebase):

- Commit and push from your project folder:
  ```bash
  git add .
  git commit -m "Use Supabase for sync; remove Firebase"
  git push origin main
  ```
- Netlify will run a new build automatically when you push.

## 2. Set Supabase env vars in Netlify

- **Site configuration** → **Environment variables**
- Add:
  - **Key:** `VITE_SUPABASE_URL`  
    **Value:** `https://flfparfnhoeqynmaslod.supabase.co`
  - **Key:** `VITE_SUPABASE_ANON_KEY`  
    **Value:** your Supabase anon key (from Supabase → Settings → API)

## 3. Redeploy so the build sees the env vars

- If you **added or changed** env vars **after** the last deploy:
  - Go to **Deploys** → **Trigger deploy** → **Deploy site**
- This build will have the Supabase URL and key, so the app will use Supabase and accounts will sync.

## 4. Clear old accounts (optional)

To remove all generated users and keep only admin, run the SQL in **RESET_ACCOUNTS.md** in the Supabase SQL Editor. After that, new accounts you create will sync everywhere.

---

After 1–3, the live site should show “Accounts are synced with Supabase…” on Manage User, and accounts generated in one browser will work in any browser or device.
