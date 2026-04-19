import {TeamId} from "../types/matchup";

export type TeamTheme = {
  teamId: TeamId;
  city: string;
  name: string;
  shortName: string;
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

export const teamThemes: Record<TeamId, TeamTheme> = {
  bos: {
    teamId: "bos",
    city: "波士顿",
    name: "凯尔特人",
    shortName: "凯尔特人",
    colors: {
      primary: "#007A33",
      secondary: "#BA9653",
      accent: "#F5EFE0",
      cream: "#F4EFE6",
      ink: "#081018",
    },
    assets: {
      logo: "assets/logos/celtics.svg",
    },
    motifs: {
      gridOpacity: 0.18,
      stripeAngle: -12,
      texture: "clean",
    },
  },
  phi: {
    teamId: "phi",
    city: "费城",
    name: "76ers",
    shortName: "76人",
    colors: {
      primary: "#006BB6",
      secondary: "#ED174C",
      accent: "#F5EFE0",
      cream: "#F4EFE6",
      ink: "#081018",
    },
    assets: {
      logo: "assets/logos/sixers.svg",
    },
    motifs: {
      gridOpacity: 0.18,
      stripeAngle: 12,
      texture: "clean",
    },
  },
};

export const getTeamTheme = (teamId: TeamId): TeamTheme => {
  return teamThemes[teamId];
};
