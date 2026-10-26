#!/usr/bin/env bash
# Enter the prepare job's shared workspace on this self-hosted runner.
set -euo pipefail

WS="${1:-${SHARED_WORKSPACE:-}}"
if [ -z "$WS" ] || [ ! -d "$WS" ]; then
  WS="$(cat "$HOME/actions-runner/shared/last-workspace" 2>/dev/null || true)"
fi
if [ -z "$WS" ] || [ ! -f "$WS/package.json" ]; then
  echo "::error::Shared workspace missing. prepare must run on the same runner."
  exit 1
fi

# If checkout recreated the tree, node_modules may be gone — reinstall once.
if [ ! -d "$WS/node_modules" ]; then
  echo "::warning::node_modules missing — running yarn install"
  (
    cd "$WS"
    export PATH="/opt/homebrew/opt/ruby/bin:/opt/homebrew/bin:${PATH}"
    yarn install --frozen-lockfile
  )
fi

echo "SHARED_WORKSPACE=$WS" >> "$GITHUB_ENV"
echo "Using shared workspace: $WS"

# shellcheck disable=SC1090
[ -f "$HOME/actions-runner/shared/tool-env.sh" ] && source "$HOME/actions-runner/shared/tool-env.sh"
[ -f "$HOME/actions-runner/shared/xcode.env" ] && source "$HOME/actions-runner/shared/xcode.env"

{
  echo "PATH=/opt/homebrew/opt/ruby/bin:/opt/homebrew/bin:${PATH}"
  [ -n "${JAVA_HOME:-}" ] && echo "JAVA_HOME=$JAVA_HOME"
  [ -n "${ANDROID_HOME:-}" ] && echo "ANDROID_HOME=$ANDROID_HOME"
  [ -n "${ANDROID_SDK_ROOT:-}" ] && echo "ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT"
  [ -n "${DEVELOPER_DIR:-}" ] && echo "DEVELOPER_DIR=$DEVELOPER_DIR"
} >> "$GITHUB_ENV"
