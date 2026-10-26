#!/usr/bin/env bash
# Write ENVFILE from an env_key. Args: ENV_KEY ENV_FILE SKIP_DISTRIBUTION
# Secrets must already be exported: ENV_DEMO, ENV_DEMO_PROD, ENV_STORYBOOK, ENV_STORYBOOK_PROD
set -euo pipefail

ENV_KEY="${1:?env key}"
ENV_FILE="${2:?env file}"
SKIP_DISTRIBUTION="${3:-false}"

case "$ENV_KEY" in
  demo) CONTENTS="${ENV_DEMO:-}" ;;
  demo_prod) CONTENTS="${ENV_DEMO_PROD:-}" ;;
  storybook) CONTENTS="${ENV_STORYBOOK:-}" ;;
  storybook_prod) CONTENTS="${ENV_STORYBOOK_PROD:-}" ;;
  *) echo "Unknown env key $ENV_KEY"; exit 1 ;;
esac
if [ -z "$CONTENTS" ]; then
  echo "Missing secret for env key $ENV_KEY"
  exit 1
fi
printf '%s\n' "$CONTENTS" > "$ENV_FILE"
grep -v '^SKIP_DISTRIBUTION=' "$ENV_FILE" > "${ENV_FILE}.tmp" || true
mv "${ENV_FILE}.tmp" "$ENV_FILE"
echo "SKIP_DISTRIBUTION=${SKIP_DISTRIBUTION}" >> "$ENV_FILE"
