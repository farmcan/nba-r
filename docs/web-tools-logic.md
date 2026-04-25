# Web Tools Logic

This document records the logic behind the two standalone review tools so future agents can recreate or extend them quickly.

## Why Standalone HTML

This repo is a Remotion workspace, not a general-purpose frontend app. Adding a second frontend toolchain would create unnecessary surface area:

- more config
- more package churn
- more confusion about which app is the source of truth

So the two tools live as directly-openable HTML pages under `tools/` and share one plain JS data file.

## Shared Pattern

Both tools follow the same pattern:

1. put editable data in `tools/shared/agent-workflow-data.js`
2. keep UI logic self-contained inside each page
3. point to real local media in `out/` and `public/audio/`
4. make review actions obvious and fast

## Tool 1: DAG Infinite Canvas

Path:

- `tools/dag/index.html`

### Data it reads

- `dag.viewport`
- `dag.nodes`
- `dag.edges`

### Core interaction model

- pan by dragging the viewport
- zoom with mouse wheel
- fit-to-view using computed node bounds
- click a node to open its detail summary in the sidebar

### Node types

- `input`
- `process`
- `decision`
- `incident`
- `output`

### Status values

- `done`
- `fixed`
- `warning`
- `pending`

### Why incidents are first-class nodes

The production flow is not just "happy path". When the agent hits:

- TTS duration mismatch
- render decode warning
- black tail frame

those failures should stay visible in the graph, because they are part of the real workflow history and future debugging context.

## Tool 2: Segment Preview

Path:

- `tools/segment-preview/index.html`

### Data it reads

- `media.previewVideo`
- `media.previewAudio`
- `segments.video`
- `segments.audio`

### Core interaction model

- click a segment to jump playback
- previous / next segment buttons
- play current segment
- optional segment loop
- sync audio playhead to video playhead

### Why separate video and audio segments

The review questions are not identical:

- video segments are for composition, pacing, hierarchy, and visual transitions
- audio segments are for TTS fit, density, and whether the voiceover lands on the right visual beat

Keeping them separate makes it easier to spot mismatch instead of pretending one timeline definition solves both.

## How To Reuse For The Next Video

### Step 1: Replace media paths

Update:

- `media.previewVideo`
- `media.previewAudio`

### Step 2: Replace segment timing

Update:

- `segments.video`
- `segments.audio`

Use named chunks instead of anonymous timestamps.

### Step 3: Replace workflow graph content

Update:

- `dag.nodes`
- `dag.edges`

Always include:

- request intake
- research
- composition / build
- render
- review
- publish
- at least one incident node if anything failed during the run

### Step 4: Keep the same questions

For DAG:

- where did the process branch?
- what failed?
- what was fixed?
- what is the final output node?

For segment preview:

- does the hook land fast enough?
- are the major sections readable?
- does the audio match the visual beat?
- does the ending close cleanly?

## Design Rules For Future Tools

- one file for data, one file per tool
- no hidden build step
- real media paths, not placeholders
- short interaction loop
- every tool should help either debug the process or review the output
