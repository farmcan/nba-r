export type OverlayTheme = {
  homeColor: string;
  awayColor: string;
  accentColor: string;
  paperColor?: string;
  inkColor?: string;
};

export type SocialPost = {
  handle: string;
  displayName: string;
  meta: string;
  body: string;
  avatarSrc?: string;
  teamColor?: string;
  metrics?: {
    replies: string;
    reposts: string;
    likes: string;
  };
  sourceLabel?: string;
};

export type FanComment = {
  user: string;
  body: string;
  sentiment: "belief" | "doubt" | "hype" | "tactical";
  teamColor?: string;
};

export type RatingRow = {
  rank: string;
  player: string;
  team: string;
  score: string;
  tag: string;
  voters: string;
  teamColor?: string;
};

export type Sticker = {
  label: string;
  tone: "hot" | "cold" | "neutral" | "warning";
};

export type RundownCue = {
  timecode: string;
  title: string;
  status: "ready" | "live" | "hold";
  source: string;
};

const escapeHtml = (value: string): string => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

const styleVars = (theme: OverlayTheme): string => `
  --hf-home: ${theme.homeColor};
  --hf-away: ${theme.awayColor};
  --hf-accent: ${theme.accentColor};
  --hf-paper: ${theme.paperColor ?? "#fff3d0"};
  --hf-ink: ${theme.inkColor ?? "#06080b"};
`;

