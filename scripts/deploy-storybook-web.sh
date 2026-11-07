#!/usr/bin/env bash
# Build (optional) and deploy web Storybook to Firebase Hosting.
# Project: sab-digital-banking-ux (see .firebaserc)
#
# Auth (first match wins):
#   1. GOOGLE_APPLICATION_CREDENTIALS — path to a service account JSON
#   2. FIREBASE_SERVICE_CRED_FILE_PATH — same, used by Fastlane App Distribution
#   3. firebase/sab-digital-banking-ux-firebase-adminsdk*.json if present
#   4. Interactive `firebase login` (local only)
#
# Env:
#   SKIP_BUILD=true     — deploy the existing storybook-static/ folder
#   SKIP_DEPLOY=true    — build only (used by CI when skip_distribution is set)
#   FIREBASE_PROJECT    — override project id (default from .firebaserc)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PROJECT="${FIREBASE_PROJECT:-sab-digital-banking-ux}"
PUBLIC_DIR="storybook-static"
FIREBASE_TOOLS_VERSION="${FIREBASE_TOOLS_VERSION:-13.29.1}"
PACKAGE_VERSION="$(node -p "require('./package.json').version")"
export STORYBOOK_VERSION="${STORYBOOK_VERSION:-$PACKAGE_VERSION}"
echo "==> Storybook package version: v${STORYBOOK_VERSION}"

resolve_credentials() {
  if [ -n "${GOOGLE_APPLICATION_CREDENTIALS:-}" ] && [ -f "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    echo "$GOOGLE_APPLICATION_CREDENTIALS"
    return
  fi
  if [ -n "${FIREBASE_SERVICE_CRED_FILE_PATH:-}" ] && [ -f "$FIREBASE_SERVICE_CRED_FILE_PATH" ]; then
    echo "$FIREBASE_SERVICE_CRED_FILE_PATH"
    return
  fi
  local match
  match="$(ls -1 firebase/sab-digital-banking-ux-firebase-adminsdk*.json 2>/dev/null | head -1 || true)"
  if [ -n "$match" ] && [ -f "$match" ]; then
    echo "$match"
    return
  fi
  return 1
}

if [ "${SKIP_BUILD:-false}" != "true" ]; then
  echo "==> Building web Storybook → ${PUBLIC_DIR}/"
  yarn build-storybook
fi

if [ ! -d "$PUBLIC_DIR" ] || [ ! -f "$PUBLIC_DIR/index.html" ]; then
  echo "::error::Missing ${PUBLIC_DIR}/index.html. Run yarn build-storybook first."
  exit 1
fi

if [ "${SKIP_DEPLOY:-false}" = "true" ]; then
  echo "==> SKIP_DEPLOY=true — Storybook built at ${PUBLIC_DIR}/, not uploaded."
  exit 0
fi

CREDS=""
if CREDS="$(resolve_credentials)"; then
  export GOOGLE_APPLICATION_CREDENTIALS="$CREDS"
  echo "==> Using service account: ${CREDS}"
else
  echo "==> No service account file found. Using the local Firebase CLI login."
fi

echo "==> Deploying Hosting to project ${PROJECT}"
npx --yes "firebase-tools@${FIREBASE_TOOLS_VERSION}" deploy \
  --only hosting \
  --project "$PROJECT" \
  --non-interactive

HOSTING_URL="https://${PROJECT}.web.app"
echo ""
echo "Storybook is live: ${HOSTING_URL}"
echo "Also:              https://${PROJECT}.firebaseapp.com"
