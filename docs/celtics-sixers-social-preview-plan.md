# Celtics Sixers Social Preview Implementation Plan

**Goal:** Consolidate the Celtics vs 76ers preview into a single short-form composition so future work has one clear entry point.

**Architecture:** Keep the current long-form matchup preview intact and introduce a parallel social-mode template that reuses the same matchup data and team themes. Build the social cut by composing a focused subset of scenes with shorter timings and a new composition entry, so future matchups can choose between long-form analysis and short-form distribution without branching the data model.

**Tech Stack:** Remotion, React, TypeScript, existing matchup data/theme system, local CLI rendering via `remotion`

## Files

- Create: `docs/celtics-sixers-social-preview-plan.md`
- Create: `src/templates/MatchupSocialPreviewTemplate.tsx`
- Modify: `src/Root.tsx`
- Modify: `src/CelticsSixersPreview.tsx`
- Modify: `README.md`

## Implementation Tasks

### 1. Add the social-mode template

- Create `src/templates/MatchupSocialPreviewTemplate.tsx`
- Reuse `data`, `homeTheme`, and `awayTheme`
- Keep the same audio bed and transition system as the existing package
- Only sequence the strongest short-form scenes

Scene timings:

- `PlayoffPanoramaScene`: 120 frames
- `IntroHero`: 140 frames
- `PlayerCardDeckScene`: 170 frames
- `MatchupEdgesScene`: 150 frames
- `ClosingScene`: 100 frames

Target total: `650` frames at `30fps`, matching the effective `TransitionSeries` runtime after transition overlap

### 2. Point the existing Celtics vs 76ers wrapper at the unified template

- Modify `src/CelticsSixersPreview.tsx`
- Reuse `celticsSixersPreview`
- Reuse `getTeamTheme(...)`

### 3. Register the new composition

- Update `src/Root.tsx`
- Keep only `Celtics76ersPreviewExample` for this matchup
- Keep `NBAPlayoffPulse` unchanged

### 4. Document the new output path

- Update `README.md`
- Keep only one composition entry and one render command for the matchup

## Verification

Run:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/remotion still src/index.ts Celtics76ersPreviewExample /tmp/celtics-preview.png --frame=30 --scale=0.25
./node_modules/.bin/remotion render src/index.ts Celtics76ersPreviewExample out/celtics-76ers-preview.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1:nokey=0 out/celtics-76ers-preview.mp4
```

Expected:

- TypeScript exits `0`
- Still render succeeds
- MP4 render succeeds
- Duration lands around `21-22s`

## Review Focus

- No accidental edits to the long-form template
- New composition is registered correctly
- New template imports compile cleanly
- README render instructions match the actual composition ID
