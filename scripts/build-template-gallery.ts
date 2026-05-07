import {mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {celticsSixersPreview} from "../src/data/matchups/celtics-sixers";
import {getTeamTheme} from "../src/themes/teams";
import {
  FanComment,
  RatingRow,
  RundownCue,
  SocialPost,
  Sticker,
  renderTemplateGallery,
} from "./lib/social-overlays";

const data = celticsSixersPreview;
const homeTheme = getTeamTheme(data.teams.home.teamId);
const awayTheme = getTeamTheme(data.teams.away.teamId);
const assetPrefix = "../public/";

const assetSrc = (assetPath: string): string => `${assetPrefix}${assetPath}`;

const posts: SocialPost[] = [
  {
    displayName: "NBA",
    handle: "@NBA",
    meta: "pregame",
    body: "G1 is not just seed vs seed. It is Boston's structure against Philadelphia's first-action pressure.",
    avatarSrc: assetSrc("assets/nba-logo.svg"),
    teamColor: homeTheme.colors.primary,
    metrics: {replies: "1.8K", reposts: "4.2K", likes: "29K"},
    sourceLabel: "social post template",
  },
  {
    displayName: "Celtics Watch",
    handle: "@celtics_stats",
    meta: "series pulse",
    body: "If Tatum and Brown keep forcing help early, the Sixers have to win the second side all night.",
    avatarSrc: assetSrc(homeTheme.assets.logo),
    teamColor: homeTheme.colors.primary,
    metrics: {replies: "412", reposts: "980", likes: "8.6K"},
  },
];

const comments: FanComment[] = [
  {
    user: "greenline_18",
    sentiment: "belief",
    body: "别只看 2 打 7，费城第一节能不能顶住才是重点。",
    teamColor: homeTheme.colors.primary,
  },
  {
    user: "philly_run",
    sentiment: "hype",
    body: "马克西只要把第一道防线打退，这轮不会轻松。",
    teamColor: awayTheme.colors.primary,
  },
  {
    user: "half_court_lab",
    sentiment: "tactical",
    body: "真正看点是弱侧协防：谁先让对面轮转慢半拍。",
    teamColor: "#2d8cff",
  },
];

const ratings: RatingRow[] = [
  {
    rank: "01",
    player: "杰森·塔图姆",
    team: "凯尔特人",
    score: "9.1",
    tag: "高分预警",
    voters: "8,214",
    teamColor: homeTheme.colors.primary,
  },
  {
    rank: "02",
    player: "泰瑞斯·马克西",
    team: "76人",
    score: "8.8",
    tag: "爆点观察",
    voters: "6,903",
    teamColor: awayTheme.colors.primary,
  },
  {
    rank: "03",
    player: "杰伦·布朗",
    team: "凯尔特人",
    score: "8.6",
    tag: "稳定输出",
    voters: "5,771",
    teamColor: homeTheme.colors.primary,
  },
];

const stickers: Sticker[] = [
  {label: "UPSET WATCH", tone: "warning"},
  {label: "FIRST ACTION", tone: "cold"},
  {label: "BOSTON DEPTH", tone: "neutral"},
  {label: "HOT TAKE", tone: "hot"},
  {label: "KEY 01", tone: "warning"},
];

const rundown: RundownCue[] = [
  {timecode: "00:00", title: "Cold open: Boston cannot coast", status: "live", source: "hero portraits + thesis"},
  {timecode: "00:07", title: "Matchup board", status: "ready", source: "NBA series page / schedule"},
  {timecode: "00:17", title: "Star duel", status: "ready", source: "player cards / source chips"},
  {timecode: "00:30", title: "Three keys", status: "ready", source: "tactical meters"},
  {timecode: "00:44", title: "Verdict and comments", status: "hold", source: "CTA template"},
];

const main = async (): Promise<void> => {
  const html = renderTemplateGallery({
    title: "NBA Social Overlay Templates",
    theme: {
      homeColor: homeTheme.colors.primary,
      awayColor: awayTheme.colors.primary,
      accentColor: "#ffe199",
    },
    posts,
    comments,
    ratings,
    stickers,
    rundown,
  });

  const outputPath = path.resolve(process.cwd(), "templates/nba-social-overlays.html");
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, html, "utf8");
  process.stdout.write("Generated social overlay template gallery\n");
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

