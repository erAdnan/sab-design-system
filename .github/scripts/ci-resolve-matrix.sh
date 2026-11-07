#!/usr/bin/env bash
# Resolve which release builds to run.
# Env: EVENT_NAME, VARIANT, PLATFORM, CHANNEL, SKIP_DIST, GITHUB_WORKSPACE
#
# Writes .ci/* matrices and GITHUB_OUTPUT flags:
#   android_demo, android_storybook, ios_demo, ios_storybook, web_storybook,
#   has_android, has_ios, has_web, channel, need_storybook_generate, skip_distribution
set -euo pipefail

# Normalize UI aliases
case "${VARIANT:-all}" in
  both) VARIANT=all ;;
esac
case "${PLATFORM:-all}" in
  both|"") PLATFORM=all ;;
esac
CHANNEL="${CHANNEL:-firebase}"
SKIP_DIST="${SKIP_DIST:-false}"

MATRIX_DIR="${MATRIX_DIR:-${GITHUB_WORKSPACE:?}/.ci}"
mkdir -p "$MATRIX_DIR"

android='[]'
ios='[]'
android_demo=false
android_storybook=false
ios_demo=false
ios_storybook=false
web_storybook=false

add_android() {
  local variant="$1" channel="$2" script="$3" env_key="$4" file="$5"
  android=$(jq -c \
    --arg v "$variant" --arg c "$channel" --arg s "$script" \
    --arg k "$env_key" --arg f "$file" \
    '. + [{variant:$v, channel:$c, yarn_script:$s, env_key:$k, env_file:$f}]' \
    <<<"$android")
  case "$variant" in
    demo) android_demo=true ;;
    storybook) android_storybook=true ;;
  esac
}

add_ios() {
  local variant="$1" channel="$2" script="$3" env_key="$4" file="$5" profile_key="$6"
  ios=$(jq -c \
    --arg v "$variant" --arg c "$channel" --arg s "$script" \
    --arg k "$env_key" --arg f "$file" --arg p "$profile_key" \
    '. + [{variant:$v, channel:$c, yarn_script:$s, env_key:$k, env_file:$f, profile_key:$p}]' \
    <<<"$ios")
  case "$variant" in
    demo) ios_demo=true ;;
    storybook) ios_storybook=true ;;
  esac
}

want_variant() { [ "$VARIANT" = "all" ] || [ "$VARIANT" = "$1" ]; }
want_platform() { [ "$PLATFORM" = "all" ] || [ "$PLATFORM" = "$1" ]; }

# Web Storybook Hosting: included when platform is all/both (mapped to all) or web.
if want_platform web || [ "$PLATFORM" = "all" ]; then
  if want_variant storybook || want_variant all; then
    web_storybook=true
  fi
fi

if want_platform android; then
  if want_variant demo; then
    if [ "$CHANNEL" = "store" ]; then
      add_android demo store fastlane:demo:android:aab:store demo_prod .env.demo.prod
    else
      add_android demo firebase fastlane:demo:android:apk demo .env.demo
    fi
  fi
  if want_variant storybook; then
    if [ "$CHANNEL" = "store" ]; then
      add_android storybook store fastlane:storybook:android:aab:store storybook_prod .env.storybook.prod
    else
      add_android storybook firebase fastlane:storybook:android:apk storybook .env.storybook
    fi
  fi
fi

if want_platform ios; then
  if want_variant demo; then
    if [ "$CHANNEL" = "store" ]; then
      add_ios demo store fastlane:demo:ios:ipa:store demo_prod .env.demo.prod demo
    else
      add_ios demo firebase fastlane:demo:ios:ipa demo .env.demo demo
    fi
  fi
  if want_variant storybook; then
    if [ "$CHANNEL" = "store" ]; then
      add_ios storybook store fastlane:storybook:ios:ipa:store storybook_prod .env.storybook.prod storybook
    else
      add_ios storybook firebase fastlane:storybook:ios:ipa storybook .env.storybook storybook
    fi
  fi
fi

printf '%s\n' "$android" > "$MATRIX_DIR/android-matrix.json"
printf '%s\n' "$ios" > "$MATRIX_DIR/ios-matrix.json"
printf '%s\n' "$CHANNEL" > "$MATRIX_DIR/channel"
if [ "$SKIP_DIST" = "true" ]; then
  echo "true" > "$MATRIX_DIR/skip_distribution"
else
  echo "false" > "$MATRIX_DIR/skip_distribution"
fi

# Best-effort mirror for local debugging — must not fail the job.
SHARED="${HOME}/actions-runner/shared"
if mkdir -p "$SHARED" 2>/dev/null; then
  cp "$MATRIX_DIR/android-matrix.json" "$SHARED/android-matrix.json" 2>/dev/null || true
  cp "$MATRIX_DIR/ios-matrix.json" "$SHARED/ios-matrix.json" 2>/dev/null || true
  cp "$MATRIX_DIR/channel" "$SHARED/channel" 2>/dev/null || true
  cp "$MATRIX_DIR/skip_distribution" "$SHARED/skip_distribution" 2>/dev/null || true
fi

has_android=false
has_ios=false
has_web=false
need_sb=false
if [ "$android_demo" = true ] || [ "$android_storybook" = true ]; then has_android=true; fi
if [ "$ios_demo" = true ] || [ "$ios_storybook" = true ]; then has_ios=true; fi
if [ "$web_storybook" = true ]; then has_web=true; fi
if [ "$android_storybook" = true ] || [ "$ios_storybook" = true ]; then need_sb=true; fi

{
  echo "android_demo=$android_demo"
  echo "android_storybook=$android_storybook"
  echo "ios_demo=$ios_demo"
  echo "ios_storybook=$ios_storybook"
  echo "web_storybook=$web_storybook"
  echo "has_android=$has_android"
  echo "has_ios=$has_ios"
  echo "has_web=$has_web"
  echo "channel=$CHANNEL"
  echo "need_storybook_generate=$need_sb"
  if [ "$SKIP_DIST" = "true" ]; then
    echo "skip_distribution=true"
  else
    echo "skip_distribution=false"
  fi
} >> "${GITHUB_OUTPUT:?GITHUB_OUTPUT is required}"

echo "Matrix resolved:"
echo "  PLATFORM=$PLATFORM VARIANT=$VARIANT CHANNEL=$CHANNEL"
echo "  android_demo=$android_demo android_storybook=$android_storybook"
echo "  ios_demo=$ios_demo ios_storybook=$ios_storybook"
echo "  web_storybook=$web_storybook"
