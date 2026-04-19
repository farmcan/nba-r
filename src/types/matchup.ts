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
  sourceSlate: {
    title: string;
    body: string;
  };
  closingNote: string;
  sources: SourceRef[];
};
