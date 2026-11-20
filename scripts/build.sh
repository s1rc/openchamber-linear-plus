#!/bin/sh
set -e
cd "$(dirname "$0")/.."
# Refresh the copy of ../shared-ui in node_modules, so a changed shared-ui is never built stale.
bun install --silent
SHARED=node_modules/@openchamber-ext/shared-ui/src/styles.css
bunx openchamber-guest-bundle src/app/main.tsx panel/main.js
bunx openchamber-guest-bundle src/dialog/main.tsx dialog/main.js
bunx openchamber-guest-bundle src/status/main.tsx status/main.js
bunx openchamber-guest-bundle src/blocks/main.tsx blocks/main.js
bunx openchamber-guest-bundle src/background/main.ts background/main.js
bunx openchamber-guest-bundle --node src/service/main.ts service/main.js
# Every frame gets the shared styles, then Linear's own.
for frame in panel dialog status blocks; do
  cat "$SHARED" src/shared/local.css > "$frame/styles.css"
done
