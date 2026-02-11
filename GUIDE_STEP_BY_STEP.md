# Step-by-step: Enable account sync (Chrome + all browsers)

Do these steps in order. When you're done, generated accounts will sync on every browser and device.

---

## Part 1: Get your Firebase config (about 3 minutes)

### Step 1.1 – Open Firebase
1. Open your browser.
2. Go to: **https://console.firebase.google.com/**
3. Sign in with your Google account if asked.

### Step 1.2 – Create or choose a project
1. If you see **“Add project”**, click it.
   - Project name: e.g. **SK Inovision** (any name is fine).
   - Click **Continue** → **Continue** → **Create project** → wait a few seconds → **Continue**.
2. If you already have a project, click it and go to the project home.

### Step 1.3 – Turn on Firestore
1. In the left sidebar, click **“Build”**.
2. Click **“Firestore Database”**.
3. If you see **“Create database”**:
   - Click it → choose **“Start in test mode”** → **Next**.
   - Pick a region (e.g. **asia-southeast1** or nearest to you) → **Enable**.
4. If the database already exists, you’re done for this step.

### Step 1.4 – Get your web app config
1. Click the **gear icon** next to **“Project Overview”** (top left).
2. Click **“Project settings”**.
3. Scroll down to **“Your apps”**.
4. If there is **no** web app yet:
   - Click the **</>** (Web) icon.
   - App nickname: e.g. **SK Web** → **Register app**.
5. You’ll see a code block like this:

   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```

6. **Keep this tab open** (or copy these 6 values into a notepad). You’ll paste them into Netlify in Part 2.

---

## Part 2: Put the config into Netlify (about 2 minutes)

### Step 2.1 – Open Netlify env vars
1. Go to: **https://app.netlify.com**
2. Click your site **“smart-sk-system”** (or the name you use).
3. In the top menu, click **“Site configuration”**.
4. In the left sidebar, click **“Environment variables”**.

You should already see these 6 variables (they may be empty):

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Step 2.2 – Fill each variable
For **each** of the 6 variables above:

1. Click the variable name (or the **“Options”** / **“Edit”** next to it).
2. In the **Value** field, paste the matching value from your Firebase config (no quotes, no spaces):

| Netlify variable name              | Copy this from Firebase config |
|-----------------------------------|---------------------------------|
| `VITE_FIREBASE_API_KEY`           | `apiKey` (the long string)      |
| `VITE_FIREBASE_AUTH_DOMAIN`       | `authDomain`                    |
| `VITE_FIREBASE_PROJECT_ID`        | `projectId`                     |
| `VITE_FIREBASE_STORAGE_BUCKET`    | `storageBucket`                  |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId`           |
| `VITE_FIREBASE_APP_ID`            | `appId`                         |

3. Click **Save** or **Update**.
4. Repeat for all 6 variables.

Example:  
- Firebase shows `apiKey: "AIzaSyC123abc..."`  
- In Netlify, open **VITE_FIREBASE_API_KEY** and paste: **AIzaSyC123abc...** (no quotes).

### Step 2.3 – Redeploy the site
1. In Netlify, click **“Deploys”** in the top menu.
2. Click **“Trigger deploy”** (or **“Deploy site”**).
3. Choose **“Deploy site”** (production).
4. Wait until the deploy status is **“Published”** (usually 1–2 minutes).

---

## Part 3: Check that sync works

1. Open your site: **https://smart-sk-system.netlify.app**
2. Log in as **admin**.
3. Go to **“Generate Account”** and create one test account (e.g. **test@sklgu.gov.ph**).
4. Open the **same site in another browser** (e.g. Chrome and Edge), or on your phone.
5. Log in as admin there too and open **“Manage User”** or **“Generate Account”**.
6. You should see the **same** account in both places. That means sync is working.

---

## If something goes wrong

- **Variables not in Netlify?**  
  In your project folder run:  
  `npx netlify env:import .env.netlify`  
  Then fill the values in Netlify as in Part 2.

- **No Firebase project yet?**  
  Do Part 1 from the beginning (Steps 1.1–1.4).

- **Sync still not working after deploy?**  
  Make sure you clicked **“Trigger deploy”** after saving all 6 env vars, and wait until the deploy is **“Published”**.

- **Firestore rules (optional):**  
  In Firebase Console → **Firestore Database** → **Rules**, you can use the rules in **firestore.rules.example** in this project. Sync will work even with default test-mode rules.

---

**Summary:**  
Part 1 = get 6 values from Firebase.  
Part 2 = paste them into Netlify env vars and redeploy.  
Part 3 = test in two browsers.  
Done.
