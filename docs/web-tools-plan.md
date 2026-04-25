# Web Tools Plan

This plan covers two standalone review tools that live alongside the Remotion project and do not require adding a new frontend build system.

## Goal

Add two directly-openable web pages:

1. an infinite-canvas DAG page for the agent-to-video workflow
2. a segmented media preview page for reviewing rendered video and source audio

## Constraints

- Keep the existing Remotion project untouched as the render engine
- Avoid introducing Vite / Next / another web build chain
- Make the pages readable when opened locally from disk
- Store enough structure and guidance that future agents can generate similar pages fast

## File Layout

- Create: `tools/dag/index.html`
- Create: `tools/segment-preview/index.html`
- Create: `tools/shared/agent-workflow-data.js`
- Create: `docs/web-tools-plan.md`
- Create: `docs/web-tools-logic.md`
- Modify: `README.md`

## Tool 1: DAG Infinite Canvas

### Purpose

Show the end-to-end workflow for agent-driven video production:

- request intake
- research
- data shaping
- scene composition
- render
- review
- iteration
- publish

Also show failure paths as explicit nodes, for example:

- missing source
- TTS duration mismatch
- render decode warning
- empty tail frame

### Behavior

- drag to pan canvas
- wheel / trackpad zoom
- fit-to-view button
- mini status legend
- clickable nodes with detail drawer
- error nodes visually distinct from success nodes

## Tool 2: Segmented Media Preview

### Purpose

Provide a review page for:

- the rendered preview video
- the supporting source audio
- named segments / chapters
- quick jumping and loop review

### Behavior

- one main video player
- one source audio player
- segment list with start/end time
- click segment to jump video and audio
- next / previous segment
- loop current segment
- show current playhead and active segment

## Shared Data Strategy

Keep the tool data explicit and editable in one shared JS module:

- pipeline nodes
- pipeline edges
- incident nodes
- video segment definitions
- audio segment definitions
- media file paths

## Verification

- Open both HTML pages locally and confirm they render
- Confirm DAG canvas pans and zooms
- Confirm node drawer opens
- Confirm segment page loads the target media
- Confirm segment jump and loop controls work

## Documentation Requirement

The final docs must explain:

- why these tools are standalone HTML instead of a bundled app
- how to update media paths and segment data
- how to add new DAG nodes and failure cases
- how to reuse the same pattern for future videos
