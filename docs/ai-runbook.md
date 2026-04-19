# AI Runbook

This file is the local operating manual for future AI agents working on `nba-r`.

## Goal

Turn a matchup request into a repeatable Remotion video without inventing analysis.

## Non-negotiables

- Keep all claims in local data files under `src/data`
- Keep visual logic in reusable templates under `src/templates`
- Keep team styling in `src/themes`
- Store reusable workflow notes in `docs`
- Render locally and keep final media in `out`

## Standard workflow

1. AI researches from official NBA sources and clearly marked public social context
2. Create or update a matchup data file under `src/data/matchups`
3. Localize copy if the request is Chinese
4. Generate optional TTS audio and store it in `public/audio`
5. Render through the generic composition, not through one-off scene files
6. Save process notes in `docs` when the workflow changes

The default assumption is that AI collects the information.
Do not wait for the user to manually assemble research unless the request explicitly says otherwise.

## Current reusable system

- Data model:
  - `src/types/matchup.ts`
- Team themes:
  - `src/themes/teams.ts`
- Main template:
  - `src/templates/MatchupPreviewTemplate.tsx`
- Scene modules:
  - `src/templates/matchup/*`
- Example wrapper:
  - `src/CelticsSixersPreview.tsx`

## Chinese localized preview rules

- Use `Noto Sans SC` for Chinese display and body copy
- Keep player names, matchup edges, and social summaries readable first
- Do not force English uppercase styling onto Chinese text
- If progress UI is used, each scene should have its own bar and the current indicator should be obvious

## TTS rules

- Preferred local tool: `edge-tts`
- Preferred voice right now: `zh-CN-YunyangNeural`
- Store generated files under `public/audio`
- Keep the narration script in the matchup data file
- Duck background music when voiceover exists

## Local commands

Type-check:

```bash
./node_modules/.bin/tsc --noEmit
```

Render current example:

```bash
./node_modules/.bin/remotion render src/index.ts Celtics76ersPreviewExample out/celtics-76ers-preview.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1
```

Generate TTS from a text file:

```bash
scripts/generate-edge-tts.sh public/audio/sample.mp3 docs/sample-tts.txt zh-CN-YunyangNeural
```

## When extending the repo

- Add more matchup data files instead of cloning scene code
- Add more teams to `src/themes/teams.ts`
- Add more output modes as template variants, not bespoke compositions
- Update this runbook whenever the workflow becomes more capable

## Richer content expectation

Future previews should try to pull from more than one angle.

Preferred buckets:

- playoff panorama
- player relationships
- historical matchup context
- recent form
- style identity
- tactical keys
- social temperature

Reference:

- `docs/rich-preview-framework.md`
- `docs/analysis-framework.md`

## Playoff panorama rule

If the request is for a playoff matchup, AI should try to start with a bracket-level scene.

That means collecting:

- current East and West first-round tree
- current series score or Game 1 status
- which branch contains the focus matchup
- one short headline for each conference

This should be treated as time-sensitive information and refreshed from current sources before rendering.
