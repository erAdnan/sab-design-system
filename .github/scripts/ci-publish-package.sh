#!/usr/bin/env bash
# Verify the package compiles, write release notes, tag, and publish to npm.
# Does not build the iOS or Android apps. Caller must be at the repo root.
set -euo pipefail

if [ -z "${NODE_AUTH_TOKEN:-}" ]; then
  echo "::error::Add the NPM_TOKEN secret. Do not commit it."
  exit 1
fi
if [ -z "${GH_TOKEN:-}${GITHUB_TOKEN:-}" ]; then
  echo "::error::GitHub token is required to create the Release."
  exit 1
fi
export GH_TOKEN="${GH_TOKEN:-$GITHUB_TOKEN}"

yarn install --frozen-lockfile
yarn build
node scripts/write-release-notes.js

VERSION="$(node -p "require('./package.json').version")"
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "github-actions[bot]"
git add package.json CHANGELOG.md README.md
git add android/app/build.gradle ios/SabDesignSystem.xcodeproj/project.pbxproj ios/SabDesignSystem/Info.plist || true
git status --short
if git diff --cached --quiet; then
  echo "::error::Nothing to commit for v${VERSION}."
  exit 1
fi
git commit -m "chore: release v${VERSION}"

TAG="v${VERSION}"
if git rev-parse -q --verify "refs/tags/${TAG}" >/dev/null; then
  existing="$(git rev-parse "${TAG}^{commit}")"
  head="$(git rev-parse HEAD)"
  if [ "$existing" != "$head" ]; then
    echo "::error::${TAG} already points at ${existing}."
    exit 1
  fi
else
  git tag "$TAG"
fi

git push origin HEAD:main
git push origin "$TAG"

if gh release view "$TAG" >/dev/null 2>&1; then
  gh release edit "$TAG" --title "$TAG" --notes-file .ci/release-notes.md
else
  gh release create "$TAG" --title "$TAG" --notes-file .ci/release-notes.md
fi

npm publish --access restricted
echo "Published @sab-digital-bank/design-system@${VERSION}"
