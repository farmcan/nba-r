# Design References

This file summarizes strong external references for `nba-r` and extracts the parts that are worth turning into system rules.

## Reference set

### Tencent NBA Opener

Link: <https://vimeo.com/293051250>

What stands out:

- one coherent premium visual language across set screens, ribbon boards, data templates, and AR
- sharp geometric framing instead of generic sports grunge
- data-driven graphics treated as first-class design, not overlays added later

System takeaway:

- `nba-r` should not think in terms of one video file
- it should think in terms of one visual language with many output modules

### ESPN NBA GFX Package

Link: <https://www.behance.net/gallery/44288081/ESPN-NBA-GFX-Package/modules/266551411>

What stands out:

- big 3D logo energy
- strong hierarchy between hero title, matchup identifier, and supporting stat graphics
- high-pressure, low-noise composition

System takeaway:

- every template needs explicit hierarchy layers:
  - hero
  - matchup metadata
  - supporting evidence
  - utility labels

### NBA Finals Show Open

Link: <https://vimeo.com/34381412>

What stands out:

- ceremony and scale
- environment design doing as much work as footage
- historical gravitas rather than social-media pace

System takeaway:

- `nba-r` should support both:
  - short-form social previews
  - larger openers with slower, more theatrical pacing

### NBA on TNT Thursday Stinger

Link: <https://vimeo.com/694685602>

What stands out:

- matchup graphics tied to city culture and music language
- not just “sports hype”, but specific cultural texture

System takeaway:

- future themes should have room for city / team culture signals
- a Knicks package should not move like a Suns package by default

### MTVxNFL

Link: <https://vimeo.com/494238867>

What stands out:

- sports content reframed through fashion, youth culture, and social energy
- campaign packaging instead of pure broadcast packaging

System takeaway:

- `nba-r` should support alternate presentation modes:
  - broadcast
  - social campaign
  - stat explainer
  - player spotlight

### NBA Social Media Illustrations

Link: <https://www.behance.net/gallery/46987839/NBA-Social-Media-Illustrations>

What stands out:

- repeatable output around key matchups, milestones, and player moments
- wide stylistic freedom inside a recurring social system

System takeaway:

- the content model needs to make repeat production cheap
- the style layer needs to remain flexible

### TyC Sports 2024 Graphic Package Broadcast

Link: <https://www.behance.net/gallery/201979269/TyC-Sports-2024-Graphic-Package-Broadcast>

What stands out:

- emotionally loud typography
- tactical symbols and chants used as recurring motifs
- the package feels owned by its sports culture

System takeaway:

- typography should carry emotion, not just information
- motif systems should be part of the theme layer

### MLB Broadcast Package 2026

Link: <https://vimeo.com/1176240504>

What stands out:

- one scalable visual system adapted across different teams
- team identity translated without rebuilding the whole package

System takeaway:

- this is the closest model for `nba-r`
- we want a stable template engine with team-level theming

### NEX Sports News Broadcast Pack V1

Link: <https://vimeo.com/294959655>

What stands out:

- explicitly modular package: opener, lower thirds, tables, social blocks, transitions

System takeaway:

- the repo should expose reusable scene primitives, not just full videos

## Shared design patterns

Across these references, the strongest recurring patterns are:

- one clear visual thesis per package
- typography doing most of the heavy lifting
- player imagery treated as collectible / hero assets
- modular scenes that can be reassembled
- team adaptation without rewriting the system
- stats and metadata integrated into layout, not appended
- different pacing modes for social vs. broadcast

## What `nba-r` should copy

- design as a system, not as a one-off edit
- reusable modules for intros, player cards, edge frames, social buzz, and closes
- strong team-color adaptation
- deliberate hierarchy with fewer but louder messages
- support for multiple output formats and runtimes

## What `nba-r` should avoid

- generic “sports energy” without team or city specificity
- hardcoding facts inside components
- designs that only work for one matchup
- overreliance on effects instead of composition
- layouts that cannot scale from 2 to 6 player cards
