# Analysis Framework

This file defines what a "substantive" NBA matchup preview should contain.

The goal is to stop future previews from being thin, generic, or nutritionally empty.

## Standard

A useful preview should answer more than:

- who plays whom
- what seed each team is
- one or two recent stats

It should explain why the matchup matters, what makes it unstable, and where the game can actually swing.

## Required analysis buckets

Future AI-generated matchup previews should try to cover these buckets.

### 1. Team state

What condition is each team entering the game or series in?

Questions:

- Are they trending up or down?
- Is the rotation stable?
- Are they healthy enough to play their preferred style?
- Are they entering from rest, from the Play-In, or from a tough recent stretch?

Output style:

- one "where this team is right now" summary per side

### 2. Star matchup

Who are the top two or three players that define this game?

Questions:

- Who creates the first advantage?
- Who can force help?
- Which star is carrying a larger creation burden?
- Who is the cleaner late-clock answer?

Output style:

- one direct star-vs-star idea
- one support-creator or secondary-creator idea

### 3. Storyline and human drama

What makes the matchup emotionally interesting?

Questions:

- Former teammates or previous playoff history?
- A redemption spot?
- A return from injury?
- Legacy pressure?
- A coach or player with something to prove?

Output style:

- 1 to 3 narrative threads

### 4. Historical context

Where does this matchup sit in longer memory?

Questions:

- What happened in the season series?
- Have these teams or stars met in the playoffs before?
- Did one side previously expose a weakness the other side still has?

Output style:

- one concise "history says..." block

### 5. Recent performance

What do the last few games actually suggest?

Questions:

- Who is hot?
- Who is carrying too much usage?
- Who has recently solved or failed against similar defenses?
- Did the latest results come against strong or weak opponents?

Output style:

- 2 to 4 recent-form notes that explain momentum, not just count stats

### 6. Style clash

What basketball identities are colliding?

Questions:

- Transition vs. halfcourt?
- Spread pick-and-roll vs. switch-heavy defense?
- Rim pressure vs. help-and-recover discipline?
- Offensive rebounding vs. transition defense tradeoff?

Output style:

- one short style identity per team
- one sentence on why those styles fit or fight

### 7. Tactical keys

What will coaches and stars actually attack?

Questions:

- Which matchup gets hunted?
- Where does the low man come from?
- Which shooter gets left?
- What action creates the cleanest paint touch?
- Can either side force cross-matches?

Output style:

- 2 to 4 tactical keys

Whenever possible, turn at least one of those keys into a real tactical-board explanation.

### 8. Variance levers

What could flip the expected script?

Questions:

- Foul pressure?
- Three-point variance?
- Bench creation?
- Injury-limited star minutes?
- Rebounding swing?

Output style:

- one "if this happens, the game changes" section

### 9. Playoff panorama

Why does this game matter in the larger bracket?

Questions:

- Where is the series in the bracket?
- What is the current series score?
- What already happened elsewhere in the conference?
- Does this side of the bracket open up based on other results?

Output style:

- one high-level bracket context block before the matchup preview

## Minimum quality bar

A preview should not ship if it only contains:

- schedule info
- player cards
- one generic edge like "Team A has more depth"

At minimum, it should include:

- one team-state insight
- one star-matchup insight
- one tactical or style-clash insight
- one real storyline
- one playoff-panorama context block if it is a playoff video

## Preferred data-model mapping

These buckets should map into local typed fields:

- `pulse`
- `playerCards`
- `matchupEdges`
- `narrativeThreads`
- `headToHead`
- `recentForm`
- `styleProfiles`
- `tacticalKeys`
- `tacticalBoard`
- `playoffPanorama`

## Editorial principle

Good preview writing is not just "more facts".

It is:

- facts organized into tension
- stats translated into basketball meaning
- stories tied back to how the game may actually be played
