# nba-r

Reusable Remotion workspace for NBA matchup videos.

The repo is built around one repeatable path:

1. research current matchup context
2. store claims in typed local data
3. render through the reusable template system

The current example is `Celtics76ersPreviewExample`, backed by `src/data/matchups/celtics-sixers.ts` and rendered through `src/templates/MatchupPreviewTemplate.tsx`.

## Compositions

- `Celtics76ersPreviewExample`: data-driven playoff preview built on the generic matchup template
- `Celtics76ersSocialPreview`: short-form version of the same matchup for social distribution
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

Render the short-form social preview:

```bash
./node_modules/.bin/remotion render src/index.ts Celtics76ersSocialPreview out/celtics-76ers-social-preview.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1
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
- `docs/ai-runbook.md`
- `docs/analysis-framework.md`
- `docs/celtics-sixers-social-preview-plan.md`
- `docs/design-references.md`
- `docs/production-handbook.md`
- `docs/user-persona.md`
- `docs/nba-video-analysis.md`
