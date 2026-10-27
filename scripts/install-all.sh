#!/usr/bin/env bash
# First-time / refresh setup so a Storybook build can start.
# Usage:
#   yarn install:all
#   ./scripts/install-all.sh [--skip-ios] [--skip-android-check] [--skip-yarn]
#
# Installs node_modules, Bundler gems, and CocoaPods. Does not change CI,
# Fastlane lanes, or day-to-day yarn storybook / Metro workflows.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

SKIP_IOS=0
SKIP_ANDROID_CHECK=0
SKIP_YARN=0

for arg in "$@"; do
  case "$arg" in
    --skip-ios) SKIP_IOS=1 ;;
    --skip-android-check) SKIP_ANDROID_CHECK=1 ;;
    --skip-yarn) SKIP_YARN=1 ;;
    -h|--help)
      cat <<'EOF'
Usage: yarn install:all [options]
       ./scripts/install-all.sh [options]

  --skip-ios            Skip CocoaPods (non-macOS or Android-only setup)
  --skip-android-check  Skip Android SDK / JDK presence checks
  --skip-yarn           Skip yarn install (use existing node_modules)
EOF
      exit 0
      ;;
    *)
      echo "Unknown option: $arg (try --help)" >&2
      exit 1
      ;;
  esac
done

# On Linux CI / Linux laptops, CocoaPods is irrelevant.
if [[ "$(uname -s)" != "Darwin" ]]; then
  SKIP_IOS=1
fi

# GitHub Actions / CI already installs deps in workflow steps.
if [[ "${CI:-}" == "true" || "${GITHUB_ACTIONS:-}" == "true" ]]; then
  echo "info: CI detected — use workflow install steps, not yarn install:all."
  echo "      (Exiting 0 so accidental calls do not fail the pipeline.)"
  exit 0
fi

log()  { printf '→ %s\n' "$*"; }
ok()   { printf '✓ %s\n' "$*"; }
warn() { printf '! %s\n' "$*" >&2; }
die()  { printf '✗ %s\n' "$*" >&2; exit 1; }

have() { command -v "$1" >/dev/null 2>&1; }

section() {
  printf '\n==> %s\n' "$*"
}

# ---------------------------------------------------------------------------
# 1) Node + Yarn
# ---------------------------------------------------------------------------
section "Node.js & Yarn"

have node || die "Node.js is required. Install Node 18+ (https://nodejs.org or nvm), then re-run."
NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)"
if [[ "${NODE_MAJOR}" -lt 18 ]]; then
  die "Node.js 18+ required (found $(node -v)). Upgrade Node and re-run."
fi
ok "Node $(node -v)"

if ! have yarn; then
  if have corepack; then
    log "Enabling Yarn via corepack…"
    corepack enable >/dev/null 2>&1 || true
    corepack prepare yarn@1.22.22 --activate >/dev/null 2>&1 || true
  fi
fi
have yarn || die "Yarn is required. Install with: npm install -g yarn@1.22.22"
ok "Yarn $(yarn -v 2>/dev/null || echo unknown)"

if [[ "$SKIP_YARN" -eq 0 ]]; then
  log "Installing JS dependencies (yarn)…"
  if [[ -f yarn.lock ]]; then
    yarn install --frozen-lockfile || yarn install
  else
    yarn install
  fi
  ok "node_modules ready"
else
  ok "Skipping yarn install (--skip-yarn)"
fi

# ---------------------------------------------------------------------------
# 2) Ruby 3+ (Homebrew preferred on macOS — never use system Ruby 2.6)
# ---------------------------------------------------------------------------
section "Ruby 3+ (Bundler / CocoaPods / Fastlane)"

ensure_homebrew_ruby() {
  local bin_dir=""
  if have brew; then
    local prefix
    prefix="$(brew --prefix ruby 2>/dev/null || true)"
    if [[ -n "$prefix" && -x "${prefix}/bin/ruby" ]]; then
      bin_dir="${prefix}/bin"
    fi
  fi
  [[ -z "$bin_dir" && -x /opt/homebrew/opt/ruby/bin/ruby ]] && bin_dir="/opt/homebrew/opt/ruby/bin"
  [[ -z "$bin_dir" && -x /usr/local/opt/ruby/bin/ruby ]] && bin_dir="/usr/local/opt/ruby/bin"
  if [[ -n "$bin_dir" ]]; then
    export PATH="${bin_dir}:${PATH}"
    return 0
  fi
  return 1
}

ruby_major() {
  ruby -e 'print RUBY_VERSION.split(".")[0]' 2>/dev/null || echo 0
}

ensure_homebrew_ruby || true

