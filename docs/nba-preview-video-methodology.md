# NBA Preview Video Methodology

Date: 2026-05-07

This document is the reusable methodology extracted from the reference analysis. Use it before building any matchup preview so the output is not just "accurate information on screen", but a video with a clear viewer promise, editorial stance, and visual rhythm.

## 1. Four Reference Archetypes

NBA preview videos usually sit somewhere between four archetypes. A good 45-60 second video should choose one primary archetype and borrow selectively from the others.

| Archetype | Viewer Promise | Strength | Weakness If Copied Blindly | What We Should Borrow |
| --- | --- | --- | --- | --- |
| Official preview | "Here is the reliable setup." | Accurate schedule, key player, one stat, credible source. | Can feel flat and informational. | Source discipline, compact matchup facts, one key number. |
| Studio debate | "Here is the question everyone will argue about." | Immediate tension, personalities, clear stakes. | Can become loud without evidence. | Question-led cold open, either/or framing, decisive verdict. |
| Creator analysis | "Here is the real basketball reason." | Strong thesis, tactical explanation, authority. | Can become too dense for short-form. | One tactical key per screen, visual proof objects, stance. |
| Social hype | "This game feels urgent." | Fast recognition, big faces, captions, music energy. | Can become empty hype. | First-frame hook, large typography, punchy CTA, screenshotable frames. |

Default blend for this project:

- 35% studio debate
- 30% creator analysis
- 20% official preview
- 15% social hype

Reason: our data model already supports official/analysis depth; the current weakness is emotional hook and video-native packaging.

## 2. The Layer Stack

Every scene should answer one layer. If a scene tries to answer three layers, it becomes a report slide.

### Layer 1: Viewer Promise

Question: why should someone keep watching after 2 seconds?

Good forms:

- "Boston is deeper, but Philly has one way to make it messy."
- "This is not a normal 2-vs-7 matchup."
- "The first action decides whether this becomes a series."

Bad forms:

- "Eastern Conference first round preview."
- "Game 1 information."
- "Here is the playoff panorama."

### Layer 2: Editorial Thesis

Question: what is the video's opinion?

Format:

```text
[Favorite] has the structural edge, unless [underdog] can repeatedly create [specific pressure].
```

For Celtics-76ers:

```text
Boston has the structural edge, unless Philadelphia can repeatedly create first-action rotations through Maxey and George.
```

### Layer 3: Proof Stack

Question: what evidence earns the thesis?

Use at most three proof types in a 52-second video:

- Context proof: seed, venue, series status, season series.
- Player proof: star roles, recent form, availability.
- Tactical proof: first action, weak-side rotation, shot creation path.
- Source proof: official preview, injury report, team/NBA data.

Do not show all available proof. Pick the proof that supports the thesis.

### Layer 4: Visual Object

Question: what does the viewer look at?

Each proof type needs a visual object:

- Context proof -> compact score bug, matchup board, bracket strip.
- Player proof -> portrait duel, stat chip, role badge.
- Tactical proof -> key meter, arrows, court map, pressure line.
- Source proof -> lower-third chip, not a paragraph.

### Layer 5: Retention Device

Question: what makes the next 5 seconds feel necessary?

Options:

- countdown: "3 keys"
- unresolved path: "If this happens, the series changes"
- contrast: "system vs chaos"
- reveal: "the number that matters is not the seed"
- audience choice: "sweep or six games?"

### Layer 6: Production Proof

Question: does it feel produced?

Required signals:

- audio exists and is loud enough
- motion is timed to scene role
- source chips are present but not dominant
- frame can be understood on mute
- at least one frame is screenshotable

## 3. Recommended 52-Second Edit Map

This is the default timing for 16:9 previews.

| Time | Scene Role | Viewer Job | Visual Grammar | Max Reading Load |
| --- | --- | --- | --- | --- |
| 0-3s | Instant hook | Understand the conflict. | Two faces, one huge claim, score bug. | 1 headline + 1 short subline. |
| 3-7s | Thesis lock | Know the video's stance. | Same frame pushes in; source chip appears. | 1 sentence. |
| 7-17s | Matchup board | Get necessary context. | Schedule cards + bracket strip. | 4 facts, no paragraphs. |
| 17-30s | Star duel | Know who drives the conflict. | Portrait cards or split-screen duel. | 4 role labels + short stats. |
| 30-44s | Three keys | Understand why the game turns. | Meter rows / tactical board / visual keys. | 3 keys, 1 sentence each. |
| 44-52s | Verdict + CTA | Leave with a debate. | Big verdict + either/or card. | 1 verdict + 1 question. |

If the video is shorter than 35 seconds:

- Cut the matchup board to 4 seconds.
- Use only two keys.
- Keep the verdict.

If the video is longer than 75 seconds:

- Add one real tactical board scene.
- Do not add more player cards.

## 4. Screen-Level Rules

### The One-Job Rule

Each screen must be classifiable as one of:

- hook
- context
- proof
- explanation
- verdict

If a screen is both context and explanation, split it.

### The Three-Object Rule

One frame should contain no more than three primary visual objects.

