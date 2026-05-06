import {mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {celticsSixersPreview} from "../src/data/matchups/celtics-sixers";
import {getTeamTheme} from "../src/themes/teams";
import {MatchupPreviewData, PlayerCard, TeamId} from "../src/types/matchup";

const WIDTH = 1920;
const HEIGHT = 1080;
const TOTAL_DURATION = 52;
const ASSET_PREFIX = "public/";

const data = celticsSixersPreview;
const homeTheme = getTeamTheme(data.teams.home.teamId);
const awayTheme = getTeamTheme(data.teams.away.teamId);

const scenes = [
  {id: "cold-open", start: 0, duration: 7},
  {id: "matchup-board", start: 7, duration: 10},
  {id: "star-duel", start: 17, duration: 13},
  {id: "three-keys", start: 30, duration: 14},
  {id: "verdict", start: 44, duration: 8},
] as const;

type KeyMeter = {
  number: string;
  label: string;
  title: string;
  detail: string;
  teamId?: TeamId;
  value: number;
  sourceLabel?: string;
};

const escapeHtml = (value: string): string => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

const assetSrc = (relativePath: string): string => `${ASSET_PREFIX}${relativePath}`;

const teamColor = (teamId?: TeamId): string => {
  if (!teamId) {
    return "rgba(255,255,255,0.55)";
  }

  return teamId === homeTheme.teamId
    ? homeTheme.colors.primary
    : awayTheme.colors.primary;
};

const sourceChip = (label?: string): string => {
  if (!label) {
    return "";
  }

  return `<span class="source-chip">SOURCE · ${escapeHtml(label)}</span>`;
};

const scoreBug = (): string => `
  <div class="score-bug">
    <div class="bug-team home">
      <img src="${assetSrc(homeTheme.assets.logo)}" alt="${escapeHtml(data.teams.home.shortName)}" />
      <span>${escapeHtml(data.teams.home.shortName)}</span>
      <strong>${data.teams.home.seed}</strong>
    </div>
    <div class="bug-center">
      <span>${escapeHtml(data.contextLabel)}</span>
      <strong>${escapeHtml(data.schedule.game)}</strong>
    </div>
    <div class="bug-team away">
      <strong>${data.teams.away.seed}</strong>
      <span>${escapeHtml(data.teams.away.shortName)}</span>
      <img src="${assetSrc(awayTheme.assets.logo)}" alt="${escapeHtml(data.teams.away.shortName)}" />
    </div>
  </div>
`;

const findPlayer = (namePart: string): PlayerCard => {
  const player = data.playerCards.find((card) => card.name.includes(namePart));

  if (!player) {
    return data.playerCards[0];
  }

  return player;
};

const playerPortrait = (player: PlayerCard, className: string): string => `
  <figure class="${className}" style="--team-color: ${teamColor(player.teamId)}; --portrait-url: url('${assetSrc(escapeHtml(player.image))}')">
    <div class="portrait-bg" aria-label="${escapeHtml(player.name)}"></div>
    <figcaption>
      <span>${escapeHtml(player.badge)}</span>
      <strong>${escapeHtml(player.name)}</strong>
    </figcaption>
  </figure>
`;

const renderBracketStrip = (preview: MatchupPreviewData): string => {
  return (
    preview.playoffPanorama?.series
      .slice(0, 4)
      .map((series) => {
        const focusClass =
          series.slot === preview.playoffPanorama?.focusSeriesSlot
            ? " is-focus"
            : "";

        return `
          <article class="bracket-tile${focusClass}">
            <div class="tile-top">
              <span>${escapeHtml(series.slot)}</span>
              <strong>${escapeHtml(series.status)}</strong>
            </div>
            <div class="seed-line">
              <b>${series.topTeam.seed}</b>
              <span>${escapeHtml(series.topTeam.label)}</span>
              <strong>${series.topTeam.wins}</strong>
            </div>
            <div class="seed-line">
              <b>${series.bottomTeam.seed}</b>
              <span>${escapeHtml(series.bottomTeam.label)}</span>
              <strong>${series.bottomTeam.wins}</strong>
            </div>
          </article>
        `;
      })
      .join("") ?? ""
  );
};

const renderDuelCard = (player: PlayerCard, index: number): string => `
  <article class="duel-card" style="--team-color: ${teamColor(player.teamId)}">
    <div class="duel-index">0${index + 1}</div>
    <img src="${assetSrc(escapeHtml(player.image))}" alt="${escapeHtml(player.name)}" />
    <div class="duel-copy">
      <span>${escapeHtml(player.badge)}</span>
      <h3>${escapeHtml(player.name)}</h3>
      <strong>${escapeHtml(player.stat)}</strong>
      <p>${escapeHtml(player.note)}</p>
      ${sourceChip(player.sourceLabel)}
    </div>
  </article>
`;

const keyMeters: KeyMeter[] = [
  {
    number: "01",
    label: "第一拍",
    title: data.tacticalKeys?.[0]?.title ?? "先点掉谁的第一拍",
    detail:
      "费城必须让马克西或乔治先逼出协防，否则波士顿的整体轮转会把回合变成低质量单打。",
    teamId: "phi",
    value: 66,
    sourceLabel: data.tacticalKeys?.[0]?.sourceLabel,
  },
  {
    number: "02",
    label: "完整性",
    title: data.matchupEdges[0]?.headline ?? "五人链路更完整",
    detail:
      "波士顿优势在双侧翼、深轮换和攻守底盘。问题不是能不能得分，而是能不能连续惩罚费城每次失位。",
    teamId: "bos",
    value: 82,
    sourceLabel: data.styleProfiles?.[0]?.sourceLabel,
  },
  {
    number: "03",
    label: "上限变量",
    title: data.tacticalKeys?.[2]?.title ?? "恩比德决定费城上限",
    detail:
      "中轴稳定时，76 人是多层决策；中轴虚弱时，比赛会被压回外线爆点和高难度终结。",
    teamId: "phi",
    value: 58,
    sourceLabel: data.tacticalKeys?.[2]?.sourceLabel,
  },
];

const renderKeyMeters = (): string =>
  keyMeters
    .map(
      (key) => `
        <article class="key-meter" style="--team-color: ${teamColor(key.teamId)}; --meter: ${key.value}%">
          <div class="key-number">${escapeHtml(key.number)}</div>
          <div class="key-copy">
            <span>${escapeHtml(key.label)}</span>
            <h3>${escapeHtml(key.title)}</h3>
            <p>${escapeHtml(key.detail)}</p>
            ${sourceChip(key.sourceLabel)}
          </div>
          <div class="meter-track"><div class="meter-fill"></div></div>
        </article>
      `,
    )
    .join("");

const tatum = findPlayer("塔图姆");
const brown = findPlayer("布朗");
const maxey = findPlayer("马克西");
const george = findPlayer("乔治");

const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${WIDTH}, height=${HEIGHT}" />
    <link rel="icon" href="${assetSrc("assets/nba-logo.svg")}" type="image/svg+xml" />
    <title>${escapeHtml(data.title)}</title>
    <script src="${assetSrc("vendor/gsap.min.js")}"></script>
    <style>
      :root {
        --home: ${homeTheme.colors.primary};
        --home-gold: ${homeTheme.colors.secondary};
        --away: ${awayTheme.colors.primary};
        --away-red: ${awayTheme.colors.secondary};
        --cream: #fff3d0;
        --paper: #f8f1df;
        --ink: #05070a;
        --glass: rgba(8, 10, 13, 0.68);
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        overflow: hidden;
        color: var(--paper);
        font-family: system-ui, sans-serif;
        background: #020403;
      }

      #root {
        position: relative;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        overflow: hidden;
        isolation: isolate;
        background:
          radial-gradient(circle at 18% 18%, rgba(0,122,51,0.64), transparent 34%),
          radial-gradient(circle at 82% 28%, rgba(0,107,182,0.62), transparent 36%),
          linear-gradient(115deg, rgba(3,5,6,0.92), rgba(4,9,16,0.72)),
          url("${assetSrc("assets/court.jpg")}") center / cover;
      }

      #root::before,
      #root::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: -1;
      }

      #root::before {
        background:
          linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 96px),
          linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 96px);
        mask-image: linear-gradient(90deg, transparent, black 18%, black 82%, transparent);
      }

      #root::after {
        background:
          linear-gradient(90deg, rgba(0,0,0,0.58), transparent 34%, rgba(0,0,0,0.62)),
          radial-gradient(circle at 50% 110%, rgba(255,225,153,0.22), transparent 42%);
      }

      h1,
      h2,
      h3,
      p,
      figure {
        margin: 0;
      }

      .scene {
        position: absolute;
        inset: 0;
        padding: 74px 88px;
        opacity: 0;
      }

      .broadcast-frame {
        position: absolute;
        inset: 28px;
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: inset 0 0 0 1px rgba(255,225,153,0.1);
        pointer-events: none;
      }

      .broadcast-frame::before,
      .broadcast-frame::after {
        content: "";
        position: absolute;
        width: 210px;
        height: 10px;
        background: linear-gradient(90deg, var(--home-gold), transparent);
      }

      .broadcast-frame::before {
        top: -1px;
        left: -1px;
      }

      .broadcast-frame::after {
        right: -1px;
        bottom: -1px;
        transform: rotate(180deg);
      }

      .kicker,
      .source-chip,
      .tile-top,
      .meta-label {
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }

      .kicker {
        display: inline-flex;
        align-items: center;
        gap: 14px;
        color: #ffe199;
        font-size: 25px;
        font-weight: 1000;
      }

      .kicker::before {
        content: "";
        width: 54px;
        height: 5px;
        background: currentColor;
      }

      .source-chip {
        display: inline-flex;
        width: fit-content;
        margin-top: 18px;
        padding: 9px 13px;
        border: 1px solid rgba(255,225,153,0.45);
        background: rgba(255,225,153,0.12);
        color: #ffe199;
        font-size: 13px;
        font-weight: 900;
      }

      .score-bug {
        position: absolute;
        top: 42px;
        left: 50%;
        z-index: 10;
        display: grid;
        grid-template-columns: 1fr 164px 1fr;
        min-width: 950px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 999px;
        background: rgba(2,4,6,0.76);
        box-shadow: 0 22px 70px rgba(0,0,0,0.38);
      }

      .bug-team,
      .bug-center {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        min-height: 70px;
        padding: 0 28px;
        font-size: 27px;
        font-weight: 1000;
      }

      .bug-team img {
        width: 44px;
        height: 44px;
        object-fit: contain;
      }

      .bug-team strong {
        color: #ffe199;
        font-size: 34px;
      }

      .bug-center {
        display: grid;
        gap: 2px;
        background: #ffe199;
        color: var(--ink);
        text-align: center;
      }

      .bug-center span {
        font-size: 14px;
        letter-spacing: 0.16em;
      }

      .bug-center strong {
        font-size: 29px;
      }

      .cold-grid {
        display: grid;
        grid-template-columns: 430px 1fr 430px;
        align-items: end;
        height: 100%;
        gap: 44px;
        padding-top: 72px;
      }

      .cold-copy {
        align-self: center;
        text-align: center;
      }

      .cold-copy h1 {
        margin-top: 24px;
        font-family: system-ui, sans-serif;
        font-size: 156px;
        font-weight: 1000;
        line-height: 0.86;
        letter-spacing: -0.06em;
        text-transform: uppercase;
        text-shadow: 0 18px 70px rgba(0,0,0,0.45);
      }

      .cold-copy p {
        max-width: 820px;
        margin: 30px auto 0;
        color: rgba(255,243,208,0.92);
        font-size: 38px;
        font-weight: 800;
        line-height: 1.26;
      }

      .cold-portrait {
        position: relative;
        min-height: 820px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.2);
        background: linear-gradient(160deg, var(--team-color), rgba(0,0,0,0.34) 62%);
        box-shadow: 0 36px 100px rgba(0,0,0,0.44);
      }

      .cold-portrait.left {
        clip-path: polygon(0 0, 100% 8%, 88% 100%, 0% 100%);
      }

      .cold-portrait.right {
        clip-path: polygon(12% 8%, 100% 0, 100% 100%, 0 100%);
      }

      .portrait-bg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: var(--portrait-url) center top / cover no-repeat;
        filter: saturate(1.18) contrast(1.1);
      }

      .cold-portrait::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 34%, rgba(0,0,0,0.84));
      }

      .cold-portrait figcaption {
        position: absolute;
        right: 26px;
        bottom: 28px;
        left: 26px;
        z-index: 1;
      }

      .cold-portrait span,
      .duel-copy span,
      .key-copy span,
      .meta-label {
        color: #ffe199;
        font-size: 20px;
        font-weight: 1000;
      }

      .cold-portrait strong {
        display: block;
        margin-top: 8px;
        font-size: 44px;
        line-height: 1;
      }

      .board-grid {
        display: grid;
        grid-template-columns: 0.78fr 1.22fr;
        align-items: end;
        height: 100%;
        gap: 54px;
        padding-top: 76px;
      }

      .board-copy h2,
      .duel-header h2,
      .keys-header h2,
      .verdict-copy h2 {
        margin-top: 18px;
        font-family: system-ui, sans-serif;
        font-size: 104px;
        font-weight: 1000;
        line-height: 0.92;
        letter-spacing: -0.04em;
      }

      .board-copy p,
      .keys-header p,
      .verdict-copy p {
        margin-top: 28px;
        color: rgba(255,243,208,0.88);
        font-size: 34px;
        font-weight: 800;
        line-height: 1.28;
      }

      .meta-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
        margin-top: 34px;
      }

      .meta-card {
        min-height: 142px;
        padding: 22px;
        border: 1px solid rgba(255,255,255,0.2);
        background: var(--glass);
      }

      .meta-card strong {
        display: block;
        margin-top: 14px;
        font-size: 30px;
        line-height: 1.1;
      }

      .bracket-strip {
        display: grid;
        gap: 18px;
      }

      .bracket-tile {
        padding: 22px;
        border: 1px solid rgba(255,255,255,0.18);
        background: rgba(255,255,255,0.1);
        box-shadow: 0 22px 70px rgba(0,0,0,0.24);
      }

      .bracket-tile.is-focus {
        border-color: #ffe199;
        background: linear-gradient(90deg, rgba(0,122,51,0.62), rgba(0,107,182,0.42));
      }

      .tile-top {
        display: flex;
        justify-content: space-between;
        color: #ffe199;
        font-size: 17px;
        font-weight: 1000;
      }

      .seed-line {
        display: grid;
        grid-template-columns: 40px 1fr 44px;
        align-items: center;
        gap: 14px;
        margin-top: 12px;
        font-size: 29px;
        font-weight: 1000;
      }

      .seed-line b {
        display: grid;
        place-items: center;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: rgba(255,225,153,0.18);
        color: #ffe199;
        font-size: 18px;
      }

      .seed-line strong {
        justify-self: end;
      }

      .duel-layout {
        display: grid;
        grid-template-rows: auto 1fr;
        height: 100%;
        gap: 32px;
        padding-top: 66px;
      }

      .duel-header {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 42px;
      }

      .duel-header p {
        max-width: 650px;
        color: rgba(255,243,208,0.84);
        font-size: 30px;
        font-weight: 800;
        line-height: 1.3;
      }

      .duel-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }

      .duel-card {
        position: relative;
        min-height: 680px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.18);
        background: linear-gradient(160deg, var(--team-color), rgba(0,0,0,0.32) 58%);
      }

      .duel-card img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        filter: saturate(1.1) contrast(1.08);
      }

      .duel-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.88)),
          linear-gradient(90deg, rgba(0,0,0,0.48), transparent);
      }

      .duel-index {
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 2;
        color: rgba(255,243,208,0.24);
        font-family: system-ui, sans-serif;
        font-size: 92px;
        line-height: 1;
      }

      .duel-copy {
        position: absolute;
        right: 22px;
        bottom: 22px;
        left: 22px;
        z-index: 2;
      }

      .duel-copy h3 {
        margin-top: 8px;
        font-size: 43px;
        line-height: 1.02;
      }

      .duel-copy strong {
        display: block;
        margin-top: 12px;
        color: #ffe199;
        font-size: 27px;
      }

      .duel-copy p {
        margin-top: 15px;
        display: -webkit-box;
        overflow: hidden;
        color: rgba(255,243,208,0.86);
        font-size: 22px;
        font-weight: 700;
        line-height: 1.3;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .keys-layout {
        display: grid;
        grid-template-columns: 0.72fr 1.28fr;
        align-items: end;
        height: 100%;
        gap: 48px;
        padding-top: 78px;
      }

      .keys-stack {
        display: grid;
        gap: 18px;
      }

      .key-meter {
        display: grid;
        grid-template-columns: 118px 1fr 270px;
        align-items: center;
        gap: 24px;
        min-height: 176px;
        padding: 24px;
        border: 1px solid rgba(255,255,255,0.18);
        background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(0,0,0,0.38));
        box-shadow: 0 22px 70px rgba(0,0,0,0.24);
      }

      .key-number {
        color: rgba(255,243,208,0.24);
        font-family: system-ui, sans-serif;
        font-size: 96px;
        line-height: 1;
      }

      .key-copy h3 {
        margin-top: 7px;
        font-size: 39px;
        line-height: 1.06;
      }

      .key-copy p {
        margin-top: 10px;
        color: rgba(255,243,208,0.86);
        font-size: 22px;
        font-weight: 700;
        line-height: 1.32;
      }

      .meter-track {
        position: relative;
        height: 18px;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.24);
        background: rgba(255,255,255,0.12);
      }

      .meter-track::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
      }

      .meter-fill {
        width: 0;
        height: 100%;
        background: linear-gradient(90deg, var(--team-color), #ffe199);
        box-shadow: 0 0 24px var(--team-color);
      }

      .verdict-layout {
        display: grid;
        grid-template-columns: 1fr 0.86fr;
        align-items: end;
        height: 100%;
        gap: 54px;
        padding-top: 82px;
      }

      .verdict-copy h2 {
        max-width: 1050px;
        font-size: 118px;
      }

      .verdict-copy p {
        max-width: 950px;
        font-size: 38px;
      }

      .cta-card {
        padding: 36px;
        border: 1px solid rgba(255,225,153,0.48);
        background:
          linear-gradient(145deg, rgba(255,225,153,0.18), rgba(255,255,255,0.08)),
          rgba(0,0,0,0.58);
        box-shadow: 0 36px 100px rgba(0,0,0,0.36);
      }

      .cta-card span {
        color: #ffe199;
        font-size: 24px;
        font-weight: 1000;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }

      .cta-card strong {
        display: block;
        margin-top: 18px;
        font-family: system-ui, sans-serif;
        font-size: 88px;
        line-height: 0.94;
      }

      .cta-card p {
        margin-top: 20px;
        color: rgba(255,243,208,0.86);
        font-size: 29px;
        font-weight: 800;
        line-height: 1.28;
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL_DURATION}" data-width="${WIDTH}" data-height="${HEIGHT}">
      <audio id="bg-music" data-start="0" data-duration="${TOTAL_DURATION}" data-track-index="0" data-volume="0.42" src="${assetSrc("audio/pulse.mp3")}" loop></audio>
      <audio id="voiceover-track" data-start="0" data-duration="${TOTAL_DURATION}" data-track-index="1" data-volume="1" src="${assetSrc(data.voiceover?.audioSrc ?? "")}"></audio>

      <div class="broadcast-frame"></div>
      ${scoreBug()}

      <section id="cold-open" class="scene">
        <div class="cold-grid">
          ${playerPortrait(tatum, "cold-portrait left")}
          <div class="cold-copy">
            <div class="kicker">前 7 秒只看一个问题</div>
            <h1>BOSTON<br />CAN'T COAST</h1>
            <p>波士顿更完整，但费城只要打穿第一拍，这轮就不会像种子排名那么简单。</p>
            ${sourceChip(data.narrativeThreads?.[0]?.sourceLabel)}
          </div>
          ${playerPortrait(maxey, "cold-portrait right")}
        </div>
      </section>

      <section id="matchup-board" class="scene">
        <div class="board-grid">
          <div class="board-copy">
            <div class="kicker">${escapeHtml(data.contextLabel)} · ${escapeHtml(data.schedule.game)}</div>
            <h2>不是报赛程，是先定冲突</h2>
            <p>${escapeHtml(data.playoffPanorama?.overview ?? data.subtitle)}</p>
            <div class="meta-grid">
              <div class="meta-card">
                <div class="meta-label">Tipoff</div>
                <strong>${escapeHtml(data.schedule.date)} · ${escapeHtml(data.schedule.tipoff)}</strong>
              </div>
              <div class="meta-card">
                <div class="meta-label">Venue</div>
                <strong>${escapeHtml(data.schedule.venue)}</strong>
              </div>
              <div class="meta-card">
                <div class="meta-label">Seeds</div>
                <strong>${data.teams.home.seed} 号种子 vs ${data.teams.away.seed} 号种子</strong>
              </div>
              <div class="meta-card">
                <div class="meta-label">Season Series</div>
                <strong>${escapeHtml(data.schedule.seasonSeries ?? "待校准")}</strong>
              </div>
            </div>
            ${sourceChip(data.sources[0]?.label)}
          </div>
          <div class="bracket-strip">${renderBracketStrip(data)}</div>
        </div>
      </section>

      <section id="star-duel" class="scene">
        <div class="duel-layout">
          <div class="duel-header">
            <div>
              <div class="kicker">Star Duel</div>
              <h2>四个名字，但不是四段说明书</h2>
            </div>
            <p>球星卡只保留能被一眼读懂的冲突：波士顿双侧翼持续施压，费城双持球点制造波动。</p>
          </div>
          <div class="duel-grid">
            ${[tatum, brown, maxey, george].map(renderDuelCard).join("")}
          </div>
        </div>
      </section>

      <section id="three-keys" class="scene">
        <div class="keys-layout">
          <div class="keys-header">
            <div class="kicker">3 Keys</div>
            <h2>每一屏只讲一个胜负手</h2>
            <p>参考短视频节奏后，这里不再堆文字：第一拍、完整性、上限变量，三个点决定 G1 观感。</p>
            ${sourceChip(data.sourceSlate.title)}
          </div>
          <div class="keys-stack">${renderKeyMeters()}</div>
        </div>
      </section>

      <section id="verdict" class="scene">
        <div class="verdict-layout">
          <div class="verdict-copy">
            <div class="kicker">Verdict</div>
            <h2>如果费城开局打不乱第一层，波士顿会越打越稳。</h2>
            <p>真正悬念不是谁名气更大，而是 76 人能不能把一场爆点延长成七场系列赛的稳定方案。</p>
            ${sourceChip("NBA 官方系列页 / Play-In / 伤病报告")}
          </div>
          <div class="cta-card">
            <span>评论区问题</span>
            <strong>这轮会横扫，还是打到第六场？</strong>
            <p>选一个：波士顿体系碾过去，还是费城靠马克西和乔治把节奏拖乱。</p>
          </div>
        </div>
      </section>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const scenes = ${JSON.stringify(scenes)};

      tl.set(".scene", { opacity: 0, y: 28, scale: 0.985 }, 0);
      tl.from(".broadcast-frame", { opacity: 0, scaleX: 0.92, duration: 0.55, ease: "power2.out" }, 0);
      tl.set(".score-bug", { xPercent: -50 }, 0);
      tl.fromTo(".score-bug", { opacity: 0, y: -28, xPercent: -50 }, { opacity: 1, y: 0, xPercent: -50, duration: 0.45, ease: "power2.out" }, 0.15);

      scenes.forEach((scene) => {
        const selector = "#" + scene.id;
        tl.set(selector, { opacity: 0, y: 28, scale: 0.985 }, 0);
        tl.to(selector, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power2.out" }, scene.start);
        tl.to(selector, { opacity: 0, y: -22, scale: 1.01, duration: 0.34, ease: "power2.in" }, scene.start + scene.duration - 0.34);
      });

      tl.from("#cold-open .cold-copy .kicker, #cold-open h1, #cold-open p, #cold-open .source-chip", {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.46,
        ease: "power2.out"
      }, 0.25);
      tl.from("#cold-open .cold-portrait", { opacity: 0, y: 70, stagger: 0.09, duration: 0.55, ease: "power2.out" }, 0.28);
      tl.to("#cold-open .portrait-bg", { scale: 1.06, duration: 6.4, ease: "none" }, 0.4);
      tl.from("#matchup-board .meta-card, #matchup-board .bracket-tile", { opacity: 0, x: 36, stagger: 0.06, duration: 0.38, ease: "power2.out" }, 7.55);
      tl.from("#star-duel .duel-card", { opacity: 0, y: 60, stagger: 0.08, duration: 0.48, ease: "power2.out" }, 17.6);
      tl.to("#star-duel .duel-card img", { scale: 1.055, duration: 12.2, ease: "none" }, 17.8);
      tl.from("#three-keys .key-meter", { opacity: 0, x: 54, stagger: 0.13, duration: 0.42, ease: "power2.out" }, 30.65);
      tl.to("#three-keys .meter-fill", { width: function(index, target) { return target.closest(".key-meter").style.getPropertyValue("--meter"); }, stagger: 0.13, duration: 0.75, ease: "power2.out" }, 31.1);
      tl.from("#verdict .cta-card", { opacity: 0, y: 52, rotation: -1.4, duration: 0.55, ease: "power2.out" }, 44.55);
      tl.set({}, {}, ${TOTAL_DURATION});

      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;

const main = async (): Promise<void> => {
  const outputPath = path.resolve(process.cwd(), "index.html");
  await mkdir(path.dirname(outputPath), {recursive: true});
  await writeFile(outputPath, html, "utf8");
  process.stdout.write("Generated HyperFrames composition\n");
};

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
