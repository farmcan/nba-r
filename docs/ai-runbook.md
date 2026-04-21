# AI Runbook

This is the operating manual for turning a matchup request into a repeatable `nba-r` render.

## Goal

Turn a matchup request into a renderable video package without inventing claims or forking one-off scene code.

## Non-negotiables

- Keep all claims in local data files under `src/data/matchups`
- Keep visual logic in reusable templates under `src/templates`
- Keep team styling in `src/themes`
- Render locally and keep final media in `out`
- Treat social buzz as context, not ground truth

## Standard workflow

1. Research from official NBA sources first, then add clearly marked public social context
2. Create or update a matchup data file under `src/data/matchups`
3. Map the research into the typed fields in `src/types/matchup.ts`
4. Localize copy if the request is Chinese
5. Generate optional TTS audio and store it in `public/audio`
6. Render through the generic composition, not through one-off scene files
7. Update docs only when the reusable workflow changes

The default assumption is that AI collects the information.
Do not wait for the user to manually assemble research unless the request explicitly says otherwise.

## Preferred source order

1. `nba.com` official previews, recaps, roster pages, player pages, and playoff series pages
2. Official NBA injury report PDFs
3. Team game notes PDFs
4. Public X posts for buzz, narrative temperature, and recency color

## Source handling rules

- Do not use X alone for injuries, lineup certainty, schedule details, standings, or seeding
- Keep short source labels on cards and scene notes
- Keep raw source links in the matchup data file for auditability
- Refresh time-sensitive playoff data before each render

## Current reusable system

- Typed contract: `src/types/matchup.ts`
- Matchup data: `src/data/matchups/*`
- Team themes: `src/themes/teams.ts`
- Main template: `src/templates/MatchupPreviewTemplate.tsx`
- Scene modules: `src/templates/matchup/*`
- Example wrapper: `src/CelticsSixersPreview.tsx`

## Data expectations

At minimum, each matchup package should keep:

- `schedule`
- `teams`
- `pulse`
- `playerCards`
- `matchupEdges`
- `sources`
- `closingNote`

Use the richer optional fields when the material is real and worth rendering:

- `narrativeThreads`
- `headToHead`
- `recentForm`
- `styleProfiles`
- `tacticalKeys`
- `tacticalBoard`
- `playoffPanorama`
- `voiceover`

## Chinese localization rules

- Use `Noto Sans SC` for Chinese display and body copy
- Keep player names, matchup edges, and social summaries readable first
- Do not force English uppercase styling onto Chinese text
- Prefer short, spoken sentences over dense translationese

## TTS workflow

- Preferred tool: `edge-tts`
- Preferred voice: `zh-CN-YunyangNeural`
- Output folder: `public/audio`
- Keep the narration script in the matchup data file
- Duck background music when voiceover exists

Recommended structure:

```ts
voiceover?: {
  script: string;
  audioSrc: string;
  voice: string;
}
```

Recommended narration style:

- one thesis per sentence
- no invented details
- mention injuries only when they materially affect the matchup
- make total runtime match the actual audio duration

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

## Extension rules

- Add more matchup data files instead of cloning scene code
- Add more teams to `src/themes/teams.ts`
- Add template variants only when the mode is truly reusable
- Fold stable workflow changes back into this file instead of creating a new process note

## Editorial handoff

For what the preview should actually say, follow `analysis-framework.md`.

That file defines:

- the minimum quality bar
- the required analysis buckets
- playoff panorama expectations
- tactical-board expectations
