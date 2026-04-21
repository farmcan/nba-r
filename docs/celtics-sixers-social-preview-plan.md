# Celtics Sixers Social Preview Implementation Plan

**Goal:** Add a short-form Celtics vs 76ers social preview composition that reuses the existing matchup data while tightening pacing, reducing scene count, and producing a renderable output suited for short-form sports video.

**Architecture:** Keep the current long-form matchup preview intact and introduce a parallel social-mode template that reuses the same matchup data and team themes. Build the social cut by composing a focused subset of scenes with shorter timings and a new composition entry, so future matchups can choose between long-form analysis and short-form distribution without branching the data model.

**Tech Stack:** Remotion, React, TypeScript, existing matchup data/theme system, local CLI rendering via `remotion`

## Files

- Create: `docs/celtics-sixers-social-preview-plan.md`
- Create: `src/CelticsSixersSocialPreview.tsx`
- Create: `src/templates/MatchupSocialPreviewTemplate.tsx`
- Modify: `src/Root.tsx`
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

Target total: `680` frames at `30fps`

### 2. Add a Celtics vs 76ers social wrapper

- Create `src/CelticsSixersSocialPreview.tsx`
- Reuse `celticsSixersPreview`
- Reuse `getTeamTheme(...)`

### 3. Register the new composition

- Update `src/Root.tsx`
- Add `Celtics76ersSocialPreview`
- Keep the existing long-form and `NBAPlayoffPulse` compositions unchanged

### 4. Document the new output path

- Update `README.md`
- List the social composition
- Add the render command for `Celtics76ersSocialPreview`

## Verification

Run:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/remotion still src/index.ts Celtics76ersSocialPreview /tmp/celtics-social-preview.png --frame=30 --scale=0.25
./node_modules/.bin/remotion render src/index.ts Celtics76ersSocialPreview out/celtics-76ers-social-preview.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1:nokey=0 out/celtics-76ers-social-preview.mp4
```

Expected:

- TypeScript exits `0`
- Still render succeeds
- MP4 render succeeds
- Duration lands around `22-23s`

## Review Focus

- No accidental edits to the long-form template
- New composition is registered correctly
- New template imports compile cleanly
- README render instructions match the actual composition ID
