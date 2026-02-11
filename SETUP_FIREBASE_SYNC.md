# Set up account sync across Chrome and all browsers

Follow these steps once. After this, generated accounts will sync everywhere (Chrome, Edge, other devices).

---

## Quick path (after you have Firebase config)

1. Paste your Firebase config values into the **`.env`** file in the project root (see step 2 below for the variable names).
2. In the project folder run:
   ```bash
   npm run setup:netlify-sync
   ```
   This imports `.env` into Netlify and deploys. Account sync will be on for the live site.

---

## 1. Create a Firebase project (2 min)

1. Go to **https://console.firebase.google.com/**
2. Click **Add project** (or use an existing one) → name it (e.g. `sk-inovision`) → continue → disable Google Analytics if you want → **Create project**
3. In the left sidebar click **Build** → **Firestore Database** → **Create database** → choose **Start in test mode** (you can tighten rules later) → pick a region → **Enable**
4. Click the **gear** next to “Project Overview” → **Project settings** → scroll to **Your apps** → click the **Web** icon `</>`
5. Register app: e.g. nickname **SK Web** → **Register app**
6. You’ll see a config object like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123:web:abc..."
};
```

Keep this tab open for the next step.

---

## 2. Add environment variables

### Option A – Local (for `npm run dev`)

1. In the project root, create a file named **`.env`** (same folder as `package.json`).
2. Paste this and **replace the empty values** with the values from your Firebase config (step 1):

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Save the file. Do **not** commit `.env` to git (it’s in `.gitignore`).

### Option B – Netlify (for the live site)

1. Go to **https://app.netlify.com** → your site **smart-sk-system** → **Site configuration** → **Environment variables** → **Add a variable** → **Add single variable**
2. Add each variable (one by one), with **Key** and **Value** from your Firebase config:

| Key | Value (from Firebase config) |
|-----|------------------------------|
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

3. Save. Then trigger a **new deploy**: **Deploys** → **Trigger deploy** → **Deploy site**.

---

## 3. Firestore security rules (1 min)

1. In Firebase Console go to **Firestore Database** → **Rules**
2. Replace the rules with this (same as `firestore.rules.example` in the repo):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appConfig/generatedAccounts {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**.

*(You can restrict this later, e.g. to your domain or with Firebase Auth.)*

---

## 4. Done

- **Local:** Run `npm run dev` and use the app; accounts will sync via Firestore.
- **Live:** After redeploying Netlify with the env vars set, open **https://smart-sk-system.netlify.app** in Chrome and in another browser (or device). Generate an account in one – it will appear in the other.

No code changes needed. If the env vars are missing, the app still works and keeps using only the current browser’s storage.
