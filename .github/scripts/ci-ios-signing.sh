#!/usr/bin/env bash
# Prepare a temporary keychain for Fastlane Match on CI.
# Match (readonly) installs the Distribution cert + provisioning profiles.
#
# Required env: RUNNER_TEMP
# Optional: none (MATCH_* secrets are consumed by Fastlane)
#
# Exports / GITHUB_ENV:
#   KEYCHAIN_PATH, KEYCHAIN_PASSWORD,
#   MATCH_KEYCHAIN_NAME, MATCH_KEYCHAIN_PASSWORD
set -euo pipefail

if [ -z "${RUNNER_TEMP:-}" ]; then
  RUNNER_TEMP="$(mktemp -d "${TMPDIR:-/tmp}/sab-signing.XXXXXX")"
  export RUNNER_TEMP
fi

KEYCHAIN_PATH="${RUNNER_TEMP}/app-signing.keychain-db"
KEYCHAIN_PASSWORD="$(openssl rand -base64 32)"

# Replace previous job keychain if still listed.
if [ -f "${KEYCHAIN_PATH}" ]; then
  security delete-keychain "$KEYCHAIN_PATH" 2>/dev/null || true
fi

security create-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN_PATH"
security set-keychain-settings -lut 21600 "$KEYCHAIN_PATH"
security unlock-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN_PATH"
security list-keychain -d user -s "$KEYCHAIN_PATH" login.keychain-db
security default-keychain -s "$KEYCHAIN_PATH"

# Apple WWDR intermediate (helps codesign trust chain)
curl -fsSL -o "$RUNNER_TEMP/AppleWWDRCAG3.cer" \
  https://www.apple.com/certificateauthority/AppleWWDRCAG3.cer
security import "$RUNNER_TEMP/AppleWWDRCAG3.cer" -k "$KEYCHAIN_PATH" || true

echo "Created CI signing keychain: $KEYCHAIN_PATH"
echo "Fastlane Match will install certs/profiles into this keychain (readonly)."

export KEYCHAIN_PATH KEYCHAIN_PASSWORD
export MATCH_KEYCHAIN_NAME="$KEYCHAIN_PATH"
export MATCH_KEYCHAIN_PASSWORD="$KEYCHAIN_PASSWORD"

# Ensure Fastfile takes the Match path (not legacy base64 profile env).
unset IOS_PROVISIONING_PROFILE_UUID IOS_PROVISIONING_PROFILE_NAME || true

if [ -n "${GITHUB_ENV:-}" ]; then
  {
    echo "KEYCHAIN_PATH=$KEYCHAIN_PATH"
    echo "KEYCHAIN_PASSWORD=$KEYCHAIN_PASSWORD"
    echo "MATCH_KEYCHAIN_NAME=$KEYCHAIN_PATH"
    echo "MATCH_KEYCHAIN_PASSWORD=$KEYCHAIN_PASSWORD"
  } >> "$GITHUB_ENV"
fi
