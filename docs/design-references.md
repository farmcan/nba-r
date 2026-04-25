# Design References

This file now serves two purposes:

1. review the current `nba-r` system from a reusable-template perspective
2. collect external visual references that are concrete enough to influence the next Remotion upgrade

Checked on 2026-04-25.

## Current project review

The current project already has a usable package shape:

- one typed matchup contract in `src/types/matchup.ts`
- one main long-form template plus one social template
- reusable scene chrome, team strip, bottom ticker, progress bar, and team theme primitives
- data and rendering are mostly separated

That is the right foundation. The problem is that the system is only partially generic.

### What is working

- scenes are already modular enough to be reordered at the template level
- matchup facts are strongly typed and sit outside the scene files
- team identity is not fully hardcoded inside scene logic
- long-form and social outputs already share part of the same visual language

### Genericity bottlenecks

#### 1. Team system is too narrow

`src/themes/teams.ts` only defines `bos` and `phi`.

Implication:

- the architecture says "reusable workspace"
- the actual theme registry still behaves like a single-project demo

What is missing:

- full league-safe team registry
- fallback theme strategy for missing teams
- conference / round / rivalry / home-away context tokens
- a richer motif system than `gridOpacity`, `stripeAngle`, and `texture`

#### 2. Visual primitives are reusable, but art direction is still hardcoded

The reusable layer in `src/templates/matchup/shared.tsx` is mostly:

- gradients
- grid
- slashes
- court photo
- vignette
- score bug

This is good as infrastructure, but thin as a design system.

What is missing:

- multiple chrome families
- multiple card surface families
- layout presets for different content densities
- reusable badge, stat-chip, rarity-frame, divider, and backdrop variants

#### 3. Scene copy and labels are partially frozen

Several sections still carry fixed English or Chinese labels in component code, for example:

- `PLAYER CARDS`
- `VS`
- scene progress labels
- some fixed ticker phrasing

Implication:

- localization is shallow
- alternate output modes are harder than they should be

The next layer should move all display copy into config or scene props.

#### 4. Content model is strong for one matchup genre, weak for multiple show formats

`MatchupPreviewData` is good for:

- playoff preview
- player-card scene
- tactical explainer

It is weaker for:

- recap
- instant reaction
- standings update
- trade/news package
- season-opener hype
- collectible-card showcase

The data contract needs a higher-level `showMode` and optional content blocks instead of assuming one editorial arc.

#### 5. Typography is functional but not yet a full system

Current font usage mainly relies on:

- `Noto Sans SC`
- `Anton`
- `Barlow Condensed`

That works, but the package still reads as "one heavy sans stack". It does not yet create distinct roles for:

- broadcast utility
- hero headlines
- stat numerals
- collectible-card microcopy

## Visual limitations in the current build

The current package looks competent, but it still feels closer to "good sports template" than "owned sports identity".

### Main visual ceiling

- too much reliance on dark gradient + grid + slash energy
- not enough material contrast between scenes
- cards are panels, not collectible objects
- data hierarchy is decent, but not yet premium
- backgrounds feel synthetic rather than branded

### Most important design gap

The package has motion and composition, but not enough surface language.

What strong sports packages do well:

- the frame itself feels branded
- stats feel like objects
- badges feel collectible
- transitions feel like package mechanics, not generic presets

## Website and product references

The most useful references were not random Behance moodboards. They were live products with real information density.

### 1. NBA.com Playoffs hub

Link: <https://www.nba.com/playoffs/2026>

Observed on 2026-04-25.

Useful patterns:

- clear modular navigation around `Bracket`, `Latest`, `Series`, `Schedule`, `Play-In Tournament`
- big story stack at the top under `LATEST PLAYOFF NEWS`
- playoff coverage mixes editorial, bracket utility, and video clips in one consistent shell
- the page treats series status as a first-class object, not supporting text
- the `Chasing History` module gives short branded clip cards that feel distinct from news cards

What to borrow for Remotion:

- build scenes as modules from a playoff hub, not just a linear opener
- treat `series status`, `round`, and `bracket position` as primary visual metadata
- introduce one branded clip-card style for short highlight inserts
- let the same visual system support both utility cards and editorial hero moments

### 2. ESPN NBA scoreboard

Link: <https://www.espn.com/nba/lite/scoreboard>

Observed on 2026-04-25.

Useful patterns:

- compact score-first information architecture
- game state is always visible before deeper story
- quarter table and series status are small but high-value information blocks
- the layout is dense without becoming decorative noise

What to borrow for Remotion:

- add compact `score-state` and `series-state` microcomponents
- use a tight grid for utility scenes instead of always using large cinematic blocks
- reserve hero space for one message, then place supporting evidence in dense utility modules

### 3. Topps Finest Basketball

Link: <https://www.topps.com/pages/topps-finest-basketball>

Observed on 2026-04-25.

Useful patterns:

- a 3-tier base system with distinct looks
- insert concepts are named and visually differentiated
- products like `Baseline Autographs`, `Pulse`, and `Electrifying Signatures` each imply their own frame logic
- court references are embedded into layout, not added as literal backgrounds

What to borrow for Remotion:

- define 3 card tiers for player modules: `base`, `featured`, `hit`
- create named card skins instead of one generic player panel
- use subtle court-line geometry as card structure
- add "insert set" logic so the same player data can render in different collectible treatments

### 4. Topps Chrome Basketball

Link: <https://www.topps.com/pages/topps-chrome-basketball>

Observed on 2026-04-25.

Useful patterns:

- refractor / rainbow / tech-parallel language
- highly differentiated insert families such as `Activators`, `Tall Tales`, and `X's and Whoa's`
- premium feel comes from surface treatment and layering, not just from glow

