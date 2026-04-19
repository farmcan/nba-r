export type TeamId = "bos" | "phi";

export type SourceRef = {
  label: string;
  url: string;
  kind: "official-preview" | "injury-report" | "team-page" | "x-post";
  usedFor: string[];
};

export type MatchupTeam = {
  teamId: TeamId;
  city: string;
  name: string;
  shortName: string;
  seed: number;
};

export type PulsePoint = {
  text: string;
  teamId?: TeamId;
};

export type PlayerCard = {
  name: string;
  teamId: TeamId;
  image: string;
  badge: string;
  stat: string;
  note: string;
  sourceLabel: string;
};

export type MatchupEdge = {
  eyebrow: string;
  headline: string;
  body: string;
  teamId?: TeamId;
};

export type SocialBuzz = {
  handle: string;
  date: string;
  text: string;
  teamId?: TeamId;
};

export type NarrativeThread = {
  title: string;
  summary: string;
  teamId?: TeamId;
  sourceLabel?: string;
};

export type HeadToHeadNote = {
  label: string;
  detail: string;
  sourceLabel?: string;
};

export type RecentFormNote = {
  label: string;
  detail: string;
  teamId?: TeamId;
  sourceLabel?: string;
};

export type StyleProfile = {
  teamId: TeamId;
  identity: string;
  offense: string;
  defense: string;
  tempo?: string;
  sourceLabel?: string;
};

export type TacticalKey = {
  title: string;
  detail: string;
  offenseTeamId?: TeamId;
  defenseTeamId?: TeamId;
  sourceLabel?: string;
};

export type TacticalBoardItem = {
  title: string;
  setup: string;
  trigger: string;
  read: string;
  counter?: string;
  offenseTeamId?: TeamId;
  defenseTeamId?: TeamId;
  sourceLabel?: string;
};

export type BracketSeriesTeam = {
  label: string;
  seed: number;
  wins: number;
};

export type BracketSeries = {
  conference: "east" | "west";
  round: "play-in" | "first-round" | "second-round" | "conference-finals" | "finals";
  slot: string;
  topTeam: BracketSeriesTeam;
  bottomTeam: BracketSeriesTeam;
  status: string;
  sourceLabel?: string;
};

export type PlayoffPanorama = {
  capturedAt: string;
  overview: string;
  eastHeadline: string;
  westHeadline: string;
  focusSeriesSlot?: string;
  series: BracketSeries[];
};

export type MatchupPreviewData = {
  id: string;
  title: string;
  subtitle: string;
  contextLabel: string;
  schedule: {
    game: string;
    date: string;
    tipoff: string;
    venue: string;
    matchup: string;
    seasonSeries?: string;
  };
  teams: {
    home: MatchupTeam;
    away: MatchupTeam;
  };
  pulse: PulsePoint[];
  playerCards: PlayerCard[];
  matchupEdges: MatchupEdge[];
  socialBuzz: SocialBuzz[];
  narrativeThreads?: NarrativeThread[];
  headToHead?: HeadToHeadNote[];
  recentForm?: RecentFormNote[];
  styleProfiles?: StyleProfile[];
  tacticalKeys?: TacticalKey[];
  tacticalBoard?: TacticalBoardItem[];
  playoffPanorama?: PlayoffPanorama;
  sourceSlate: {
    title: string;
    body: string;
  };
  voiceover?: {
    script: string;
    audioSrc: string;
    voice: string;
  };
  closingNote: string;
  sources: SourceRef[];
};
