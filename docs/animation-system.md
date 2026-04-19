# Animation System

This project now uses a more modular expression layer for matchup videos.

## What changed

- `MatchupPreviewTemplate` now orchestrates scenes using `@remotion/transitions`
- Player-card entrances use `@remotion/motion-blur`
- Visual helpers live in `src/templates/matchup/shared.tsx`
- Scenes are split into focused modules:
  - `IntroHero`
  - `PlayerCardDeckScene`
  - `MatchupEdgesScene`
  - `SocialBuzzScene`
  - `ClosingScene`

## Why this is a better fit for `nba-r`

- The data model stays stable while the visual system can evolve
- New matchup videos can reuse the same scene choreography without rewriting copy-heavy files
- Transition timing is centralized, which makes pacing adjustments safer
- Scene modules are easier to replace when adding new output modes such as `social` or `vertical`

## Current design language

- Sports-broadcast pacing with hard scene transitions
- Flat player-card grids instead of one long vertical stack
- Team-colored glow edges and diagonal motion bands
- Social posts presented as a secondary texture, not as fake reporting

## Next logical extensions

- Add a second card layout variant such as `stack` vs `grid`
- Make scene selection depend on `mode`
- Add 9:16 and 1:1 compositions from the same template
- Introduce team-specific background motifs and texture assets
