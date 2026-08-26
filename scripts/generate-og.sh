#!/usr/bin/env bash
#
# Rasterises every Open Graph card.
#
# The cards are drawn as SVG by two node scripts: generate-kumandra-art.mjs
# writes og-kumandra.svg, and generate-og-cards.mjs writes the site card and
# the two archived plugin cards. Link preview crawlers do not render SVG, so
# each one has to be a PNG at exactly 1200x630 for the og:image tags in the
# entry HTML files to work.
#
# Needs ImageMagick on PATH.
#
#   node scripts/generate-kumandra-art.mjs
#   node scripts/generate-og-cards.mjs
#   bash scripts/generate-og.sh
#
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
out_dir="$here/../public/og"

# svg basename -> png basename
cards=(
  "og-kumandra:kumandras-economy"
  "og-jhprojects:jhprojects"
  "og-custom-warps:custom-warps"
  "og-fishing-contest:fishing-contest"
)

mkdir -p "$out_dir"

for card in "${cards[@]}"; do
  src="$here/${card%%:*}.svg"
  out="$out_dir/${card##*:}.png"

  if [ ! -f "$src" ]; then
    echo "missing $src - run the generator scripts first" >&2
    exit 1
  fi

  magick -background none "$src" -resize 1200x630 "$out"
  magick identify "$out"
done
