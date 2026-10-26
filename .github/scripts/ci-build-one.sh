#!/usr/bin/env bash
# Build + distribute one variant for one platform from the shared workspace.
# Usage: ci-build-one.sh <android|ios> <demo|storybook>
#
# Reads item details from .ci/{android,ios}-matrix.json (written by prepare).
set -euo pipefail

PLATFORM="${1:?platform android|ios}"
VARIANT="${2:?variant demo|storybook}"
ROOT="${SHARED_WORKSPACE:?SHARED_WORKSPACE required}"
cd "$ROOT"
chmod +x .github/scripts/*.sh

MATRIX_FILE="$ROOT/.ci/${PLATFORM}-matrix.json"
if [ ! -f "$MATRIX_FILE" ]; then
  MATRIX_FILE="$HOME/actions-runner/shared/${PLATFORM}-matrix.json"
fi
if [ ! -f "$MATRIX_FILE" ]; then
  echo "::error::Missing matrix file for $PLATFORM"
  exit 1
fi

ITEM="$(jq -c --arg v "$VARIANT" '[.[] | select(.variant == $v)][0]' "$MATRIX_FILE")"
if [ "$ITEM" = "null" ] || [ -z "$ITEM" ]; then
  echo "::error::No matrix entry for $PLATFORM/$VARIANT"
  exit 1
fi

channel="$(jq -r '.channel' <<<"$ITEM")"
script="$(jq -r '.yarn_script' <<<"$ITEM")"
env_key="$(jq -r '.env_key' <<<"$ITEM")"
env_file="$(jq -r '.env_file' <<<"$ITEM")"

SKIP_DISTRIBUTION=false
if [ -f "$ROOT/.ci/skip_distribution" ]; then
  SKIP_DISTRIBUTION="$(tr -d '[:space:]' <"$ROOT/.ci/skip_distribution")"
elif [ -f "$HOME/actions-runner/shared/skip_distribution" ]; then
  SKIP_DISTRIBUTION="$(tr -d '[:space:]' <"$HOME/actions-runner/shared/skip_distribution")"
fi

ART_DIR="$ROOT/artifacts/ci/${PLATFORM}/${VARIANT}-${channel}"
mkdir -p "$ART_DIR"

echo "Building $PLATFORM / $VARIANT ($channel) via yarn $script"
bash .github/scripts/ci-write-env-file.sh "$env_key" "$env_file" "$SKIP_DISTRIBUTION"

# Upsert KEY=VALUE in env file (replace existing line or append).
env_upsert() {
  local file="$1" key="$2" value="$3"
  grep -v "^${key}=" "$file" > "${file}.tmp" || true
  mv "${file}.tmp" "$file"
  printf '%s=%s\n' "$key" "$value" >> "$file"
}

# Channel only — release notes come from last v*-{channel} tag.
# Git tags are pushed once by the tag-release job (not per build).
env_upsert "$env_file" "RELEASE_CHANNEL" "$channel"
export RELEASE_CHANNEL="$channel"

if [ "$PLATFORM" = "android" ]; then
  if [ "$channel" = "store" ]; then
    if [ -z "${PLAY_STORE_JSON:-}" ]; then
      echo "Missing PLAY_STORE_JSON secret"
      exit 1
    fi
    printf '%s\n' "$PLAY_STORE_JSON" > fastlane/fastlane-Supply.json
  fi
  yarn "$script"
  find android/app/build/outputs -type f \( -name '*.apk' -o -name '*.aab' \) 2>/dev/null \
    | while IFS= read -r f; do
        cp -f "$f" "$ART_DIR/$(basename "$f")"
        echo "Stashed $f"
      done
  if [ -z "$(find "$ART_DIR" -type f 2>/dev/null | head -1)" ]; then
    echo "::warning::No APK/AAB found after Android $VARIANT build"
    find android/app/build -type f \( -name '*.apk' -o -name '*.aab' \) 2>/dev/null | head -20 || true
  fi
elif [ "$PLATFORM" = "ios" ]; then
  # Require Match secrets (replaces BUILD_CERTIFICATE_BASE64 + profile base64).
  if [ -z "${MATCH_PASSWORD:-}" ]; then
    echo "::error::MATCH_PASSWORD secret is required for iOS Match signing"
    exit 1
  fi
  if [ -z "${MATCH_GIT_BASIC_AUTHORIZATION:-}" ] && [ -z "${MATCH_GIT_PRIVATE_KEY:-}" ]; then
    echo "::error::MATCH_GIT_BASIC_AUTHORIZATION (or MATCH_GIT_PRIVATE_KEY) is required to clone certificates.git"
    exit 1
  fi

  # If a prior job deleted ios/build, DerivedData can be stale and gym fails with
  # missing RCTAppDependencyProvider.h. Force a clean slate for codegen.
  CODEGEN_H="ios/build/generated/ios/RCTAppDependencyProvider.h"
  if [ ! -f "$CODEGEN_H" ]; then
    echo "::warning::RN codegen header missing ($CODEGEN_H) — clearing SabDesignSystem DerivedData"
    find "$HOME/Library/Developer/Xcode/DerivedData" -maxdepth 1 -type d -name 'SabDesignSystem-*' -exec rm -rf {} + 2>/dev/null || true
  fi

  # Temp keychain for Match imports (no base64 cert/profile install).
  # shellcheck disable=SC1091
  source .github/scripts/ci-ios-signing.sh

  # Ensure env file drives Match (not legacy IOS_PROVISIONING_*).
  grep -vE '^IOS_PROVISIONING_PROFILE_(UUID|NAME)=' "$env_file" > "${env_file}.tmp" || true
  mv "${env_file}.tmp" "$env_file"

  env_upsert "$env_file" "USE_MATCH" "true"
  env_upsert "$env_file" "MATCH_PASSWORD" "$MATCH_PASSWORD"
  env_upsert "$env_file" "MATCH_GIT_URL" \
    "${MATCH_GIT_URL:-https://github.com/SABDigitalBank/certificates.git}"
  env_upsert "$env_file" "MATCH_GIT_BRANCH" "${MATCH_GIT_BRANCH:-main}"
  env_upsert "$env_file" "MATCH_KEYCHAIN_NAME" "$MATCH_KEYCHAIN_NAME"
  env_upsert "$env_file" "MATCH_KEYCHAIN_PASSWORD" "$MATCH_KEYCHAIN_PASSWORD"

  # Optional ASC API key for store uploads / Match portal checks.
  if [ -n "${ASC_API_KEY_P8:-}" ]; then
    mkdir -p fastlane/keys
    printf '%s\n' "$ASC_API_KEY_P8" > fastlane/keys/AuthKey.p8
    env_upsert "$env_file" "CERTIFICATE_PATH" "fastlane/keys/AuthKey.p8"
  fi

  # Export for Fastlane child process (Match reads these from ENV).
  export MATCH_PASSWORD
  export MATCH_GIT_URL="${MATCH_GIT_URL:-https://github.com/SABDigitalBank/certificates.git}"
  export MATCH_GIT_BRANCH="${MATCH_GIT_BRANCH:-main}"
  export MATCH_KEYCHAIN_NAME MATCH_KEYCHAIN_PASSWORD
  export USE_MATCH=true
  if [ -n "${MATCH_GIT_BASIC_AUTHORIZATION:-}" ]; then
    export MATCH_GIT_BASIC_AUTHORIZATION
  fi
  if [ -n "${MATCH_GIT_PRIVATE_KEY:-}" ]; then
    export MATCH_GIT_PRIVATE_KEY
  fi

  security unlock-keychain -p "$KEYCHAIN_PASSWORD" "$KEYCHAIN_PATH"
  security set-keychain-settings -lut 21600 "$KEYCHAIN_PATH"
  yarn "$script"

  find build -type f -name '*.ipa' 2>/dev/null \
    | while IFS= read -r f; do
        cp -f "$f" "$ART_DIR/${VARIANT}-${channel}.ipa"
        echo "Stashed $f"
      done
  if [ -z "$(find "$ART_DIR" -type f -name '*.ipa' 2>/dev/null | head -1)" ]; then
    echo "::warning::No IPA found after iOS $VARIANT build"
  fi

  if [ -n "${KEYCHAIN_PATH:-}" ] && [ -f "${KEYCHAIN_PATH}" ]; then
    security delete-keychain "$KEYCHAIN_PATH" || true
  fi
else
  echo "Unknown platform $PLATFORM"
  exit 1
fi

echo "Artifacts in $ART_DIR:"
find "$ART_DIR" -type f | sed 's/^/  /' || true
