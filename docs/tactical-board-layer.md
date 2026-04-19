# Tactical Board Layer

This file defines the tactical-board scene as a default reusable layer for richer NBA videos.

## Why this matters

Without a tactical layer, analysis stays generic.

It is not enough to say:

- Team A has more depth
- Team B must hit threes
- Star X needs to be aggressive

A stronger preview should explain how those outcomes are likely to happen on the floor.

## Default tactical-board questions

For playoff or high-interest matchup videos, AI should try to answer:

1. What action creates the first advantage?
2. Which defender or matchup is likely to be hunted?
3. Where does the help defender come from?
4. Which shooter or screener is being ignored on purpose?
5. What is the most important counter if the first action gets blown up?

## Tactical-board data shape

Use `tacticalBoard` in the matchup data file.

Each board item should capture:

- `title`
- `setup`
- `trigger`
- `read`
- `counter`
- optional offense/defense team mapping
- `sourceLabel`

## Example categories

- spread pick-and-roll attack
- empty-side two-man game
- post-up plus weakside split
- switch hunt
- nail help punish
- corner-tag rotation
- ghost screen or re-screen counter

## Recommended visual treatment

The tactical-board scene should feel different from the card scenes.

Preferred look:

- dark board background
- bright route lines
- labeled player spots
- arrows for first action and second read
- one short takeaway sentence

## AI research rule

AI should not invent tactics that are unsupported by the teams' known style.

Good sources include:

- official playoff previews
- official team pages
- reliable public tactical breakdowns
- direct evidence from recent game recaps or matchup notes

## Production rule

If a matchup has enough real tactical material, the tactical-board scene should replace one weaker fluff scene.

The tactical-board layer is a core editorial tool, not just decoration.