What to borrow for Remotion:

- add chrome, foil, holo, paper, and matte surfaces as reusable effect presets
- separate scene meaning from material treatment
- let the same scene layout swap between `broadcast`, `chrome`, and `editorial` skins

## Older packaging references that still matter

These are still valuable because they reinforce system thinking instead of one-off social design.

### Tencent NBA Opener

Link: <https://vimeo.com/293051250>

Takeaway:

- one coherent premium visual language across set screens, ribbon boards, data templates, and AR

### ESPN NBA GFX Package

Link: <https://www.behance.net/gallery/44288081/ESPN-NBA-GFX-Package/modules/266551411>

Takeaway:

- hierarchy is explicit: hero, matchup id, support data, utility labels

### NBA Finals Show Open

Link: <https://vimeo.com/34381412>

Takeaway:

- scale and ceremony can come from environment and typography, not only from edit speed

### NBA on TNT Thursday Stinger

Link: <https://vimeo.com/694685602>

Takeaway:

- team and city culture should change the motion language, not only the color palette

### MLB Broadcast Package 2026

Link: <https://vimeo.com/1176240504>

Takeaway:

- a stable system can still adapt strongly to different teams

## What `nba-r` should do next

The next step is not "add more effects". The next step is to split the system into clear layers.

### Layer 1: content and mode

Add top-level show descriptors:

- `showMode`: `preview` | `recap` | `social` | `spotlight` | `countdown`
- `tone`: `broadcast` | `editorial` | `collectible` | `urgent`
- `pace`: `theatrical` | `balanced` | `fast`

Why:

- one matchup should be able to render into multiple output styles without changing scene code everywhere

### Layer 2: visual tokens

Expand theme tokens beyond team colors:

- `surfaces`: paper / chrome / foil / glass / blackout
- `frames`: scoreboard / collectible / news card / tactical board
- `lighting`: soft arena / hard spotlight / neon edge / muted studio
- `ornaments`: corner cuts / trim rails / seed markers / rank tabs / serial-number stamp
- `type roles`: hero / utility / stat / label / ticker

Why:

- this lets the package feel authored without hardcoding every scene

### Layer 3: scene primitives

Create reusable primitives that scenes can compose:

- `HeroPlate`
- `SeriesStateChip`
- `SeedBadge`
- `StatRail`
- `CardSurface`
- `InsertFrame`
- `NewsStack`
- `BracketNode`
- `PlayerStamp`
- `RarityStamp`

Why:

- most of the current scenes are still built like custom layouts instead of assemblies of strong parts

### Layer 4: layout presets

Add layout families for density and aspect:

- cinematic split
- scoreboard utility
- card gallery
- bracket desk
- quote stack
- tactical whiteboard

Why:

- a good template system should pick layouts by editorial need, not rewrite a scene every time

## Concrete Remotion visual upgrade ideas

### A. Turn player cards into real insert sets

Current state:

- good panel design
- not yet card-culture design

Upgrade:

- support `base`, `chrome`, `pulse`, `autograph`, `legend` variants
- add border depth, foil edge, rarity label, card number, seed badge, and season stamp
- animate reflections and subtle parallax instead of only fade/slide entry

This is the highest-leverage visual win.

### B. Add an ESPN-style utility layer

Current state:

- almost every scene wants to be a hero scene

Upgrade:

- add compact score rows
- add mini quarter lines
- add series ladder
- add top-performers strip
- add injury / availability micro-chip

This improves information density and makes the package more credible.

### C. Add an NBA.com-style playoff hub scene family

Upgrade:

- `PlayoffHubScene`
- `SeriesMatrixScene`
- `LatestStackScene`
- `ChasingHistoryScene`

These scenes should feel like a modular information center rather than a cinematic backdrop.

### D. Give each theme a motion profile

Current state:

- color changes by team
- motion language is still mostly shared

Upgrade:

- Boston can feel clean, linear, authoritative
- Philly can feel sharper, more electric, more collision-based
- Knicks could feel tabloid / billboard
- Lakers could feel spotlight / prestige

Motion should become part of theming.

### E. Add surface contrast between scenes

Upgrade:

- one scene can be matte editorial
- next scene can be chrome collectible
- tactical scene can shift to dry whiteboard surface
- closing scene can go back to premium blackout stage

This gives pacing without relying on random transitions.

## Suggested implementation order

### Phase 1: system work

- generalize `TeamId` and `teamThemes`
- add theme fallback
- move fixed scene labels into config
- introduce `showMode`, `tone`, and `pace`
- define surface and frame token types

### Phase 2: visual primitives

- build `CardSurface`, `SeriesStateChip`, `SeedBadge`, `StatRail`, and `BracketNode`
- refactor current scenes to consume these primitives

### Phase 3: standout scenes

- rebuild `PlayerCardDeckScene` as insert-style collectible scene
- rebuild `PlayoffPanoramaScene` as playoff-hub / bracket scene
- rebuild one utility-heavy scene in an ESPN-style dense layout

### Phase 4: polish

- add richer font roles
- add subtle material animation presets
- replace generic transitions with package-specific mechanical wipes
- add aspect-ratio aware layouts for 16:9 and 9:16

## Bottom line

The repo does not need a total rewrite. It needs a better separation between:

- editorial mode
- visual skin
- material surface
- reusable module

Right now the project is already good enough to support a serious upgrade. The next quality jump will come from treating the package like a hybrid of:

- NBA.com playoff hub
- ESPN utility graphics
- Topps collectible-card surfaces

Instead of treating every scene as the same dark sports canvas with different text.
