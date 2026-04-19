# Rich Preview Framework

This file defines the reusable content framework for deeper NBA preview videos.

The point is not to make every video longer.  
The point is to make every future request richer by default, with a stable set of research buckets that AI can fill.

## Core rule

AI should collect the information.

The user should not need to manually provide:

- story angles
- recent form notes
- head-to-head background
- style or tactical cues
- social context

The repo should assume AI is responsible for gathering, localizing, and structuring those inputs into local data files.

## Reusable research buckets

For a matchup preview, AI should try to collect from these buckets:

1. Game context
- seed, standings, date, venue, route into the matchup

2. Player relationships
- former teammates
- coach-player history
- star-vs-star narrative tension
- injury-return dynamics

3. Historical matchup context
- season series
- recent playoff history
- notable prior elimination or comeback context

4. Recent form
- last 5 to 10 games
- recent scoring bursts
- lineup stability
- availability shifts

5. Style identity
- transition vs halfcourt
- spacing and shot profile
- switching, drop, zone, or pressure tendencies
- rebounding / turnover profile

6. Tactical keys
- who initiates the first advantage
- where help defense is likely to come from
- which matchups can be hunted
- what action may decide the game

6a. Tactical board
- one or more specific actions drawn as a board scene
- first read and second counter
- not just abstract tactical language

7. Social temperature
- official NBA posts
- team-side public posts
- player milestone chatter
- public conversation that adds mood but not fake facts

8. Playoff panorama
- current playoff bracket
- current series score
- where this matchup sits in the larger tree
- what already happened elsewhere in the field

## Data-model mapping

The current matchup data model now supports optional richer buckets:

- `narrativeThreads`
- `headToHead`
- `recentForm`
- `styleProfiles`
- `tacticalKeys`
- `tacticalBoard`
- `playoffPanorama`

Those fields should be treated as structured research memory.  
Templates can render some or all of them depending on video length.

## Recommended prompt contract for future AI

When a future AI agent receives a matchup request, it should behave as if the user asked for:

1. collect real matchup information from reliable sources
2. organize it into the local typed data model
3. choose the strongest 3 to 6 angles
4. localize copy to the requested language
5. render through the reusable Remotion template system

## Visual implications

Because the content can now be thicker, future template variants should support:

- playoff bracket opener
- relationship cards
- history timeline blocks
- recent-form strips
- style comparison split screens
- tactical chalkboard scenes

This lets the repo scale from a light preview to a deeper editorial package without rewriting the research workflow.

For the actual editorial standard, also follow:

- `docs/analysis-framework.md`
