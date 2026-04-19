# System Architecture

This file proposes how `nba-r` should evolve if the end goal is generality and extensibility.

## Goal

Build a reusable NBA motion system where new videos are created by combining:

- a content model
- a theme
- a template
- assets

The desired workflow is:

1. research a matchup or topic
2. localize facts into a typed data file
3. choose a template
4. choose a theme
5. render one or more outputs

## Guiding principles

### Separate truth from presentation

Facts should live in data files.  
Layouts and animation should live in templates.  
Brand and mood should live in themes.

This avoids coupling one matchup's facts to one visual implementation.

### Optimize for repeat production

The system should make the second, third, and tenth matchup easier than the first one.

### Support multiple video families

`nba-r` should not only support playoff previews.

It should be able to support:

- matchup previews
- player spotlights
- stat explainers
- schedule promos
- generic hype opens

## Recommended architecture

### 1. Content model

Store localized content under `src/data`.

Recommended split:

- `src/data/matchups/*.ts`
- `src/data/players/*.ts`
- `src/data/teams/*.ts`
- `src/data/social/*.ts`

For matchup previews, define a stable type such as:

```ts
type MatchupPreviewData = {
  id: string;
  title: string;
  subtitle: string;
  schedule: {
    game: string;
    date: string;
    tipoff: string;
    venue: string;
    matchup: string;
    seasonSeries?: string;
  };
  pulse: string[];
  playerCards: PlayerCard[];
  matchupEdges: EdgeCard[];
  socialBuzz: SocialCard[];
  sources: SourceRef[];
};
```

This should become the default interface for preview templates.

### 2. Theme layer

Store themes under `src/themes`.

Recommended split:

- `src/themes/teams.ts`
- `src/themes/modes.ts`

Each team theme should define:

- primary color
- secondary color
- accent color
- neutral palette
- background motif
- card border style
- logo path
- optional city / culture cues

Example:

```ts
type TeamTheme = {
  teamId: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    cream: string;
    ink: string;
  };
  assets: {
    logo: string;
  };
  motifs: {
    gridOpacity: number;
    stripeAngle: number;
    texture: "clean" | "grit" | "metal" | "poster";
  };
};
```

This is what allows Boston and Philadelphia to feel different without changing the template code.

### 3. Template layer

Store templates under `src/templates`.

Recommended split:

- `src/templates/MatchupPreviewTemplate.tsx`
- `src/templates/PlayerSpotlightTemplate.tsx`
- `src/templates/StatExplainerTemplate.tsx`

Each template should:

- accept typed data
- accept one or more themes
- accept render options
- compose scene modules rather than owning every detail inline

Example:

```ts
type MatchupPreviewTemplateProps = {
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  mode?: "broadcast" | "social";
};
```

### 4. Scene module layer

Store reusable scene modules under `src/scenes`.

Recommended modules:

- `IntroHero`
- `PlayerCardGrid`
- `PlayerCardStack`
- `MatchupEdges`
- `SocialBuzzPanel`
- `ScheduleClose`
- `SourceSlate`

These should be generic and controlled by props.

This is the layer where most animation logic should live.

### 5. Primitive component layer

Store small reusable building blocks under `src/components`.

Recommended components:

- `Frame`
- `TeamBadge`
- `StatChip`
- `SourceLabel`
- `Headline`
- `GridOverlay`
- `TextureOverlay`
- `AnimatedCard`

This keeps scene files smaller and makes style changes cheaper.

### 6. Asset registry

Keep media local but organized.

Recommended structure:

- `public/assets/logos`
- `public/assets/players`
- `public/assets/backgrounds`
- `public/assets/textures`
- `public/audio`

Also add a small registry file when the asset count grows:

- `src/assets.ts`

That lets scene code reference semantic asset names rather than raw paths.

## Runtime modes

The same template should render in at least two modes.

### Broadcast mode

- calmer pacing
- larger title holds
- more formal composition
- more room for stats and sources

### Social mode

- faster pacing
- harder typography hits
- larger card motion
- higher density of hooks per second

The mode should be a prop, not a separate codebase.

## Composition strategy

In `src/Root.tsx`, avoid registering only final one-off compositions.

Instead, register:

- examples
- tests
- templates fed by sample data

Recommended pattern:

- `Celtics76ersPreviewExample`
- `KnicksBucksPreviewExample`
- `PlayerSpotlightExample`

This makes the repo a library plus showcase, not just a dump of outputs.

## Sourcing strategy

Every data file should carry both:

- what is shown on screen
- what backs it up

Recommended source shape:

```ts
type SourceRef = {
  label: string;
  url: string;
  kind: "official-preview" | "injury-report" | "team-page" | "x-post";
  usedFor: string[];
};
```

This makes audit and later updates easier.

## Extension roadmap

### Phase 1

Refactor current preview into:

- one `MatchupPreviewData` type
- one `MatchupPreviewTemplate`
- one `team theme` registry

### Phase 2

Add output variants:

- 16:9 YouTube / broadcast
- 9:16 reels / stories
- 1:1 social square

### Phase 3

Add more content families:

- player spotlight
- stat explainer
- standings snapshot
- injury report update

### Phase 4

Add pipeline helpers:

- source normalization utilities
- asset manifest helpers
- render scripts per template

## Recommended next code move

The next implementation step should be:

1. create `src/types/matchup.ts`
2. create `src/themes/teams.ts`
3. create `src/templates/MatchupPreviewTemplate.tsx`
4. move current Celtics-76ers data into `src/data/matchups/celtics-sixers.ts`
5. convert `src/CelticsSixersPreview.tsx` into a thin example wrapper

That is the cleanest path toward long-term reuse.
