#!/bin/sh
# Prints the CHANGELOG.md section of one version (`sh scripts/release-notes.sh 1.3.0`), without its heading.
# Prints nothing when the version has no section.
version="$1"
[ -n "$version" ] || { echo "usage: release-notes.sh <version>" >&2; exit 2; }
awk -v v="$version" '
  /^## / { if (found) exit; if ($2 == v) { found = 1; next } }
  found { print }
' "$(dirname "$0")/../CHANGELOG.md" | sed -e '/./,$!d'
