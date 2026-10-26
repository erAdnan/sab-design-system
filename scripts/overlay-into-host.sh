#!/usr/bin/env bash
# Copy this package onto the demo app's design-system folder, then the demo
# app's existing Storybook fastlane lanes build the device app.
set -euo pipefail

PACKAGE_DIR="${1:?package directory}"
HOST_DIR="${2:?demo app checkout}"

if [ ! -f "$HOST_DIR/package.json" ] || [ ! -d "$HOST_DIR/android" ]; then
  echo "::error::Host checkout at $HOST_DIR is not the demo app"
  exit 1
fi

mkdir -p "$HOST_DIR/design-system"
rsync -a --delete \
  --exclude '.git' \
  --exclude '.github' \
  --exclude 'node_modules' \
  --exclude '.npmrc' \
  "$PACKAGE_DIR/" "$HOST_DIR/design-system/"

echo "Overlaid $PACKAGE_DIR onto $HOST_DIR/design-system"
