# Docs Overview

This folder was trimmed down to keep only documents that still describe the current repo.

## Read these first

- `ai-runbook.md`: operating workflow for turning a request into a renderable matchup package
- `analysis-framework.md`: editorial standard for what a serious preview should contain
- `production-handbook.md`: implementation notes and UI/animation pitfalls from real builds

## Supporting references

- `design-references.md`: current-project review plus external packaging, web UI, and trading-card references for the next visual-system upgrade
- `nba-video-analysis.md`: Chinese long-form notes on high-performing NBA video patterns

## Current system in one page

- Source-of-truth matchup data lives in `src/data/matchups`
- The typed contract lives in `src/types/matchup.ts`
- The reusable renderer lives in `src/templates/MatchupPreviewTemplate.tsx`
- Team styling lives in `src/themes/teams.ts`
- The example composition wrapper is `src/CelticsSixersPreview.tsx`

## Documentation rule

When the repo changes, update an existing core doc before adding a new one.

If a note is only useful for one build, keep it close to the code or remove it after the pattern is absorbed into:

- `ai-runbook.md`
- `analysis-framework.md`
- `production-handbook.md`
