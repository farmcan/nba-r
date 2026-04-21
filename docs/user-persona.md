# User Persona

This document defines the primary audience for `nba-r` and turns that audience into concrete product constraints for future video work.

## Product Context

`nba-r` is not a generic motion graphics sandbox. It is a reusable NBA matchup video system aimed at fast, repeatable production of Chinese-language playoff previews and related short-form content.

That means the "user" is best understood in two layers:

- the end viewer who watches the finished video
- the internal operator who needs to produce these videos repeatedly

The end viewer drives style and pacing. The internal operator drives system design and reuse.

## Primary End Viewer

### Core Profile

- Age: roughly 18 to 34
- Region: Chinese-speaking internet audience, primarily mainland platforms and adjacent diaspora audiences
- Interest level: medium-to-high NBA interest, but not necessarily hardcore film-room depth
- Viewing context: mobile-first, social-feed-first, often watching without full patience for long setup

### What This Viewer Wants

- understand the matchup fast
- know who the key stars are
- get a strong thesis instead of a vague recap
- feel that the video is informed and current
- see a visual package that feels premium, fast, and legible

### What This Viewer Does Not Want

- a full TV-style pregame show
- long paragraphs of analysis on screen
- weak generic hype language
- data with no explanation
- slow intros that delay the actual point

### Behavioral Traits

- decides in the first 1 to 2 seconds whether to keep watching
- responds well to big contrast, bold typography, and a clear hook
- tolerates density only when hierarchy is obvious
- values recognizable names, stakes, and immediate relevance over exhaustive detail
- is likely to watch muted at first, so visual hierarchy must carry the message

## Secondary End Viewer

### Core Profile

- Age: roughly 25 to 40
- Interest level: higher NBA knowledge, follows playoff narratives closely
- Viewing context: Bilibili, YouTube, desktop or longer mobile session

### What This Viewer Wants

- more context around form, matchup edges, and tactical angles
- sourced claims
- clearer distinction between facts, inference, and narrative framing

### Product Implication

This viewer is the audience for the longer-form preview mode. They are still not looking for a full analyst desk package, but they will tolerate more information density than the social viewer.

## Internal Operator Persona

### Core Profile

- small-team creator, editor, or technical operator
- needs to produce repeatable NBA preview videos with minimal redesign work
- may not want to hand-build every package in After Effects

### What This Operator Wants

- one reliable data-driven workflow
- easy swapping of teams, dates, players, and thesis lines
- stable templates that can be adapted across multiple matchups
- predictable render behavior
- clear documentation for sourcing, structure, and visual intent

### What This Operator Does Not Want

- hardcoded one-off scenes
- style systems that only work for one matchup
- unclear data ownership between code and research
- excessive manual timing tweaks per render

## Primary Persona: "Fast-Take Playoff Viewer"

### Snapshot

- Name: Lin
- Age: 26
- Platform habit: Douyin, Bilibili, Xiaohongshu, WeChat video shares
- NBA habit: follows stars, playoff bracket, big games, and Chinese-language commentary clips
- Attention pattern: gives a video one quick chance, then scrolls

### Goals

- know why this matchup matters right now
- know the 2 to 4 names that decide it
- leave with one strong prediction or debate angle

### Frictions

- too much text per screen
- scenes that look like desktop dashboards instead of social videos
- intros that spend time on atmosphere but not argument
- closing cards that end without a payoff

### Design Rules Derived From This Persona

- the first scene must state the matchup and the stakes immediately
- the title and headline must stay readable on a phone
- any stat block should support one point, not simulate a full TV graphic
- every scene needs one dominant message
- the ending should resolve into a question, prediction, or stance rather than a neutral fade-out

## Content Strategy Implications

### For Social Preview Mode

- target runtime: roughly 18 to 25 seconds
- keep 4 to 5 scenes maximum
- one hook, one star section, one matchup-edge section, one close
- prefer loud hierarchy over exhaustive completeness
- reduce on-screen prose aggressively

### For Long-Form Preview Mode

- allow more structure and evidence
- keep sourcing credibility visible through data architecture, not through cluttered labels
- use more tactical or contextual modules only when they add a clear payoff

## Visual Strategy Implications

- typography must do most of the work
- team colors alone are not enough; the package needs emotional contrast and stronger scene hierarchy
- player imagery should read as hero assets, not small informational thumbnails
- lower bars, scorebugs, and progress rails must earn their screen space
- black or empty end frames weaken perceived polish and should be avoided unless intentionally designed

## Editorial Guardrails

- do not confuse "more information" with "more value"
- do not write analysis blocks that need to be read like articles
- do not force tactical-board depth into a social clip unless the play diagram itself is the hook
- do not let reusable UI chrome overpower the actual thesis of the matchup

## Decision Filter For Future Work

Before adding a scene, animation, or data panel, ask:

1. Does this help the viewer understand the matchup faster?
2. Does this increase the strength of the argument, or just add production?
3. Would this still read clearly on a phone in under two seconds?
4. Is this for the social viewer, the longer-form viewer, or the operator?

If the answer is unclear, the element probably should not be in the short-form cut.