Allowed examples:

- headline + two player faces
- score bug + four compact fact cards + bracket strip
- key title + meter + source chip

Rejected examples:

- four player cards with notes, sources, stats, badges, and paragraph text
- bracket plus tactical explanation plus social buzz
- closing paragraph explaining why the video exists

### The Mute-Frame Rule

At any sampled midpoint frame, a viewer with audio off should still know:

- who is playing
- what the current scene is about
- what side of the argument the video is taking

### The Source-Chip Rule

Sources should increase trust without becoming reading material.

Good:

```text
SOURCE · NBA official preview
SOURCE · injury report / series page
```

Bad:

```text
This analysis is based on NBA official playoff series pages, live play-in updates, injury report PDFs, and public social information...
```

## 5. Data Model Implications

The current `MatchupPreviewData` is useful but still fact-first. The next abstraction should add a video brief layer.

Recommended future shape:

```ts
type VideoBrief = {
  format: "preview" | "recap" | "instant-reaction" | "hype";
  audience: "casual" | "informed-fan" | "analyst";
  primaryArchetype: "official" | "studio-debate" | "creator-analysis" | "social-hype";
  thesis: string;
  counterThesis?: string;
  hook: {
    headline: string;
    subline: string;
    visualFocus: string[];
  };
  proofPoints: Array<{
    role: "context" | "player" | "tactical" | "source";
    claim: string;
    display: "score-bug" | "portrait-duel" | "meter" | "bracket" | "court-map";
    sourceLabel?: string;
  }>;
  verdict: {
    claim: string;
    ctaQuestion: string;
  };
};
```

Why this matters:

- The current data tells us what is true.
- `VideoBrief` tells us what the video is arguing.
- The renderer should build scenes from the argument, not from all available facts.

## 6. Visual Grammar Library

Use these mappings when creating scenes.

| Need | Visual Grammar | Motion | Notes |
| --- | --- | --- | --- |
| Urgency | Giant headline + score bug + portraits | Punch-in, quick lower-third reveal | Best for first 0-7 seconds. |
| Credibility | Compact fact grid + source chip | Stagger in facts | Avoid long source sentences. |
| Player stakes | Portrait duel + role badge + stat chip | Slow image drift, stat pop | Do not give every player equal narrative weight unless the story demands it. |
| Tactical explanation | Meter, arrows, court map, pressure line | Fill, sweep, pulse | One tactical idea per scene. |
| Debate | Either/or card | Card slam or reveal | Best for closing. |
| Premium feel | Borders, bugs, micro-labels, cards as objects | Small mechanical motion | Avoid generic glow as the only production signal. |

## 7. Audio Methodology

Visual quality drops sharply if audio does not prove intent.

Minimum standard:

- voiceover track present
- music track present
- final MP4 has one AAC audio stream
- mean volume is not near silence
- max volume does not clip

Better standard:

- beat change on scene transition
- riser or hit on cold open
- lower music under voiceover
- one accent hit for key-meter fills

Verification:

```bash
ffprobe -v error -show_entries stream=index,codec_type,codec_name,width,height,duration:format=duration,size -of compact out/celtics-76ers-preview.mp4
ffmpeg -i out/celtics-76ers-preview.mp4 -af volumedetect -f null -
```

## 8. Quality Rubric

Score each item from 0 to 2.

| Category | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Hook | Starts with facts. | Has a matchup title. | Starts with a sharp conflict. |
| Thesis | No opinion. | Implied angle. | Clear stance by 7 seconds. |
| Information density | Paragraph slides. | Some crowded frames. | One job per screen. |
| Visual hierarchy | Equal panels. | Some dominant elements. | One obvious focal point per scene. |
| Source use | No sources or huge citations. | Sources present but noisy. | Small trust chips. |
| Motion | Fade-only. | Staggered entrances. | Motion explains emphasis. |
| Audio | Missing/quiet. | Present but flat. | Voice/music are audible and mixed. |
| CTA | Ends passively. | Generic "watch more". | Specific debate question. |

Minimum acceptable score: 12/16.

Target score before shipping: 14/16.

## 9. Current Celtics-76ers Re-Read

The latest version is materially better than the first render because it now has:

- conflict-led cold open
- persistent score bug
- compressed matchup board
- player portraits
- three visual key meters
- verdict plus audience choice
- verified audio stream

Remaining weaknesses:

- It still uses many source chips inside the player section, which can feel busy.
- The star-duel scene still treats four players mostly equally; a stronger version would make Tatum/Maxey dominant and Brown/George supporting.
- The tactical section uses meters, but not yet a true court/action diagram.
- Font choices are constrained by HyperFrames font-cache behavior in this local environment; the visual system should eventually ship local fonts or explicit `@font-face` files.
- The single-file HyperFrames structure is stable but makes composition maintenance harder.

Next upgrade priority:

1. Build a `VideoBrief` layer so the renderer starts from thesis/hook/proof instead of raw facts.
2. Add one tactical court-map component for the key section.
3. Reduce player-card source chips to one scene-level source strip.
4. Add local font assets to avoid remote font cache permissions and regain stronger typography.

