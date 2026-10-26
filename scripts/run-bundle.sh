#!/usr/bin/env bash
# Run Bundler with Ruby 3+ (Homebrew), never macOS system Ruby 2.6.
# Gems always install into ./vendor/bundle (see .bundle/config) so local + CI share one path.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

prepend_ruby_bin() {
  local bin_dir="$1"
  if [[ -x "${bin_dir}/ruby" && -x "${bin_dir}/bundle" ]]; then
    export PATH="${bin_dir}:${PATH}"
    return 0
  fi
  return 1
}

if command -v brew >/dev/null 2>&1; then
  brew_prefix="$(brew --prefix ruby 2>/dev/null || true)"
  if [[ -n "${brew_prefix}" ]]; then
    prepend_ruby_bin "${brew_prefix}/bin" || true
  fi
fi

# Fallbacks when brew isn't on PATH in the current shell.
prepend_ruby_bin "/opt/homebrew/opt/ruby/bin" || true
prepend_ruby_bin "/usr/local/opt/ruby/bin" || true

ruby_major="$(ruby -e 'print RUBY_VERSION.split(".")[0]' 2>/dev/null || echo 0)"
if [[ "${ruby_major}" -lt 3 ]]; then
  echo "error: Fastlane needs Ruby 3+ (found: $(command -v ruby) → $(ruby -v 2>/dev/null || echo unknown))." >&2
  echo "Install Homebrew Ruby:  brew install ruby" >&2
  echo "Then run:  yarn bundle:install" >&2
  exit 1
fi

# Ignore any inherited BUNDLE_PATH (e.g. ephemeral CI/agent caches) so
# .bundle/config → vendor/bundle is always used.
unset BUNDLE_PATH BUNDLE_APP_CONFIG || true
export BUNDLE_GEMFILE="${ROOT}/Gemfile"

ensure_gems() {
  if ! bundle check >/dev/null 2>&1; then
    echo "Installing Ruby gems into vendor/bundle (one-time / after Gemfile changes)…"
    bundle install
  fi
}

# `bundle exec …` and bare `bundle` (install/check) both need gems for exec.
if [[ "${1:-}" == "exec" ]]; then
  ensure_gems
elif [[ "${1:-}" == "install" ]] || [[ "${1:-}" == "update" ]]; then
  :
else
  # Other commands: still prefer a valid install when possible.
  ensure_gems || true
fi

exec bundle "$@"
