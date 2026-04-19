import {MatchupPreviewData} from "../../types/matchup";

export const celticsSixersPreview: MatchupPreviewData = {
  id: "celtics-sixers-2026-r1-g1",
  title: "凯尔特人 vs 76人",
  subtitle: "2026 年东部首轮前瞻",
  contextLabel: "东部首轮",
  schedule: {
    game: "G1",
    date: "2026 年 4 月 19 日",
    tipoff: "美东 13:00",
    venue: "TD Garden",
    matchup: "波士顿 2 号种子 vs 费城 7 号种子",
    seasonSeries: "常规赛交手 2 比 2 打平",
  },
  teams: {
    home: {
      teamId: "bos",
      city: "波士顿",
      name: "凯尔特人",
      shortName: "凯尔特人",
      seed: 2,
    },
    away: {
      teamId: "phi",
      city: "费城",
      name: "76人",
      shortName: "76人",
      seed: 7,
    },
  },
  pulse: [
    {
      text: "波士顿带着主场优势进入系列赛，攻防两端的基本盘也更扎实。",
      teamId: "bos",
    },
    {
      text: "费城在 4 月 15 日附加赛击败魔术，锁定东部第 7。",
      teamId: "phi",
    },
    {
      text: "NBA 官方系列赛前瞻把凯尔特人定义为体系更完整、轮换更深的一方。",
      teamId: "bos",
    },
    {
      text: "76 人真正的变量在于恩比德不满血时，马克西和乔治能否把比赛持续拖进轮转对抗。",
      teamId: "phi",
    },
  ],
  playerCards: [
    {
      name: "杰森·塔图姆",
      teamId: "bos",
      image: "assets/players/tatum.png",
      badge: "波士顿引擎",
      stat: "25 分 • 18 板 • 11 助",
      note: "4 月 1 日客战热火拿下赛季首次三双，说明他进入季后赛时状态完整。",
      sourceLabel: "NBA 球员页 / NBA 官方 X，2026-04-02",
    },
    {
      name: "杰伦·布朗",
      teamId: "bos",
      image: "assets/players/brown.png",
      badge: "持球爆点",
      stat: "43 分",
      note: "NBA 4 月 2 日官方社媒回顾里，布朗的 43 分是凯尔特人最近最响的一次得分爆发。",
      sourceLabel: "NBA 官方 X，2026-04-02",
    },
    {
      name: "泰瑞斯·马克西",
      teamId: "phi",
      image: "assets/players/maxey.png",
      badge: "第一爆点",
      stat: "28.3 分 • 6.6 助",
      note: "官方附加赛报道把马克西定义成费城进入这轮系列赛时最主要的外线持球得分点。",
      sourceLabel: "NBA 附加赛直播更新，2026-04-15",
    },
    {
      name: "保罗·乔治",
      teamId: "phi",
      image: "assets/players/george.png",
      badge: "第二发起点",
      stat: "21.0 分 • 7.4 板 • 4.3 助",
      note: "复出后的最后 7 场常规赛，乔治交出了这组数据，说明他是系列赛节奏能否撑住的关键。",
      sourceLabel: "2026 NBA 季后赛系列赛前瞻：凯尔特人 vs 76人",
    },
  ],
  matchupEdges: [
    {
      eyebrow: "波士顿优势",
      headline: "体系底盘更厚",
      body: "NBA 官方前瞻明确指出，凯尔特人在攻防质量、轮换深度和冠军经验上都占据更清晰的结构性优势。",
      teamId: "bos",
    },
    {
      eyebrow: "费城路径",
      headline: "靠持球点开窗",
      body: "同一篇前瞻认为，76 人想咬住比赛，关键还是外线持球创造，尤其是马克西能不能把波士顿防线调动起来。",
      teamId: "phi",
    },
    {
      eyebrow: "伤病观察",
      headline: "恩比德阴影仍在",
      body: "费城 4 月 10 日官方伤病报告里，恩比德仍挂着右膝手术和阑尾手术相关状态，这直接影响系列赛上限。",
      teamId: "phi",
    },
  ],
  socialBuzz: [
    {
      handle: "@NBA",
      date: "4 月 2 日",
      text: "布朗 43 分和塔图姆赛季首个三双之后，外界对凯尔特人状态的讨论明显升温。",
      teamId: "bos",
    },
    {
      handle: "@NBA",
      date: "4 月 16 日",
      text: "76 人拿下附加赛、锁定东部第 7 后，联盟范围内的季后赛话题也迅速转向费城。",
      teamId: "phi",
    },
    {
      handle: "@celtics_stats",
      date: "3 月 18 日",
      text: "凯尔特人侧的一个高频话题是布朗在季后赛前冲进了队史得分榜前十。",
      teamId: "bos",
    },
  ],
  sourceSlate: {
    title: "信息校准",
    body: "这支片子里的分析基于 NBA 官方报道、官方伤病报告和公开社媒信息，不是凭空编的对位故事。",
  },
  voiceover: {
    script:
      "东部首轮第一战，凯尔特人坐镇主场，对上通过附加赛突围的七十六人。波士顿的优势，在于更完整的攻防体系、更深的轮换厚度，以及更稳定的双核输出。费城想制造悬念，就必须让马克西和保罗乔治持续打破第一道防线。至于恩比德的健康状态，依旧是这轮系列赛最大的变量。",
    audioSrc: "audio/celtics-sixers-zh-tts.mp3",
    voice: "zh-CN-YunyangNeural",
  },
  closingNote:
    "这次只是一个模板样例，后面继续换对阵、换主题和换比例时，仍然可以沿用同一套数据驱动的视频系统。",
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
