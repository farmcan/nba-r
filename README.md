# nba-r

Reusable Remotion workspace for NBA videos.

This repo is set up to handle repeatable matchup-preview requests, not just one-off edits.  
The current example is a sourced `Celtics76ersPreviewExample` composition built from a reusable matchup template, local matchup data, official NBA sources, and a small public X-buzz layer.

## Compositions

- `Celtics76ersPreviewExample`: data-driven playoff preview built on the generic matchup template
- `NBAPlayoffPulse`: earlier style-study opener

## Commands

Install dependencies:

```bash
npm install
```

Start Remotion Studio:

```bash
npm run dev -- --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

Render the current matchup preview:

```bash
./node_modules/.bin/remotion render src/index.ts Celtics76ersPreviewExample out/celtics-76ers-preview.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1
```

Generate Chinese TTS locally:

```bash
scripts/generate-edge-tts.sh public/audio/celtics-sixers-zh-tts.mp3 docs/sample-tts.txt zh-CN-YunyangNeural
```

Type-check:

```bash
./node_modules/.bin/tsc --noEmit
```

## Project layout

- `src/data`: local source-of-truth for matchup facts and source links
- `src/templates`: generic render templates
- `src/themes`: reusable team-level visual definitions
- `src/CelticsSixersPreview.tsx`: thin example wrapper around the generic matchup template
- `public/assets`: logos, player images, and other local media
- `docs`: reusable workflow and sourcing notes for future requests

## Docs

- `docs/overview.md`
- `docs/design-references.md`
- `docs/matchup-template.md`
- `docs/research-and-sourcing.md`
- `docs/system-architecture.md`
- `docs/animation-system.md`
- `docs/ai-runbook.md`
- `docs/playoff-panorama.md`
- `docs/rich-preview-framework.md`
- `docs/tts-workflow.md`
