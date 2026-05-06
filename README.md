# nba-r

HyperFrames workspace for NBA matchup videos.

The repo is built around one repeatable path:

1. research current matchup context
2. store claims in typed local data
3. render through the reusable template system

The current example is the Celtics vs 76ers preview, backed by `src/data/matchups/celtics-sixers.ts` and emitted as a HyperFrames composition through `scripts/build-hyperframes.ts`.

## Composition

- `main`: the active HyperFrames composition generated into `index.html`

## Commands

Install dependencies:

```bash
npm install
```

Build the composition HTML:

```bash
npm run build
```

Validate media assets:

```bash
npm run check:assets
```

Preview in HyperFrames Studio:

```bash
npm run preview
```

Render the current matchup preview:

```bash
npm run render
```

The render step writes `out/celtics-76ers-preview.raw.mp4` first, then normalizes audio loudness into `out/celtics-76ers-preview.mp4`.

Generate Chinese TTS locally:

```bash
scripts/generate-edge-tts.sh public/audio/celtics-sixers-zh-tts.mp3 docs/sample-tts.txt zh-CN-YunyangNeural
```

Type-check:

```bash
npm run lint
```

## Project layout

- `src/data`: local source-of-truth for matchup facts and source links
- `src/templates`: generic render templates
- `src/themes`: reusable team-level visual definitions
- `scripts/build-hyperframes.ts`: generates the active HyperFrames `index.html`
- `scripts/check-assets.ts`: fails fast when raster assets are actually HTML or otherwise malformed
- `index.html`: generated composition entrypoint for preview/render
- `tools`: standalone review utilities for workflow and segmented media inspection
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
- `docs/web-tools-plan.md`
- `docs/web-tools-logic.md`

## Review tools

- `tools/index.html`: landing page for local review tools
- `tools/dag/index.html`: infinite-canvas workflow DAG for request -> render -> review -> publish
- `tools/segment-preview/index.html`: segmented video/audio review page for the unified preview output
