import {mkdir, writeFile} from "node:fs/promises";
import path from "node:path";
import {celticsSixersPreview} from "../src/data/matchups/celtics-sixers";
import {getTeamTheme} from "../src/themes/teams";
import {MatchupPreviewData, TeamId} from "../src/types/matchup";

const WIDTH = 1920;
const HEIGHT = 1080;
const TOTAL_DURATION = 52;
const ASSET_PREFIX = "public/";

const data = celticsSixersPreview;
const homeTheme = getTeamTheme(data.teams.home.teamId);
const awayTheme = getTeamTheme(data.teams.away.teamId);

const scenes = [
  {id: "hero", start: 0, duration: 10},
  {id: "stakes", start: 10, duration: 12},
  {id: "players", start: 22, duration: 14},
  {id: "tactics", start: 36, duration: 10},
  {id: "closing", start: 46, duration: 6},
] as const;

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

const renderSeries = (preview: MatchupPreviewData): string => {
  return (
    preview.playoffPanorama?.series
      .slice(0, 4)
      .map((series) => {
        const focusClass =
          series.slot === preview.playoffPanorama?.focusSeriesSlot
            ? " is-focus"
            : "";

        return `
          <article class="series-tile${focusClass}">
            <div class="tile-label">${escapeHtml(series.slot)}</div>
            <div class="team-line"><span>${escapeHtml(series.topTeam.label)}</span><strong>${series.topTeam.wins}</strong></div>
            <div class="team-line"><span>${escapeHtml(series.bottomTeam.label)}</span><strong>${series.bottomTeam.wins}</strong></div>
          </article>
        `;
      })
      .join("") ?? ""
  );
};

const renderPlayerCards = (preview: MatchupPreviewData): string => {
  return preview.playerCards
    .map(
      (card) => `
        <article class="player-card" style="--team-color: ${teamColor(card.teamId)}">
          <img src="${assetSrc(escapeHtml(card.image))}" alt="${escapeHtml(card.name)}" />
          <div class="player-copy">
            <div class="kicker">${escapeHtml(card.badge)}</div>
            <h3>${escapeHtml(card.name)}</h3>
            <strong>${escapeHtml(card.stat)}</strong>
          </div>
        </article>
      `,
    )
    .join("");
};

const renderEdges = (preview: MatchupPreviewData): string => {
  return preview.matchupEdges
    .map(
      (edge) => `
        <article class="edge-card" style="--team-color: ${teamColor(edge.teamId)}">
          <span>${escapeHtml(edge.eyebrow)}</span>
          <h3>${escapeHtml(edge.headline)}</h3>
          <p>${escapeHtml(edge.body)}</p>
        </article>
      `,
    )
    .join("");
};