export const socialOverlayStyles = (): string => `
  .hf-template-shell {
    ${styleVars({homeColor: "#007a33", awayColor: "#006bb6", accentColor: "#ffe199"})}
    color: var(--hf-paper);
    font-family: system-ui, sans-serif;
  }

  .hf-panel-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 18px;
    color: var(--hf-accent);
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .hf-panel-title::after {
    content: "";
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(255,225,153,0.55), transparent);
  }

  .hf-source {
    display: inline-flex;
    width: fit-content;
    margin-top: 12px;
    padding: 7px 10px;
    border: 1px solid rgba(255,225,153,0.34);
    background: rgba(255,225,153,0.1);
    color: var(--hf-accent);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .hf-social-deck,
  .hf-comment-wall,
  .hf-rating-panel,
  .hf-rundown-panel {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.18);
    background:
      linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)),
      rgba(4,7,10,0.76);
    box-shadow: 0 26px 80px rgba(0,0,0,0.34);
    backdrop-filter: blur(14px);
  }

  .hf-social-deck::before,
  .hf-comment-wall::before,
  .hf-rating-panel::before,
  .hf-rundown-panel::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 64px),
      linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 64px);
    mask-image: linear-gradient(90deg, transparent, black 14%, black 86%, transparent);
  }

  .hf-social-deck {
    padding: 24px;
  }

  .hf-post-card {
    position: relative;
    display: grid;
    grid-template-columns: 58px 1fr;
    gap: 16px;
    padding: 18px;
    border: 1px solid rgba(255,255,255,0.16);
    background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  }

  .hf-post-card + .hf-post-card {
    margin-top: 14px;
  }

  .hf-post-avatar {
    display: grid;
    place-items: center;
    width: 58px;
    height: 58px;
    overflow: hidden;
    border-radius: 16px;
    background: var(--post-color, var(--hf-home));
    color: white;
    font-weight: 1000;
  }

  .hf-post-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hf-post-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(255,243,208,0.68);
    font-size: 15px;
    font-weight: 800;
  }

  .hf-post-meta strong {
    color: var(--hf-paper);
    font-size: 20px;
  }

  .hf-verified {
    display: inline-grid;
    place-items: center;
    width: 19px;
    height: 19px;
    border-radius: 50%;
    background: var(--post-color, var(--hf-home));
    color: white;
    font-size: 12px;
    font-weight: 1000;
  }

  .hf-post-body {
    margin-top: 10px;
    color: var(--hf-paper);
    font-size: 25px;
    font-weight: 850;
    line-height: 1.18;
  }

  .hf-post-metrics {
    display: flex;
    gap: 18px;
    margin-top: 13px;
    color: rgba(255,243,208,0.58);
    font-size: 14px;
    font-weight: 800;
  }

  .hf-comment-wall {
    padding: 26px;
  }

  .hf-comment-bubble {
    width: fit-content;
    max-width: 86%;
    padding: 15px 18px;
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 22px 22px 22px 6px;
    background: linear-gradient(135deg, var(--comment-color, var(--hf-home)), rgba(255,255,255,0.08));
    box-shadow: 0 14px 32px rgba(0,0,0,0.22);
  }

  .hf-comment-bubble:nth-child(2n) {
    margin-left: auto;
    border-radius: 22px 22px 6px 22px;
  }

  .hf-comment-bubble + .hf-comment-bubble {
    margin-top: 14px;
  }

  .hf-comment-user {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    color: rgba(255,243,208,0.72);
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hf-comment-body {
    margin-top: 6px;
    color: var(--hf-paper);
    font-size: 22px;
    font-weight: 850;
    line-height: 1.22;
  }

  .hf-rating-panel {
    padding: 26px;
  }

  .hf-rating-hero {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 22px;
    align-items: center;
    margin-bottom: 22px;
  }

  .hf-rating-score {
    display: grid;
    place-items: center;
    min-height: 148px;
    border: 1px solid rgba(255,225,153,0.36);
    background: radial-gradient(circle, rgba(255,225,153,0.24), rgba(255,255,255,0.05));
    color: var(--hf-accent);
    font-size: 66px;
    font-weight: 1000;
    line-height: 1;
  }

  .hf-rating-hero h3 {
    margin: 0;
    color: var(--hf-paper);
    font-size: 42px;
    line-height: 1.02;
  }

  .hf-rating-hero p {
    margin: 10px 0 0;
    color: rgba(255,243,208,0.74);
    font-size: 20px;
    font-weight: 800;
  }

  .hf-rating-row {
    display: grid;
    grid-template-columns: 48px 1fr 82px 116px;
    gap: 12px;
    align-items: center;
    padding: 14px 0;
    border-top: 1px solid rgba(255,255,255,0.14);
    font-size: 18px;
    font-weight: 850;
  }

  .hf-rating-row b {
    color: var(--row-color, var(--hf-home));
  }

  .hf-rating-row small {
    color: rgba(255,243,208,0.6);
    font-weight: 900;
  }

  .hf-sticker-tape {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
  }

  .hf-sticker {
    --sticker-bg: rgba(255,225,153,0.92);
    display: inline-flex;
    align-items: center;
    min-height: 52px;
    padding: 0 18px;
    border: 2px solid rgba(0,0,0,0.3);
    background: var(--sticker-bg);
    color: var(--hf-ink);
    font-size: 20px;
    font-weight: 1000;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    box-shadow: 8px 8px 0 rgba(0,0,0,0.34);
    transform: rotate(var(--tilt, -2deg));
  }

  .hf-sticker[data-tone="hot"] {
    --sticker-bg: #ff5b3d;
    color: white;
  }

  .hf-sticker[data-tone="cold"] {
    --sticker-bg: #4cc9f0;
  }

  .hf-sticker[data-tone="warning"] {
    --sticker-bg: #ffe199;
  }

  .hf-rundown-panel {
    padding: 24px;
  }

  .hf-rundown-cue {
    display: grid;
    grid-template-columns: 82px 1fr 82px;
    gap: 14px;
    align-items: center;
    padding: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
  }

  .hf-rundown-cue + .hf-rundown-cue {
    margin-top: 10px;
  }

  .hf-rundown-cue[data-status="live"] {
    border-color: var(--hf-accent);
    background: linear-gradient(90deg, rgba(255,225,153,0.22), rgba(255,255,255,0.08));
  }

  .hf-rundown-time {
    color: var(--hf-accent);
    font-size: 18px;
    font-weight: 1000;
  }

  .hf-rundown-title {
    color: var(--hf-paper);
    font-size: 19px;
    font-weight: 900;
  }

  .hf-rundown-source {
    margin-top: 4px;
    color: rgba(255,243,208,0.56);
    font-size: 12px;
    font-weight: 800;
  }

  .hf-rundown-status {
    justify-self: end;
    padding: 6px 9px;
    border: 1px solid rgba(255,255,255,0.2);
    color: var(--hf-paper);
    font-size: 12px;
    font-weight: 1000;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

export const renderSocialPostDeck = (posts: SocialPost[]): string => `
  <section class="hf-social-deck">
    <div class="hf-panel-title">Social Pulse</div>
    ${posts
      .map(
        (post) => `
          <article class="hf-post-card" style="--post-color: ${post.teamColor ?? "var(--hf-home)"}">
            <div class="hf-post-avatar">${post.avatarSrc ? `<img src="${escapeHtml(post.avatarSrc)}" alt="${escapeHtml(post.displayName)}" />` : escapeHtml(post.displayName.slice(0, 1))}</div>
            <div>
              <div class="hf-post-meta">
                <strong>${escapeHtml(post.displayName)}</strong>
                <span class="hf-verified">✓</span>
                <span>${escapeHtml(post.handle)}</span>
                <span>${escapeHtml(post.meta)}</span>
              </div>
              <div class="hf-post-body">${escapeHtml(post.body)}</div>
              ${
                post.metrics
                  ? `<div class="hf-post-metrics"><span>${escapeHtml(post.metrics.replies)} replies</span><span>${escapeHtml(post.metrics.reposts)} reposts</span><span>${escapeHtml(post.metrics.likes)} likes</span></div>`
                  : ""
              }
              ${post.sourceLabel ? `<span class="hf-source">${escapeHtml(post.sourceLabel)}</span>` : ""}
            </div>
          </article>
        `,
      )
      .join("")}
  </section>
`;

export const renderFanCommentWall = (comments: FanComment[]): string => `
  <section class="hf-comment-wall">
    <div class="hf-panel-title">Comment Section</div>
    ${comments
      .map(
        (comment) => `
          <article class="hf-comment-bubble" style="--comment-color: ${comment.teamColor ?? "var(--hf-away)"}">
            <div class="hf-comment-user"><span>${escapeHtml(comment.user)}</span><span>${escapeHtml(comment.sentiment)}</span></div>
            <div class="hf-comment-body">${escapeHtml(comment.body)}</div>
          </article>
        `,
      )
      .join("")}
  </section>
