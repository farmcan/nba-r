# nba-r

`nba-r` is a reusable Remotion workspace for NBA videos.

The current repo includes:

- a generic hype opener: `NBAPlayoffPulse`
- a sourced matchup template: `Celtics76ersPreview`
- local assets, local matchup data, and render output workflow

The important design choice is that matchup claims live in local data modules, not inside scene code.  
That keeps future requests repeatable: swap data, update assets, keep the animation system.

## Current reusable pieces

- `src/data/*`: matchup-specific facts, angles, social context, and source links
- `src/CelticsSixersPreview.tsx`: reusable preview scene system
- `public/assets/players`: player headshots for card layouts
- `public/assets/logos`: team logos for brand blocks and intros
- `public/audio`: reusable bed tracks

## Core rule

Do not invent matchup analysis.

Every preview should be backed by one or more of:

- official NBA preview articles
- official NBA game notes
- official NBA injury reports
- official NBA player or team pages
- recent public X posts, clearly treated as social context rather than ground truth
