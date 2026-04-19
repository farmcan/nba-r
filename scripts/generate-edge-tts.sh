#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: scripts/generate-edge-tts.sh <output-mp3> <text-file> [voice]"
  exit 1
fi

OUTPUT_MP3="$1"
TEXT_FILE="$2"
VOICE="${3:-zh-CN-YunyangNeural}"
VENV_DIR=".venv-edge-tts"

if [ ! -f "$TEXT_FILE" ]; then
  echo "Text file not found: $TEXT_FILE"
  exit 1
fi

if [ ! -d "$VENV_DIR" ]; then
  python3 -m venv "$VENV_DIR"
fi

. "$VENV_DIR/bin/activate"
python -m pip install edge-tts >/dev/null

TEXT_CONTENT="$(cat "$TEXT_FILE")"
edge-tts --voice "$VOICE" --text "$TEXT_CONTENT" --write-media "$OUTPUT_MP3"
echo "Generated $OUTPUT_MP3 with $VOICE"

