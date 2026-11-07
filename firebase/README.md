# Firebase — Storybook web hosting

This folder and the root Firebase config host the **web Storybook** for `@sab-digital-bank/design-system` on Firebase Hosting.

| Item | Value |
| --- | --- |
| Firebase project | `sab-digital-banking-ux` |
| Hosting URLs | https://sab-digital-banking-ux.web.app · https://sab-digital-banking-ux.firebaseapp.com |
| Static output | `storybook-static/` (from `yarn build-storybook`) |
| Version on site | From `package.json` (Release bumps it before Hosting deploy). Shown in the sidebar title and a canvas badge as `vX.Y.Z` |
| App Distribution | Separate — used for Android/iOS APK/IPA, not for this website |

`config.example.ts` documents the **web client** config shape. Keep a local `config.ts` if you need the JS SDK (gitignored). Hosting deploy does **not** use that file. Deploy uses a **service account JSON** (same family as App Distribution) or a local Firebase CLI login.

### Version on the hosted Storybook

The Release workflow bumps `package.json` first, then builds and deploys Hosting. The static site shows that version:

- Sidebar brand: **SAB Design System vX.Y.Z**
- Canvas badge (top right, next to Dark theme): **vX.Y.Z**

Override only if needed: `STORYBOOK_VERSION=1.2.3 yarn deploy:storybook:web`.

## One-time setup

### 1. Enable Hosting in the Firebase console

1. Open [Firebase console](https://console.firebase.google.com/) → project **sab-digital-banking-ux**.
2. Build → **Hosting** → Get started (if Hosting is not enabled yet).
3. You do not need to run `firebase init` again. This repo already has `.firebaserc` and `firebase.json`.

### 2. Service account (CI and non-interactive local deploy)

Use the same service account the release workflow already writes for App Distribution, or create one:

1. Google Cloud Console → IAM → Service accounts for project `sab-digital-banking-ux`.
2. Grant at least:
   - **Firebase Hosting Admin**
   - **Firebase App Distribution Admin** (if the same key also distributes APK/IPA)
3. Create a JSON key. Store it only as the GitHub secret `FIREBASE_SERVICE_ACCOUNT_JSON`, or as a local file that is **gitignored**:

```bash
# Example local path (matches CI)
mkdir -p firebase
# paste the JSON into:
# firebase/sab-digital-banking-ux-firebase-adminsdk-….json
```

Do **not** commit `*adminsdk*.json` or `.env` files.

### 3. Optional: interactive CLI login (laptop only)

```bash
npx firebase-tools@13.29.1 login
npx firebase-tools@13.29.1 use sab-digital-banking-ux
```

## Local deploy (any developer)

From the repo root, after `yarn install`:

```bash
# Build Storybook and upload to Hosting
yarn deploy:storybook:web
```

Useful variants:

```bash
# Build only (inspect storybook-static/ in a browser with any static server)
yarn build-storybook

# Deploy an existing storybook-static/ without rebuilding
SKIP_BUILD=true yarn deploy:storybook:web

# Build only, do not upload (CI uses this when skip_distribution is true)
SKIP_DEPLOY=true yarn deploy:storybook:web
```

Point the CLI at a credentials file explicitly:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$PWD/firebase/sab-digital-banking-ux-firebase-adminsdk-….json"
yarn deploy:storybook:web
```

Or via Fastlane (same script under the hood):

```bash
./scripts/run-bundle.sh exec fastlane web deploy_storybook
```

## CI / CD

### A. Release workflow (with Android / iOS)

**Actions → Release → Run workflow**

| Platform choice | What runs |
| --- | --- |
| `both` | Android + iOS + **web Storybook Hosting** |
| `android` / `ios` | That device only |
| `web` | Web Storybook Hosting only (no device builds, no npm bump path change beyond prepare) |
| `npm` / Publish npm only | npm package only |

`skip_distribution` still skips Firebase App Distribution / store upload for APK/IPA. For web it builds Storybook but **does not** upload Hosting when that checkbox is on.

Secret used: `FIREBASE_SERVICE_ACCOUNT_JSON` (already required for App Distribution). The account must also have **Firebase Hosting Admin**.

### B. Deploy web only (no version bump)

**Actions → Deploy Storybook web → Run workflow**

Builds `storybook-static` and deploys Hosting. Does **not** bump `package.json`, tag, or publish npm. Use this when you only need the website updated.

## Files in this setup

| Path | Role |
| --- | --- |
| `.firebaserc` | Default project id |
| `firebase.json` | Hosting public dir = `storybook-static`, SPA rewrites |
| `scripts/deploy-storybook-web.sh` | Build + `firebase deploy --only hosting` |
| `firebase/config.ts` | Web SDK client config (reference / optional analytics). Not used by Hosting deploy |
| `firebase/*adminsdk*.json` | Service account — **gitignored**, CI writes it from the secret |

## Troubleshooting

| Symptom | Check |
| --- | --- |
| `Missing storybook-static/index.html` | Run `yarn build-storybook` or drop `SKIP_BUILD` |
| `Permission denied` / Hosting 403 | Service account needs **Firebase Hosting Admin** on `sab-digital-banking-ux` |
| Wrong project | `FIREBASE_PROJECT` or `.firebaserc` default |
| Site shows an old Storybook | Hard refresh; `index.html` is sent with `Cache-Control: no-cache` |
| Local login required every time | Prefer a service account file + `GOOGLE_APPLICATION_CREDENTIALS` |

## Security notes

- Client keys in `config.ts` are expected to be public in a browser app; restrict them in the Firebase console (HTTP referrers) if you use the web SDK elsewhere.
- Never commit service account JSON.
- Hosting is public by default. If Storybook must stay internal, put IAP / access control in front of Hosting, or use a private preview channel — ask platform/security before going wide.
