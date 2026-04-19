# Playoff Panorama

This doc defines the opening “big picture” layer for playoff videos.

## Why it belongs first

Single-series previews are stronger when viewers first understand:

- what the current playoff tree looks like
- where the focus series sits inside that tree
- what results already landed elsewhere

Without that, the preview has detail but not enough context.

## Default opening sequence

For playoff videos, the preferred order is:

1. Playoff panorama
2. Focus series position in the bracket
3. Matchup preview scenes

## What AI should collect

Before rendering, AI should gather current playoff state from reliable, current sources.

Minimum fields:

- conference bracket pairings
- current series scores
- completed Game 1 results when available
- focus series location
- short all-up summary of the field

## Suggested data shape

Use `playoffPanorama` in the matchup data file.

It should describe:

- when the snapshot was captured
- a one-line overall overview
- East and West headlines
- all relevant series nodes

## Recommended visual treatment

- one clean bracket tree, not cluttered tables
- focus series highlighted with stronger glow or color band
- current score shown as `1-0`, `0-0`, etc.
- completed results should read as settled
- upcoming series should read as pending

## Current-source rule

This layer is time-sensitive.

AI should refresh it before each render when the request depends on “current” playoff state.

