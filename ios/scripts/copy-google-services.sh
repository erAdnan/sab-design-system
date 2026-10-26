#!/usr/bin/env bash
# Copy the Firebase GoogleService-Info.plist that matches this build variant.
# Demo  → ios/Firebase/GoogleService-Info-demoapp.plist  (com.sabdesignsystem.demoapp)
# Storybook → ios/Firebase/GoogleService-Info-sb.plist   (com.sabdesignsystem.sb)
set -euo pipefail

SRC_DIR="${PROJECT_DIR}/Firebase"
DEST="${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/GoogleService-Info.plist"

case "${CONFIGURATION}" in
  *SB*)
    SRC="${SRC_DIR}/GoogleService-Info-sb.plist"
    VARIANT="Storybook (com.sabdesignsystem.sb)"
    ;;
  *)
    SRC="${SRC_DIR}/GoogleService-Info-demoapp.plist"
    VARIANT="Demo (com.sabdesignsystem.demoapp)"
    ;;
esac

if [[ ! -f "${SRC}" ]]; then
  echo "error: Missing Firebase iOS config for ${VARIANT}." >&2
  echo "error: Expected file: ${SRC}" >&2
  echo "error: Download GoogleService-Info.plist from Firebase Console for that bundle ID and place it at the path above." >&2
  exit 1
fi

BUNDLE_ID="$(/usr/libexec/PlistBuddy -c 'Print :BUNDLE_ID' "${SRC}" 2>/dev/null || true)"
EXPECTED_ID="${PRODUCT_BUNDLE_IDENTIFIER}"
if [[ -n "${BUNDLE_ID}" && -n "${EXPECTED_ID}" && "${BUNDLE_ID}" != "${EXPECTED_ID}" ]]; then
  echo "error: Firebase plist BUNDLE_ID (${BUNDLE_ID}) does not match PRODUCT_BUNDLE_IDENTIFIER (${EXPECTED_ID})." >&2
  exit 1
fi

mkdir -p "$(dirname "${DEST}")"
cp "${SRC}" "${DEST}"
echo "Firebase: copied $(basename "${SRC}") → GoogleService-Info.plist for ${VARIANT}"
