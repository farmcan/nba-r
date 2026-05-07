import {mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {celticsSixersPreview} from "../src/data/matchups/celtics-sixers";
import {getTeamTheme} from "../src/themes/teams";
import {
  FanComment,
  HupuOfficialLiteRating,
  HupuMobileRating,
  MobileFeedPost,
  RatingRow,
  RundownCue,
  SocialPost,
  Sticker,
  TemplateDefinition,
  renderFanCommentWall,
  renderHupuOfficialLiteRating,
  renderHupuMobileRating,
  renderMobileSocialFeed,
  renderProducerRundown,
  renderSocialPostDeck,
  renderStandaloneTemplatePage,
  renderStickerTape,
  renderTemplateGallery,
} from "./lib/social-overlays";

const data = celticsSixersPreview;
const homeTheme = getTeamTheme(data.teams.home.teamId);
const awayTheme = getTeamTheme(data.teams.away.teamId);
const assetPrefix = "../public/";

const assetSrc = (assetPath: string): string => `${assetPrefix}${assetPath}`;

const theme = {
  homeColor: homeTheme.colors.primary,
  awayColor: awayTheme.colors.primary,
  accentColor: "#ffe199",
};

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

const mobileFeed: MobileFeedPost = {
  displayName: "Tyrese Maxey",
  handle: "@TyreseMaxey",
  meta: "12m",
  body: "Game 1. Garden noise. First punch matters. We know what this one is.",
  avatarSrc: assetSrc("assets/players/maxey.png"),
  imageSrc: assetSrc("assets/players/maxey.png"),
  teamColor: awayTheme.colors.primary,
  metrics: {replies: "2.4K", reposts: "6.9K", likes: "48K"},
  sourceLabel: "X-style mock feed / synthetic content",
  comments: [
    {
      user: "Paul George",
      handle: "@Yg_Trece",
      body: "Set the tone early. Make the second side matter.",
      likes: "9.8K",
      teamColor: awayTheme.colors.primary,
    },
    {
      user: "Celtics Watch",
      handle: "@celtics_stats",
      body: "Boston will test that first action every possession.",
      likes: "3.1K",
      teamColor: homeTheme.colors.primary,
    },
    {
      user: "film room",
      handle: "@half_court_lab",
      body: "This is the clip before the clip: if the weak side tags early, Philly has to punish the closeout.",
      likes: "1.7K",
      teamColor: "#1d9bf0",
    },
    {
      user: "Garden crowd",
      handle: "@parquet_noise",
      body: "Post this again after the first timeout.",
      likes: "822",
      teamColor: homeTheme.colors.primary,
    },
  ],
};

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

const hupuRating: HupuMobileRating = {
  topic: "NBA季后赛评分",
  subject: "凯尔特人 vs 76人 G1 赛前印象",
  tagline: "社区评分模板 · 非实时抓取数据",
  score: "8.7",
  voters: "12,486",
  distribution: ["58.42%", "18.16%", "9.74%", "5.31%", "8.37%"],
  rows: ratings,
  comments: [
    {
      user: "波士顿茶馆",
      body: "塔图姆要是第一节就把协防打出来，这场大概率会很快进入凯尔特人的节奏。",
      likes: "1,284",
    },
    {
      user: "费城第一步",
      body: "别急着判死刑，马克西能不能让第一道防线后退才是这轮真正的变量。",
      likes: "986",
    },
    {
      user: "只看战术板",
      body: "虎扑评分最有意思的是情绪波动，视频里用它做中场转场会比普通数据卡更像球迷现场。",
      likes: "642",
    },
  ],
};

const hupuOfficialLiteRating: HupuOfficialLiteRating = {
  category: "NBA季后赛评分",
  title: "凯尔特人 vs 76人 G1 赛前印象",
  subtitle: "社区评分模板 · 非实时抓取数据",
  score: "8.7",
  voters: "12,486",
  distribution: ["58.42%", "18.16%", "9.74%", "5.31%", "8.37%"],
  footerCount: "3.4万讨论",
};

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

const templateDefinitions: TemplateDefinition[] = [
  {
    id: "x-mobile-social-feed",
    name: "X Mobile Social Feed",
    output: "x-mobile-social-feed.html",
    description: "Phone-based X-style feed with a player post, action row, replies, and vertical scroll motion.",
    bestFor: ["player post", "viral tweet", "reply thread", "social reaction beat"],
    avoidWhen: ["need official source citation", "no social post/comment data"],
    requiredData: ["displayName", "handle", "post body", "metrics", "comments"],
    agentSelection: "Choose when the script says a player posted, fans replied, or the scene should feel like scrolling a phone.",
  },
  {
    id: "hupu-mobile-rating",
    name: "Hupu Mobile Rating",
    output: "hupu-mobile-rating.html",
    description: "Hupu-style mobile rating page with score, JRs count, rating distribution, ranked rows, and hot comments.",
    bestFor: ["虎扑评分", "community sentiment", "post-game reaction", "Chinese fan discourse"],
    avoidWhen: ["data must be represented as live Hupu data but has not been fetched"],
    requiredData: ["topic", "subject", "score", "voters", "distribution", "comments"],
    agentSelection: "Choose for Chinese-community rating or hot-comment beats. Label as mock/template unless real Hupu data is fetched.",
  },
  {
    id: "hupu-official-lite-rating",
    name: "Hupu Official-Lite Rating",
    output: "hupu-official-lite-rating.html",
    description: "Closer to the accessible Hupu mobile score page: title, item, score, JRs rating, immediate rating button, percentages, open app/share footer.",
    bestFor: ["官网简版虎扑评分", "single player/item score", "mobile web rating card"],
    avoidWhen: ["need full in-app ranking or hot comments"],
    requiredData: ["category", "title", "subtitle", "score", "voters", "distribution"],
    agentSelection: "Choose when matching the public Hupu mobile score page is more important than showing a richer app-like ranking board.",
  },
  {
    id: "social-post-deck",
    name: "Broadcast Social Post Deck",
    output: "social-post-deck.html",
    description: "Broadcast-friendly social quote cards, less realistic than the mobile feed but useful as lower-third inserts.",
    bestFor: ["lower-third quote", "official account post", "reporter quote"],
    avoidWhen: ["the scene specifically asks for phone scrolling"],
    requiredData: ["displayName", "handle", "body"],
    agentSelection: "Choose only when a broadcast package needs clean social quotes, not when simulating a real app.",
  },
  {
    id: "fan-comment-wall",
    name: "Fan Comment Wall",
    output: "fan-comment-wall.html",
    description: "Stacked fan comments for fast community reaction beats.",
    bestFor: ["comment section", "debate montage", "fan sentiment"],
    avoidWhen: ["need platform-specific UI"],
    requiredData: ["user", "comment body", "sentiment"],
    agentSelection: "Choose for generic comments; prefer X Mobile Social Feed or Hupu Mobile Rating for platform-specific scenes.",
  },
  {
    id: "sticker-tape",
    name: "Sticker Tape",
    output: "sticker-tape.html",
    description: "Short punchy stickers for meme labels and motion accents.",
    bestFor: ["hot take", "key label", "meme overlay", "transition accent"],
    avoidWhen: ["needs long copy"],
    requiredData: ["short labels"],
    agentSelection: "Choose as a supporting overlay, not as a full scene.",
  },
  {
    id: "producer-rundown",
    name: "Producer Rundown",
    output: "producer-rundown.html",
    description: "Broadcast producer cue list for behind-the-scenes or show-control visuals.",
    bestFor: ["rundown", "editorial planning", "show package", "meta transition"],
    avoidWhen: ["viewer should stay inside the game story"],
    requiredData: ["timecode", "title", "status", "source"],
    agentSelection: "Choose when the script intentionally references production flow or a control-room aesthetic.",
  },
];

const pages: Array<{definition: TemplateDefinition; html: string; width?: string}> = [
  {definition: templateDefinitions[0], html: renderMobileSocialFeed(mobileFeed), width: "520px"},
  {definition: templateDefinitions[1], html: renderHupuMobileRating(hupuRating), width: "520px"},
  {definition: templateDefinitions[2], html: renderHupuOfficialLiteRating(hupuOfficialLiteRating), width: "520px"},
  {definition: templateDefinitions[3], html: renderSocialPostDeck(posts), width: "760px"},
  {definition: templateDefinitions[4], html: renderFanCommentWall(comments), width: "680px"},
  {definition: templateDefinitions[5], html: renderStickerTape(stickers), width: "900px"},
  {definition: templateDefinitions[6], html: renderProducerRundown(rundown), width: "720px"},
];

const writeText = async (relativePath: string, content: string): Promise<void> => {
  const outputPath = path.resolve(process.cwd(), relativePath);
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, content, "utf8");
};

const main = async (): Promise<void> => {
  await writeText(
    "templates/index.html",
    renderTemplateGallery({
      title: "NBA Social Overlay Templates",
      theme,
      posts,
      mobileFeed,
      comments,
      ratings,
      stickers,
      rundown,
    }),
  );

  for (const page of pages) {
    await writeText(
      path.join("templates", page.definition.output),
      renderStandaloneTemplatePage({
        title: page.definition.name,
        theme,
        body: page.html,
        width: page.width,
      }),
    );
  }

  await writeText("templates/manifest.json", `${JSON.stringify(templateDefinitions, null, 2)}\n`);
  process.stdout.write(`Generated ${pages.length} standalone social overlay templates\n`);
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