if [[ "$(ruby_major)" -lt 3 ]]; then
  if [[ "$(uname -s)" == "Darwin" ]] && have brew; then
    log "Ruby 3+ not found (system Ruby is too old). Installing via Homebrew…"
    brew install ruby
    ensure_homebrew_ruby || true
    if have brew; then
      gem_bin="$(brew --prefix ruby 2>/dev/null)/bin"
      [[ -d "$gem_bin" ]] && export PATH="${gem_bin}:${PATH}"
    fi
  elif [[ "$(uname -s)" == "Darwin" ]]; then
    die "Ruby 3+ required. Install Homebrew (https://brew.sh) then: brew install ruby"
  else
    die "Ruby 3+ required. Install Ruby 3.x (rbenv/asdf/apt) and re-run."
  fi
fi

if [[ "$(ruby_major)" -lt 3 ]]; then
  die "Still on Ruby < 3 ($(command -v ruby) → $(ruby -v 2>/dev/null || echo unknown)). Fix PATH and re-run."
fi
ok "Ruby $(ruby -v | head -1)"

REQUIRED_BUNDLER=""
if [[ -f Gemfile.lock ]]; then
  REQUIRED_BUNDLER="$(awk '/BUNDLED WITH/{getline; gsub(/^[ \t]+|[ \t]+$/,""); print; exit}' Gemfile.lock || true)"
fi

if ! have bundle; then
  log "Installing bundler${REQUIRED_BUNDLER:+ $REQUIRED_BUNDLER}…"
  if [[ -n "$REQUIRED_BUNDLER" ]]; then
    gem install bundler -v "$REQUIRED_BUNDLER" --no-document || gem install bundler --no-document
  else
    gem install bundler --no-document
  fi
elif [[ -n "$REQUIRED_BUNDLER" ]]; then
  CURRENT_BUNDLER="$(bundle -v 2>/dev/null | awk '{print $NF}' || true)"
  if [[ "$CURRENT_BUNDLER" != "$REQUIRED_BUNDLER" ]]; then
    log "Installing bundler $REQUIRED_BUNDLER (found $CURRENT_BUNDLER)…"
    gem install bundler -v "$REQUIRED_BUNDLER" --no-document || true
  fi
fi
have bundle || die "bundler is missing after install attempt"
ok "Bundler $(bundle -v 2>/dev/null || echo ok)"

log "Installing Ruby gems into vendor/bundle…"
./scripts/run-bundle.sh install
ok "Ruby gems ready (vendor/bundle)"

# ---------------------------------------------------------------------------
# 3) iOS — CocoaPods + Node path for Xcode
# ---------------------------------------------------------------------------
if [[ "$SKIP_IOS" -eq 0 ]]; then
  section "iOS (CocoaPods)"

  if ! have xcodebuild; then
    warn "Xcode / xcodebuild not found. Install Xcode from the App Store, then re-run with iOS enabled."
    warn "Skipping pod install for now."
  else
    ok "Xcode $(xcodebuild -version 2>/dev/null | head -1 || echo present)"

    NODE_PATH="$(command -v node)"
    log "Writing ios/.xcode.env.local (NODE_BINARY)…"
    printf 'export NODE_BINARY=%s\n' "$NODE_PATH" > ios/.xcode.env.local
    ok "ios/.xcode.env.local → $NODE_PATH"

    log "Running pod install…"
    ./scripts/run-bundle.sh exec bash -c 'cd ios && exec pod install'
    ok "CocoaPods ready (ios/Pods)"
  fi
else
  section "iOS"
  ok "Skipped (--skip-ios or non-macOS)"
fi

# ---------------------------------------------------------------------------
# 4) Android — soft checks only (do not install Android Studio)
# ---------------------------------------------------------------------------
if [[ "$SKIP_ANDROID_CHECK" -eq 0 ]]; then
  section "Android (environment check)"

  if have java; then
    ok "Java $(java -version 2>&1 | head -1)"
  else
    warn "Java not found on PATH. Install JDK 17+ for Android builds."
  fi

  if [[ -n "${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}" ]]; then
    ok "Android SDK: ${ANDROID_HOME:-$ANDROID_SDK_ROOT}"
  elif [[ -d "${HOME}/Library/Android/sdk" ]]; then
    ok "Android SDK: ${HOME}/Library/Android/sdk (set ANDROID_HOME for shells)"
  elif [[ -d "${HOME}/Android/Sdk" ]]; then
    ok "Android SDK: ${HOME}/Android/Sdk (set ANDROID_HOME for shells)"
  else
    warn "Android SDK not detected. Install Android Studio and accept SDK licenses."
  fi

  if [[ -x android/gradlew ]]; then
    ok "Gradle wrapper present"
  else
    warn "android/gradlew missing — check out a full clone of the repo."
  fi
else
  section "Android"
  ok "Skipped (--skip-android-check)"
fi

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
section "Done"
cat <<'EOF'
Project dependencies are installed.

Next steps:
  yarn storybook             # Web Storybook
  yarn start                 # Metro
  yarn storybook:ios         # Storybook iOS
  yarn storybook:android     # Storybook Android

Clean native builds:
  yarn android:clean
  yarn ios:clean
  yarn clean:all
EOF
