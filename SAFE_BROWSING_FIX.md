# Fix Chrome "Dangerous site" warning

Chrome shows "Dangerous site" when **Google Safe Browsing** has flagged the URL. Your app is safe; the flag is often a **false positive** (e.g. new Netlify or Vercel URLs). Do these steps so the warning goes away.

---

## Step 1: Use only the HTTPS link (fixes "Connection not secure" / ERR_SSL_PROTOCOL_ERROR)

**Always open your site with `https://` (not `http://`) and with no trailing character after the domain:**

- **Netlify:** **`https://smart-sk-system.netlify.app`**  
  - Use this exact URL. Do **not** add a dot or space at the end (e.g. `netlify.app.` causes SSL errors).
- **Vercel:** use your Vercel URL, e.g. `https://your-project.vercel.app`

Type the URL in the address bar or use a bookmark. Do not use links from email or chat unless they start with `https://`. If you see "sent an invalid response" or ERR_SSL_PROTOCOL_ERROR, copy the URL above with no trailing dot and try again.

---

## Step 2: Force HTTPS

- **Netlify:**  
  1. Go to **[Netlify Dashboard](https://app.netlify.com)** → your site.  
  2. **Site configuration** → **Domain management** → **HTTPS** → turn **"Force HTTPS"** **ON**.
- **Vercel:** HTTPS is **on by default**; no extra step needed.

---

## Step 3: Ask Google to review your site (main fix)

Google Safe Browsing has to **remove** the flag. You request a review here:

1. Open: **https://safebrowsing.google.com/safebrowsing/report_error/**
2. Paste the URL that is flagged (your Netlify URL **or** your Vercel URL).
3. Choose **"I believe this is a safe site"** or **"This is a false positive"** (wording may vary).
4. Add a short note, e.g.:  
   *"This is our legitimate SK (Sangguniang Kabataan) app for barangay management. We own and operate this site. No malware or phishing."*
5. Submit the form.

**Submit once per URL** if both Netlify and Vercel are flagged. Google usually rechecks within **24–48 hours**; after that, the "Dangerous site" warning should stop for that URL.

---

## Step 4 (optional): Google Search Console

If the warning persists:

1. Go to **[Google Search Console](https://search.google.com/search-console)**.
2. Add a **property** with your site URL (your Netlify or Vercel URL).
3. Verify ownership (e.g. via HTML tag or DNS if you use a custom domain).
4. If Safe Browsing shows an issue for your site, use the **Request review** / **Security issues** flow in Search Console.

---

## Why this happens

- New or little-known domains (e.g. Netlify or Vercel subdomains) are sometimes flagged by mistake.
- Someone may have reported the URL.
- Using `http://` or an old link can also trigger warnings.

Using **only HTTPS**, **Force HTTPS** (Netlify) or default HTTPS (Vercel), and the **Safe Browsing report form** (Step 3) is the way to get the warning removed.

---

## Temporary workaround for visitors

Until Google clears the flag, a visitor can:

- Click **"Details"** on the warning page, then **"Visit this unsafe site"** (not ideal; only if they trust you), or  
- Use the site in another browser (e.g. Edge or Firefox) that may not have the same flag.

The proper fix is still to complete **Step 3** (and Step 2) so the warning goes away for everyone.