const renderTacticalKeys = (preview: MatchupPreviewData): string => {
  return (
    preview.tacticalKeys
      ?.slice(0, 3)
      .map(
        (key) => `
          <article class="key-row">
            <span>${escapeHtml(key.title)}</span>
            <p>${escapeHtml(key.detail)}</p>
          </article>
        `,
      )
      .join("") ?? ""
  );
};

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
        --paper: #fff7e5;
        --ink: #07090c;
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
        font-family: "Inter", "Noto Sans JP", sans-serif;
        background: #07120c;
      }

      #root {
        position: relative;
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        overflow: hidden;
        background:
          linear-gradient(90deg, rgba(0,122,51,0.88), rgba(0,107,182,0.82)),
          url("${assetSrc("assets/court.jpg")}") center / cover;
      }

      #root::before {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(90deg, rgba(5,8,10,0.18), rgba(5,8,10,0.68)),
          repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 86px);
        mix-blend-mode: multiply;
        pointer-events: none;
      }

      .scene {
        position: absolute;
        inset: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        padding: 72px 88px;
        opacity: 0;
        transform: translateY(28px);
      }

      .scene.full {
        grid-template-columns: 1fr;
      }

      .kicker {
        color: #ffe199;
        font-size: 25px;
        font-weight: 900;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }

      h1,
      h2,
      h3,
      p {
        margin: 0;
      }

      h1 {
        margin-top: 22px;
        font-size: 120px;
        line-height: 0.96;
        max-width: 960px;
        text-transform: uppercase;
      }

      h2 {
        margin-top: 16px;
        font-size: 74px;
        line-height: 1.02;
        max-width: 980px;
      }

      .lead {
        margin-top: 28px;
        max-width: 820px;
        font-size: 34px;
        line-height: 1.36;
        color: rgba(255,247,229,0.88);
      }

      .panel {
        align-self: stretch;
        border: 1px solid rgba(255,255,255,0.22);
        background: rgba(7,9,12,0.58);
        backdrop-filter: blur(16px);
        border-radius: 8px;
        padding: 36px;
        box-shadow: 0 34px 90px rgba(0,0,0,0.34);
      }

      .scoreboard {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 22px;
        align-items: stretch;
        margin-top: 48px;
      }

      .team-block {
        min-height: 230px;
        padding: 28px;
        border-radius: 8px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.22);
      }

      .team-block img {
        width: 96px;
        height: 96px;
        object-fit: contain;
      }

      .team-block strong {
        display: block;
        margin-top: 22px;
        font-size: 46px;
      }

      .vs {
        align-self: center;
        font-size: 76px;
        font-weight: 1000;
        color: #ffe199;
      }

      .series-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .series-tile,
      .edge-card,
      .key-row {
        padding: 26px;
        border-radius: 8px;
        background: rgba(255,247,229,0.12);
        border: 1px solid rgba(255,247,229,0.24);
      }

      .series-tile.is-focus {
        background: rgba(255,225,153,0.22);
        border-color: #ffe199;
      }

      .tile-label,
      .edge-card span,
      .key-row span {
        color: #ffe199;
        font-size: 22px;
        font-weight: 900;
        text-transform: uppercase;
      }

      .team-line {
        display: flex;
        justify-content: space-between;
        margin-top: 14px;
        font-size: 32px;
        font-weight: 800;
      }

      .players-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 22px;
        align-items: stretch;
      }

      .player-card {
        position: relative;
        min-height: 720px;
        overflow: hidden;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.2);
        background: linear-gradient(160deg, var(--team-color), rgba(5,8,10,0.3) 58%);
      }

      .player-card img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        filter: saturate(1.08) contrast(1.08);
      }

      .player-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.82));
      }

      .player-copy {
        position: absolute;
        inset: auto 20px 22px;
        z-index: 1;
      }

      .player-copy h3 {
        margin-top: 10px;
        font-size: 36px;
        line-height: 1.05;
      }

      .player-copy strong {
        display: block;
        margin-top: 12px;
        color: #ffe199;
        font-size: 22px;
      }

      .edge-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        align-self: end;
      }

      .edge-card {
        min-height: 300px;
        border-top: 8px solid var(--team-color);
      }

      .edge-card h3 {
        margin-top: 18px;
        font-size: 42px;
        line-height: 1.06;
      }

      .edge-card p,
      .key-row p {
        margin-top: 18px;
        font-size: 25px;
        line-height: 1.38;
        color: rgba(255,247,229,0.86);
      }

      .keys {
        display: grid;
        gap: 22px;
      }

      .key-row {
        display: grid;
        grid-template-columns: 360px 1fr;
        gap: 24px;
        align-items: start;
      }

      .closing-copy {
        align-self: end;
        max-width: 1200px;
      }

      .closing-copy h2 {
        font-size: 86px;
      }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL_DURATION}" data-width="${WIDTH}" data-height="${HEIGHT}">
      <audio id="bg-music" data-start="0" data-duration="${TOTAL_DURATION}" data-track-index="0" data-volume="0.42" src="${assetSrc("audio/pulse.mp3")}" loop></audio>
      <audio id="voiceover-track" data-start="0" data-duration="${TOTAL_DURATION}" data-track-index="1" data-volume="1" src="${assetSrc(data.voiceover?.audioSrc ?? "")}"></audio>

      <section id="hero" class="scene">
        <div>
          <div class="kicker">${escapeHtml(data.contextLabel)} · ${escapeHtml(data.schedule.game)}</div>
          <h1>${escapeHtml(data.teams.home.shortName)}<br />${escapeHtml(data.teams.away.shortName)}</h1>
          <p class="lead">${escapeHtml(data.playoffPanorama?.overview ?? data.subtitle)}</p>
          <div class="scoreboard">
            <div class="team-block">
              <img src="${assetSrc(homeTheme.assets.logo)}" alt="${escapeHtml(data.teams.home.shortName)}" />
              <strong>${escapeHtml(data.teams.home.city)}</strong>
              <p class="lead" style="font-size: 26px;">${data.teams.home.seed} 号种子 · ${escapeHtml(data.schedule.venue)}</p>
            </div>
            <div class="vs">VS</div>
            <div class="team-block">
              <img src="${assetSrc(awayTheme.assets.logo)}" alt="${escapeHtml(data.teams.away.shortName)}" />
              <strong>${escapeHtml(data.teams.away.city)}</strong>
              <p class="lead" style="font-size: 26px;">${data.teams.away.seed} 号种子 · ${escapeHtml(data.schedule.tipoff)}</p>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="series-grid">${renderSeries(data)}</div>
        </div>
      </section>

      <section id="stakes" class="scene">
        <div>
          <div class="kicker">Series Stakes</div>
          <h2>${escapeHtml(data.narrativeThreads?.[0]?.title ?? "附加赛冲出后的第一块硬墙")}</h2>
          <p class="lead">${escapeHtml(data.narrativeThreads?.[0]?.summary ?? data.pulse[0]?.text ?? "")}</p>
        </div>
        <div class="panel">
          <div class="edge-grid">${renderEdges(data)}</div>
        </div>
      </section>

      <section id="players" class="scene full">
        <div>
          <div class="kicker">Primary Engines</div>
          <h2>四个名字决定系列赛温度</h2>
        </div>
        <div class="players-grid">${renderPlayerCards(data)}</div>
      </section>

      <section id="tactics" class="scene">
        <div>
          <div class="kicker">Tactical Board</div>
          <h2>第一拍之后，谁还能继续推进</h2>
          <p class="lead">${escapeHtml(data.styleProfiles?.[1]?.offense ?? "")}</p>
        </div>
        <div class="panel keys">${renderTacticalKeys(data)}</div>
      </section>

      <section id="closing" class="scene full">
        <div class="closing-copy">
          <div class="kicker">${escapeHtml(data.sourceSlate.title)}</div>
          <h2>${escapeHtml(data.closingNote)}</h2>
          <p class="lead">${escapeHtml(data.sourceSlate.body)}</p>
        </div>
      </section>
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const scenes = ${JSON.stringify(scenes)};

      scenes.forEach((scene) => {
        const selector = "#" + scene.id;
        tl.set(selector, { opacity: 0, y: 28 }, 0);
        tl.to(selector, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, scene.start);
        tl.to(selector + " .kicker, " + selector + " h1, " + selector + " h2, " + selector + " .lead", {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.48,
          ease: "power2.out"
        }, scene.start + 0.12);
        tl.to(selector, { opacity: 0, y: -20, duration: 0.35, ease: "power2.in" }, scene.start + scene.duration - 0.35);
      });

      tl.from("#hero .team-block, #hero .series-tile", { opacity: 0, y: 24, stagger: 0.07, duration: 0.4, ease: "power2.out" }, 0.7);
      tl.from("#stakes .edge-card", { opacity: 0, y: 28, stagger: 0.12, duration: 0.42, ease: "power2.out" }, 10.8);
      tl.from("#players .player-card", { opacity: 0, y: 42, stagger: 0.11, duration: 0.48, ease: "power2.out" }, 22.6);
      tl.to("#players .player-card img", { scale: 1.06, duration: 12, ease: "none" }, 22.2);
      tl.from("#tactics .key-row", { opacity: 0, x: 28, stagger: 0.12, duration: 0.42, ease: "power2.out" }, 36.8);
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
