# nba-r

Reusable Remotion workspace for NBA videos.

This repo is set up to handle repeatable matchup-preview requests, not just one-off edits.  
The current example is a sourced `Celtics76ersPreview` composition built from local matchup data, official NBA sources, and a small public X-buzz layer.

## Compositions

- `Celtics76ersPreview`: data-driven playoff preview with animated player cards and matchup edges
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
./node_modules/.bin/remotion render src/index.ts Celtics76ersPreview out/celtics-76ers-preview.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1
```

Type-check:

```bash
./node_modules/.bin/tsc --noEmit
```

## Project layout

- `src/data`: local source-of-truth for matchup facts and source links
- `src/CelticsSixersPreview.tsx`: reusable scene system for preview videos
- `public/assets`: logos, player images, and other local media
- `docs`: reusable workflow and sourcing notes for future requests

## Docs

- `docs/overview.md`
- `docs/design-references.md`
- `docs/matchup-template.md`
- `docs/research-and-sourcing.md`
- `docs/system-architecture.md`
