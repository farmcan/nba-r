# Matchup Template

Use this structure for future NBA matchup videos.

## 1. Research

Collect and localize:

- series or game date
- seed / standings context
- recent result that sets the matchup
- availability or injury watch
- 2-4 player storylines
- 2-3 recent public X talking points

Store the result in a local data file like:

- `src/data/lakersWarriorsPreview.ts`
- `src/data/knicksBucksPreview.ts`

## 2. Scene order

Recommended order for a 20-30 second preview:

1. intro with matchup, date, seed line
2. player-card stack with staggered animation
3. matchup edges / what swings the game
4. X buzz / media heat
5. close card with schedule and thesis

## 3. Card model

Each player card should have:

- name
- team
- image
- badge
- one stat line
- one sourced note
- source label

This keeps cards readable and reusable.

## 4. Reuse policy

Keep these stable:

- composition size: `1920x1080`
- pacing: `30fps`
- audio bed abstraction
- grid overlay
- staggered enter animation
- team-color-driven accents

Swap these per matchup:

- data file
- player images
- logos
- background treatment
- closing thesis