`;

export const renderHupuRatingPanel = (rows: RatingRow[]): string => {
  const featured = rows[0];

  return `
    <section class="hf-rating-panel">
      <div class="hf-panel-title">Hupu-Style Rating</div>
      ${
        featured
          ? `<div class="hf-rating-hero">
              <div class="hf-rating-score">${escapeHtml(featured.score)}</div>
              <div>
                <h3>${escapeHtml(featured.player)} · ${escapeHtml(featured.tag)}</h3>
                <p>${escapeHtml(featured.voters)} JRs 参与评分 · 社区评分模板，不代表实时抓取数据</p>
              </div>
            </div>`
          : ""
      }
      ${rows
        .map(
          (row) => `
            <div class="hf-rating-row" style="--row-color: ${row.teamColor ?? "var(--hf-home)"}">
              <b>${escapeHtml(row.rank)}</b>
              <span>${escapeHtml(row.player)} <small>${escapeHtml(row.team)}</small></span>
              <strong>${escapeHtml(row.score)}</strong>
              <small>${escapeHtml(row.tag)}</small>
            </div>
          `,
        )
        .join("")}
    </section>
  `;
};

export const renderStickerTape = (stickers: Sticker[]): string => `
  <div class="hf-sticker-tape">
    ${stickers
      .map(
        (sticker, index) =>
          `<span class="hf-sticker" data-tone="${sticker.tone}" style="--tilt: ${index % 2 === 0 ? "-2.5deg" : "2deg"}">${escapeHtml(sticker.label)}</span>`,
      )
      .join("")}
  </div>
`;

export const renderProducerRundown = (cues: RundownCue[]): string => `
  <section class="hf-rundown-panel">
    <div class="hf-panel-title">Producer Rundown</div>
    ${cues
      .map(
        (cue) => `
          <article class="hf-rundown-cue" data-status="${cue.status}">
            <div class="hf-rundown-time">${escapeHtml(cue.timecode)}</div>
            <div>
              <div class="hf-rundown-title">${escapeHtml(cue.title)}</div>
              <div class="hf-rundown-source">${escapeHtml(cue.source)}</div>
            </div>
            <div class="hf-rundown-status">${escapeHtml(cue.status)}</div>
          </article>
        `,
      )
      .join("")}
  </section>
`;

export const renderTemplateGallery = (options: {
  title: string;
  theme: OverlayTheme;
  posts: SocialPost[];
  comments: FanComment[];
  ratings: RatingRow[];
  stickers: Sticker[];
  rundown: RundownCue[];
}): string => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(options.title)}</title>
    <style>
      ${socialOverlayStyles()}

      body {
        margin: 0;
        min-height: 100vh;
        background:
          radial-gradient(circle at 16% 12%, ${options.theme.homeColor}88, transparent 28%),
          radial-gradient(circle at 84% 20%, ${options.theme.awayColor}88, transparent 30%),
          linear-gradient(135deg, #030608, #07111a 58%, #050607);
      }

      .gallery {
        ${styleVars(options.theme)}
        max-width: 1480px;
        margin: 0 auto;
        padding: 56px;
      }

      .gallery-hero {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 32px;
        align-items: end;
        margin-bottom: 34px;
        color: var(--hf-paper);
      }

      .gallery-hero h1 {
        margin: 0;
        max-width: 920px;
        font-size: 74px;
        line-height: 0.94;
      }

      .gallery-hero p {
        margin: 16px 0 0;
        max-width: 780px;
        color: rgba(255,243,208,0.72);
        font-size: 22px;
        font-weight: 750;
        line-height: 1.32;
      }

      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 24px;
      }

      .gallery-card {
        min-height: 360px;
      }

      .gallery-wide {
        grid-column: 1 / -1;
        padding: 26px;
        border: 1px solid rgba(255,255,255,0.16);
        background: rgba(255,255,255,0.08);
      }
    </style>
  </head>
  <body>
    <main class="gallery hf-template-shell">
      <header class="gallery-hero">
        <div>
          <div class="hf-panel-title">Template Gallery</div>
          <h1>${escapeHtml(options.title)}</h1>
          <p>Prebuilt HyperFrames social/broadcast overlays: posts, comments, Hupu-style ratings, stickers, and producer rundown panels.</p>
        </div>
        ${renderStickerTape(options.stickers)}
      </header>
      <section class="gallery-grid">
        <div class="gallery-card">${renderSocialPostDeck(options.posts)}</div>
        <div class="gallery-card">${renderFanCommentWall(options.comments)}</div>
        <div class="gallery-card">${renderHupuRatingPanel(options.ratings)}</div>
        <div class="gallery-card">${renderProducerRundown(options.rundown)}</div>
        <div class="gallery-wide">${renderStickerTape(options.stickers)}</div>
      </section>
    </main>
  </body>
</html>
`;

