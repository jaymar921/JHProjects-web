#!/usr/bin/env bash
#
# Rasterises the Kumandra's Economy Open Graph card.
#
# The card itself is drawn by generate-kumandra-art.mjs, which writes
# scripts/og-kumandra.svg. Link preview crawlers do not render SVG, so it has
# to be a PNG at exactly 1200x630 for the og:image tags in
# kumandras-economy.html to work.
#
# Needs ImageMagick on PATH.
#
#   node scripts/generate-kumandra-art.mjs && bash scripts/generate-og.sh
#
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
src="$here/og-kumandra.svg"
out="$here/../public/og/kumandras-economy.png"

if [ ! -f "$src" ]; then
  echo "missing $src - run: node scripts/generate-kumandra-art.mjs" >&2
  exit 1
fi

mkdir -p "$(dirname "$out")"
magick -background none "$src" -resize 1200x630 "$out"
magick identify "$out"
