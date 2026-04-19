import {MatchupPreviewData} from "../../types/matchup";

export const celticsSixersPreview: MatchupPreviewData = {
  id: "celtics-sixers-2026-r1-g1",
  title: "Celtics vs 76ers",
  subtitle: "2026 East first-round preview",
  contextLabel: "East Round 1",
  schedule: {
    game: "Game 1",
    date: "April 19, 2026",
    tipoff: "1:00 PM ET",
    venue: "TD Garden",
    matchup: "Boston No. 2 seed vs Philadelphia No. 7 seed",
    seasonSeries: "Regular season series tied 2-2",
  },
  teams: {
    home: {
      teamId: "bos",
      city: "Boston",
      name: "Celtics",
      shortName: "Boston",
      seed: 2,
    },
    away: {
      teamId: "phi",
      city: "Philadelphia",
      name: "76ers",
      shortName: "Philadelphia",
      seed: 7,
    },
  },
  pulse: [
    {
      text: "Boston enters with home court and a deeper two-way baseline.",
      teamId: "bos",
    },
    {
      text: "Philadelphia earned the No. 7 seed by beating Orlando in the Play-In on April 15.",
      teamId: "phi",
    },
    {
      text: "The official NBA series preview framed Boston as the cleaner, deeper favorite.",
      teamId: "bos",
    },
    {
      text: "Philadelphia's swing factor is whether Maxey and George can keep the game in rotation without a fully healthy Embiid.",
      teamId: "phi",
    },
  ],
  playerCards: [
    {
      name: "Jayson Tatum",
      teamId: "bos",
      image: "assets/players/tatum.png",
      badge: "Boston engine",
      stat: "25 PTS • 18 REB • 11 AST",
      note: "First triple-double of the season in Boston's April 1 road win at Miami.",
      sourceLabel: "NBA player page / NBA on X, Apr. 2, 2026",
    },
    {
      name: "Jaylen Brown",
      teamId: "bos",
      image: "assets/players/brown.png",
      badge: "Shot-creation pressure",
      stat: "43 PTS",
      note: "The loudest recent Celtics scoring burst highlighted by NBA's April 2 X recap.",
      sourceLabel: "NBA on X, Apr. 2, 2026",
    },
    {
      name: "Tyrese Maxey",
      teamId: "phi",
      image: "assets/players/maxey.png",
      badge: "Primary burner",
      stat: "28.3 PPG • 6.6 APG",
      note: "Official Play-In coverage positioned Maxey as Philly's main shot-maker entering the series.",
      sourceLabel: "NBA Play-In live updates, Apr. 15, 2026",
    },
    {
      name: "Paul George",
      teamId: "phi",
      image: "assets/players/george.png",
      badge: "Secondary initiator",
      stat: "21.0 PTS • 7.4 REB • 4.3 AST",
      note: "Those were George's numbers across the final seven regular-season games after returning.",
      sourceLabel: "2026 NBA Playoffs series preview: Celtics-76ers",
    },
  ],
  matchupEdges: [
    {
      eyebrow: "Boston edge",
      headline: "Baseline advantage",
      body: "The NBA's official series preview pointed to Boston's offense, defense, depth and championship experience as the clearest structural advantage.",
      teamId: "bos",
    },
    {
      eyebrow: "Philadelphia path",
      headline: "Shot creation window",
      body: "The same preview flagged shot-making and playmaking as Philly's route, especially if Maxey can force Boston into rotation.",
      teamId: "phi",
    },
    {
      eyebrow: "Availability watch",
      headline: "Embiid cloud",
      body: "Philadelphia's April 10 official injury report still listed Joel Embiid with right-knee surgery and appendectomy designations.",
      teamId: "phi",
    },
  ],
  socialBuzz: [
    {
      handle: "@NBA",
      date: "Apr 2",
      text: "Boston chatter spiked after Brown's 43-point night and Tatum's first triple-double of the season.",
      teamId: "bos",
    },
    {
      handle: "@NBA",
      date: "Apr 16",
      text: "League-wide playoff talk shifted to Philly once the 76ers closed the Play-In and grabbed the East's 7-seed.",
      teamId: "phi",
    },
    {
      handle: "@celtics_stats",
      date: "Mar 18",
      text: "One Celtics-side talking point: Brown climbed into 10th on the franchise scoring list before the postseason push.",
      teamId: "bos",
    },
  ],
  sourceSlate: {
    title: "Reality check",
    body: "This cut is sourced to official NBA coverage and official injury-report PDFs, not invented matchup lore.",
  },
  closingNote:
    "Built from local, sourced matchup data so this project can scale to more NBA preview videos without rewriting the edit from scratch.",
  sources: [
    {
      label: "2026 NBA Playoffs series preview: Celtics-76ers",
      url: "https://api-hub.nba.com/news/2026-nba-playoffs-series-preview-celtics-76ers",
      kind: "official-preview",
      usedFor: ["series framing", "Paul George note", "Boston edge", "Philadelphia path"],
    },
    {
      label: "Magic-76ers Play-In live updates",
      url: "https://api-hub.nba.com/news/live-updates-sofi-play-in-tournament-magic-76ers-opens-night-two",
      kind: "official-preview",
      usedFor: ["No. 7 seed context", "Tyrese Maxey note"],
    },
    {
      label: "Injury Report PDF, Apr. 10, 2026",
      url: "https://ak-static.cms.nba.com/referee/injury/Injury-Report_2026-04-10_05_00PM.pdf",
      kind: "injury-report",
      usedFor: ["Embiid availability watch"],
    },
    {
      label: "NBA X post on Brown and Tatum, Apr. 2, 2026",
      url: "https://x.com/NBA/status/2039573905392730332",
      kind: "x-post",
      usedFor: ["Brown card", "Tatum card", "Boston buzz"],
    },
    {
      label: "celtics_stats X post, Mar. 18, 2026",
      url: "https://x.com/celtics_stats/status/2034418975707107778",
      kind: "x-post",
      usedFor: ["Celtics-side buzz card"],
    },
    {
      label: "Tyrese Maxey injury news page",
      url: "https://www.nba.com/news/tyrese-maxey-out-at-least-two-games-due-to-sprained-right-fifth-finger",
      kind: "team-page",
      usedFor: ["Maxey recent context"],
    },
  ],
};
