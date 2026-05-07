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

export type MobileFeedPost = SocialPost & {
  imageSrc?: string;
  comments: Array<{
    user: string;
    handle: string;
    body: string;
    likes: string;
    teamColor?: string;
  }>;
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

export type HupuRatingComment = {
  user: string;
  body: string;
  likes: string;
};

export type HupuMobileRating = {
  topic: string;
  subject: string;
  tagline: string;
  score: string;
  voters: string;
  distribution: string[];
  rows: RatingRow[];
  comments: HupuRatingComment[];
};

export type HupuOfficialLiteRating = {
  category: string;
  title: string;
  subtitle: string;
  score: string;
  voters: string;
  distribution: string[];
  footerCount: string;
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

export type TemplateDefinition = {
  id: string;
  name: string;
  output: string;
  description: string;
  bestFor: string[];
  avoidWhen: string[];
  requiredData: string[];
  agentSelection: string;
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
  .hf-mobile-feed,
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
  .hf-mobile-feed::before,
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

  .hf-mobile-feed {
    width: min(430px, 100%);
    min-height: 836px;
    margin: 0 auto;
    padding: 12px;
    border-radius: 52px;
    background: #15181c;
    box-shadow:
      0 36px 110px rgba(0,0,0,0.52),
      inset 0 0 0 2px rgba(255,255,255,0.14),
      inset 0 0 0 10px #202327;
  }

  .hf-phone-screen {
    position: relative;
    overflow: hidden;
    min-height: 812px;
    border-radius: 40px;
    background: #000;
    border: 1px solid #2f3336;
  }

  .hf-phone-topbar {
    position: sticky;
    top: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    padding: 0 19px;
    background: #000;
    backdrop-filter: blur(12px);
    color: #e7e9ea;
    font-size: 13px;
    font-weight: 700;
  }

  .hf-ios-notch {
    width: 86px;
    height: 24px;
    border-radius: 999px;
    background: #050505;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
  }

  .hf-x-homebar {
    display: grid;
    grid-template-columns: 38px 1fr 38px;
    align-items: center;
    height: 48px;
    padding: 0 14px;
    border-bottom: 1px solid #2f3336;
    background: rgba(0,0,0,0.92);
  }

  .hf-x-mini-avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    background: var(--post-color, #1d9bf0);
  }

  .hf-x-mini-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hf-x-logo {
    justify-self: center;
    color: #e7e9ea;
    font-size: 22px;
    font-weight: 800;
  }

  .hf-x-gear {
    justify-self: end;
    color: #e7e9ea;
    font-size: 21px;
  }

  .hf-x-detailbar {
    display: grid;
    grid-template-columns: 38px 1fr 38px;
    align-items: center;
    height: 48px;
    padding: 0 14px;
    border-bottom: 1px solid #2f3336;
    background: rgba(0,0,0,0.96);
  }

  .hf-x-back {
    color: #e7e9ea;
    font-size: 24px;
    line-height: 1;
  }

  .hf-x-detail-title {
    color: #e7e9ea;
    font-size: 17px;
    font-weight: 800;
  }

  .hf-x-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #2f3336;
    background: rgba(0,0,0,0.92);
  }

  .hf-x-tab {
    position: relative;
    display: grid;
    place-items: center;
    height: 52px;
    color: #71767b;
    font-size: 15px;
    font-weight: 700;
  }

  .hf-x-tab.is-active {
    color: #eff3f4;
  }

  .hf-x-tab.is-active::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 58px;
    height: 4px;
    border-radius: 999px;
    background: #1d9bf0;
  }

  .hf-feed-scroll {
    height: 720px;
    overflow: hidden;
  }

  .hf-feed-scroll-inner {
    padding: 0 0 80px;
    animation: hf-phone-scroll 9s cubic-bezier(0.45, 0, 0.2, 1) infinite;
  }

  @keyframes hf-phone-scroll {
    0%, 18% {
      transform: translateY(0);
    }
    42%, 58% {
      transform: translateY(-118px);
    }
    82%, 100% {
      transform: translateY(-236px);
    }
  }

  .hf-mobile-post {
    display: grid;
    grid-template-columns: 52px 1fr;
    column-gap: 10px;
    padding: 12px 14px 10px;
    border-bottom: 1px solid #2f3336;
  }

  .hf-mobile-author {
    display: flex;
    gap: 4px;
    align-items: center;
    min-width: 0;
  }

  .hf-mobile-avatar {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    overflow: hidden;
    border-radius: 50%;
    background: var(--post-color, var(--hf-home));
    color: white;
    font-weight: 1000;
  }

  .hf-mobile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hf-mobile-name {
    color: #e7e9ea;
    font-size: 15px;
    font-weight: 760;
    white-space: nowrap;
  }

  .hf-mobile-name .hf-verified {
    width: 17px;
    height: 17px;
    margin-left: 2px;
    background: #1d9bf0;
    font-size: 10px;
    vertical-align: -2px;
  }

  .hf-mobile-handle {
    color: #71767b;
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
  }

  .hf-x-menu {
    margin-left: auto;
    color: #71767b;
    font-size: 18px;
    line-height: 1;
  }

  .hf-mobile-body {
    margin-top: 3px;
    color: #eff3f4;
    font-size: 15.5px;
    font-weight: 520;
    line-height: 1.32;
  }

  .hf-mobile-image {
    margin-top: 10px;
    overflow: hidden;
    border: 1px solid #2f3336;
    border-radius: 16px;
    background: #16181c;
  }

  .hf-mobile-image img {
    display: block;
    width: 100%;
    height: 214px;
    object-fit: cover;
  }

  .hf-mobile-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    color: #71767b;
    font-size: 13px;
    font-weight: 520;
  }

  .hf-reply-thread {
    margin-top: 0;
  }

  .hf-reply {
    position: relative;
    display: grid;
    grid-template-columns: 52px 1fr;
    column-gap: 10px;
    padding: 10px 14px 12px;
    border-bottom: 1px solid #2f3336;
  }

  .hf-reply-context {
    margin-bottom: 4px;
    color: #71767b;
    font-size: 13px;
    font-weight: 500;
  }

  .hf-reply-context b {
    color: #1d9bf0;
    font-weight: 600;
  }

  .hf-reply::before {
    content: "";
    position: absolute;
    top: -18px;
    bottom: calc(100% - 10px);
    left: 35px;
    width: 2px;
    background: #2f3336;
  }

  .hf-reply-avatar {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: var(--reply-color, #1d9bf0);
    color: white;
    font-size: 14px;
    font-weight: 800;
  }

  .hf-reply-name {
    color: #eff3f4;
    font-size: 14px;
    font-weight: 720;
  }

  .hf-reply-body {
    margin-top: 3px;
    color: #e7e9ea;
    font-size: 14.5px;
    font-weight: 500;
    line-height: 1.3;
  }

  .hf-reply-handle {
    color: #71767b;
    font-weight: 760;
  }

  .hf-x-bottom-nav {
    position: absolute;
    right: 20px;
    left: 20px;
    bottom: 0;
    z-index: 4;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    height: 50px;
    border-top: 1px solid #2f3336;
    background: rgba(0,0,0,0.96);
    color: #e7e9ea;
    font-size: 19px;
    place-items: center;
  }

  .hf-x-reply-composer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4;
    display: grid;
    grid-template-columns: 36px 1fr auto;
    gap: 10px;
    align-items: center;
    height: 54px;
    padding: 0 14px;
    border-top: 1px solid #2f3336;
    background: rgba(0,0,0,0.97);
  }

  .hf-x-composer-avatar {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    background: var(--post-color, #1d9bf0);
    color: white;
    font-size: 12px;
    font-weight: 800;
  }

  .hf-x-composer-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hf-x-composer-placeholder {
    color: #71767b;
    font-size: 15px;
    font-weight: 500;
  }

  .hf-x-reply-button {
    padding: 7px 13px;
    border-radius: 999px;
    background: #1d9bf0;
    color: white;
    font-size: 13px;
    font-weight: 850;
  }

  .hf-x-detail-footer {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 10px;
    margin: 10px 14px 0 66px;
    padding: 10px 12px;
    border: 1px solid #2f3336;
    border-radius: 999px;
    color: #71767b;
    font-size: 14px;
    font-weight: 500;
  }

  .hf-x-detail-footer b {
    color: #1d9bf0;
    font-weight: 800;
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

  .hf-hupu-phone {
    width: min(430px, 100%);
    min-height: 780px;
    margin: 0 auto;
    overflow: hidden;
    border: 12px solid #111;
    border-radius: 44px;
    background: #f4f4f4;
    color: #1f1f1f;
    box-shadow: 0 36px 110px rgba(0,0,0,0.48);
  }

  .hf-hupu-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 34px;
    padding: 0 18px;
    background: #ff6a00;
    color: white;
    font-size: 12px;
    font-weight: 900;
  }

  .hf-hupu-nav {
    display: grid;
    grid-template-columns: 42px 1fr 42px;
    align-items: center;
    height: 46px;
    padding: 0 12px;
    background: #ff6a00;
    color: white;
    font-size: 17px;
    font-weight: 950;
  }

  .hf-hupu-nav span:nth-child(2) {
    text-align: center;
  }

  .hf-hupu-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 42px;
    background: white;
    border-bottom: 1px solid #eeeeee;
  }

  .hf-hupu-tab {
    position: relative;
    display: grid;
    place-items: center;
    color: #777;
    font-size: 14px;
    font-weight: 850;
  }

  .hf-hupu-tab.is-active {
    color: #ff6a00;
  }

  .hf-hupu-tab.is-active::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 30px;
    height: 3px;
    border-radius: 999px;
    background: #ff6a00;
  }

  .hf-hupu-page {
    position: relative;
    height: 646px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .hf-hupu-scroll {
    padding: 10px 10px 76px;
    animation: hf-hupu-scroll 10s cubic-bezier(0.45, 0, 0.2, 1) infinite;
  }

  @keyframes hf-hupu-scroll {
    0%, 24% {
      transform: translateY(0);
    }
    52%, 66% {
      transform: translateY(-152px);
    }
    90%, 100% {
      transform: translateY(-298px);
    }
  }

  .hf-hupu-card {
    overflow: hidden;
    border-radius: 12px;
    background: white;
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }

  .hf-hupu-hero {
    padding: 16px 14px 14px;
    background:
      linear-gradient(135deg, rgba(255,106,0,0.14), rgba(255,255,255,0)),
      white;
  }

  .hf-hupu-topic {
    color: #999;
    font-size: 13px;
    font-weight: 800;
  }

  .hf-hupu-topic-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }

  .hf-hupu-pill {
    padding: 5px 8px;
    border-radius: 999px;
    background: #fff1e8;
    color: #ff6a00;
    font-size: 12px;
    font-weight: 900;
  }

  .hf-hupu-subject {
    margin-top: 6px;
    color: #1f1f1f;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.08;
  }

  .hf-hupu-tagline {
    margin-top: 8px;
    color: #666;
    font-size: 14px;
    font-weight: 760;
  }

  .hf-hupu-score-line {
    display: grid;
    grid-template-columns: 118px 1fr;
    gap: 16px;
    align-items: center;
    margin-top: 18px;
  }

  .hf-hupu-score {
    color: #ff6a00;
    font-size: 72px;
    font-weight: 1000;
    line-height: 0.9;
  }

  .hf-hupu-score small {
    display: block;
    margin-top: 7px;
    color: #999;
    font-size: 13px;
    font-weight: 850;
  }

  .hf-hupu-rate-button {
    display: grid;
    place-items: center;
    height: 42px;
    border-radius: 999px;
    background: #ff6a00;
    color: white;
    font-size: 16px;
    font-weight: 1000;
  }

  .hf-hupu-disclaimer {
    margin-top: 10px;
    padding: 8px 10px;
    border-radius: 9px;
    background: #f7f7f7;
    color: #999;
    font-size: 12px;
    font-weight: 780;
    line-height: 1.25;
  }

  .hf-hupu-bars {
    display: grid;
    gap: 7px;
    margin-top: 14px;
  }

  .hf-hupu-bar {
    display: grid;
    grid-template-columns: 36px 1fr 54px;
    gap: 8px;
    align-items: center;
    color: #888;
    font-size: 12px;
    font-weight: 850;
  }

  .hf-hupu-bar-track {
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: #eee;
  }

  .hf-hupu-bar-fill {
    width: var(--hupu-value);
    height: 100%;
    background: #ff6a00;
  }

  .hf-hupu-list {
    margin-top: 12px;
    overflow: hidden;
    border-radius: 14px;
    background: white;
  }

  .hf-hupu-list-title {
    padding: 13px 14px;
    border-bottom: 1px solid #f0f0f0;
    color: #1f1f1f;
    font-size: 16px;
    font-weight: 1000;
  }

  .hf-hupu-row {
    display: grid;
    grid-template-columns: 34px 1fr 48px;
    gap: 10px;
    align-items: center;
    padding: 12px 14px;
    border-bottom: 1px solid #f3f3f3;
  }

  .hf-hupu-row b {
    color: #ff6a00;
    font-size: 15px;
  }

  .hf-hupu-row span {
    color: #222;
    font-size: 15px;
    font-weight: 900;
  }

  .hf-hupu-row small {
    display: block;
    margin-top: 3px;
    color: #999;
    font-size: 11px;
    font-weight: 780;
  }

  .hf-hupu-row strong {
    color: #ff6a00;
    font-size: 21px;
    font-weight: 1000;
    text-align: right;
  }

  .hf-hupu-comment {
    padding: 13px 14px;
    border-bottom: 1px solid #f3f3f3;
  }

  .hf-hupu-comment strong {
    color: #333;
    font-size: 14px;
  }

  .hf-hupu-comment p {
    margin: 6px 0 0;
    color: #444;
    font-size: 14px;
    font-weight: 780;
    line-height: 1.32;
  }

  .hf-hupu-comment small {
    color: #aaa;
    font-size: 12px;
  }

  .hf-hupu-lite-phone {
    width: min(430px, 100%);
    margin: 0 auto;
    overflow: hidden;
    border: 12px solid #111;
    border-radius: 44px;
    background: #fff;
    color: #1f1f1f;
    box-shadow: 0 36px 110px rgba(0,0,0,0.48);
  }

  .hf-hupu-lite-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f1f1f1;
  }

  .hf-hupu-lite-search {
    display: flex;
    align-items: center;
    height: 34px;
    padding: 0 13px;
    border-radius: 999px;
    background: #f5f5f5;
    color: #aaa;
    font-size: 13px;
    font-weight: 800;
  }

  .hf-hupu-lite-open {
    color: #ff6a00;
    font-size: 14px;
    font-weight: 900;
  }

  .hf-hupu-lite-body {
    padding: 22px 20px 26px;
  }

  .hf-hupu-lite-category {
    color: #777;
    font-size: 15px;
    font-weight: 900;
  }

  .hf-hupu-lite-title {
    margin-top: 14px;
    color: #222;
    font-size: 28px;
    font-weight: 1000;
    line-height: 1.1;
  }

  .hf-hupu-lite-subtitle {
    margin-top: 8px;
    color: #555;
    font-size: 16px;
    font-weight: 800;
  }

  .hf-hupu-lite-score {
    margin-top: 26px;
    color: #ff6a00;
    font-size: 92px;
    font-weight: 1000;
    line-height: 0.86;
  }

  .hf-hupu-lite-voters {
    margin-top: 10px;
    color: #777;
    font-size: 17px;
    font-weight: 900;
  }

  .hf-hupu-lite-button {
    display: grid;
    place-items: center;
    height: 46px;
    margin-top: 18px;
    border-radius: 999px;
    background: #ff6a00;
    color: white;
    font-size: 17px;
    font-weight: 1000;
  }

  .hf-hupu-lite-bars {
    display: grid;
    gap: 13px;
    margin-top: 22px;
  }

  .hf-hupu-lite-percent {
    display: grid;
    grid-template-columns: 1fr 72px;
    gap: 14px;
    align-items: center;
  }

  .hf-hupu-lite-track {
    height: 12px;
    overflow: hidden;
    border-radius: 999px;
    background: #f0f0f0;
  }

  .hf-hupu-lite-fill {
    width: var(--hupu-lite-value);
    height: 100%;
    background: #ff6a00;
  }

  .hf-hupu-lite-percent strong {
    color: #555;
    font-size: 15px;
    font-weight: 900;
    text-align: right;
  }

  .hf-hupu-lite-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 26px;
    padding-top: 18px;
    border-top: 1px solid #f0f0f0;
    color: #888;
    font-size: 15px;
    font-weight: 900;
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

export const renderMobileSocialFeed = (post: MobileFeedPost): string => `
  <section class="hf-mobile-feed" style="--post-color: ${post.teamColor ?? "var(--hf-home)"}">
      <div class="hf-phone-screen">
        <div class="hf-phone-topbar">
          <span>9:41</span>
          <span class="hf-ios-notch"></span>
          <span>5G 82%</span>
        </div>
      <div class="hf-x-detailbar"><span class="hf-x-back">‹</span><span class="hf-x-detail-title">Post</span><span class="hf-x-gear">⌕</span></div>
      <div class="hf-feed-scroll">
        <div class="hf-feed-scroll-inner">
        <article class="hf-mobile-post">
          <div class="hf-mobile-avatar">${post.avatarSrc ? `<img src="${escapeHtml(post.avatarSrc)}" alt="${escapeHtml(post.displayName)}" />` : escapeHtml(post.displayName.slice(0, 1))}</div>
          <div>
            <div class="hf-mobile-author">
              <span class="hf-mobile-name">${escapeHtml(post.displayName)} <span class="hf-verified">✓</span></span>
              <span class="hf-mobile-handle">${escapeHtml(post.handle)} · ${escapeHtml(post.meta)}</span>
              <span class="hf-x-menu">···</span>
            </div>
            <div class="hf-mobile-body">${escapeHtml(post.body)}</div>
            ${
              post.imageSrc
                ? `<div class="hf-mobile-image"><img src="${escapeHtml(post.imageSrc)}" alt="${escapeHtml(post.displayName)} post visual" /></div>`
                : ""
            }
            ${
              post.metrics
                ? `<div class="hf-mobile-actions"><span>💬 ${escapeHtml(post.metrics.replies)}</span><span>↻ ${escapeHtml(post.metrics.reposts)}</span><span>♡ ${escapeHtml(post.metrics.likes)}</span><span>↗</span></div>`
                : ""
            }
          </div>
        </article>
        <div class="hf-reply-thread">
          ${post.comments
            .map(
              (comment) => `
                <article class="hf-reply" style="--reply-color: ${comment.teamColor ?? "var(--hf-away)"}">
                  <div class="hf-reply-avatar">${escapeHtml(comment.user.slice(0, 1))}</div>
                  <div>
                    <div class="hf-reply-context">Replying to <b>${escapeHtml(post.handle)}</b></div>
                    <div class="hf-reply-name">${escapeHtml(comment.user)} <span class="hf-reply-handle">${escapeHtml(comment.handle)} · ${escapeHtml(comment.likes)} likes</span></div>
                    <div class="hf-reply-body">${escapeHtml(comment.body)}</div>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
        <article class="hf-mobile-post">
          <div class="hf-mobile-avatar" style="--post-color: #536471">F</div>
          <div>
            <div class="hf-mobile-author">
              <span class="hf-mobile-name">${escapeHtml(post.displayName)} <span class="hf-verified">✓</span></span>
              <span class="hf-mobile-handle">follow-up · now</span>
              <span class="hf-x-menu">···</span>
            </div>
            <div class="hf-mobile-body">Second side has to be ready. One rotation late and Boston turns it into a run.</div>
          </div>
        </article>
        <div class="hf-x-detail-footer"><span>Post your reply</span><b>Reply</b></div>
        </div>
      </div>
      <div class="hf-x-reply-composer">
        <div class="hf-x-composer-avatar">${post.avatarSrc ? `<img src="${escapeHtml(post.avatarSrc)}" alt="${escapeHtml(post.displayName)}" />` : escapeHtml(post.displayName.slice(0, 1))}</div>
        <div class="hf-x-composer-placeholder">Post your reply</div>
        <div class="hf-x-reply-button">Reply</div>
      </div>
    </div>
  </section>
`;

export const renderHupuMobileRating = (rating: HupuMobileRating): string => `
  <section class="hf-hupu-phone">
    <div class="hf-hupu-status"><span>9:41</span><span>虎扑</span><span>82%</span></div>
    <div class="hf-hupu-nav"><span>‹</span><span>评分</span><span>···</span></div>
    <div class="hf-hupu-tabs"><div class="hf-hupu-tab">赛况</div><div class="hf-hupu-tab is-active">评分</div><div class="hf-hupu-tab">讨论</div></div>
    <div class="hf-hupu-page">
      <div class="hf-hupu-scroll">
        <article class="hf-hupu-card hf-hupu-hero">
          <div class="hf-hupu-topic-row"><div class="hf-hupu-topic">${escapeHtml(rating.topic)}</div><div class="hf-hupu-pill">JRs热评</div></div>
          <div class="hf-hupu-subject">${escapeHtml(rating.subject)}</div>
          <div class="hf-hupu-tagline">${escapeHtml(rating.tagline)}</div>
          <div class="hf-hupu-score-line">
            <div class="hf-hupu-score">${escapeHtml(rating.score)}<small>${escapeHtml(rating.voters)} JRs评分</small></div>
            <div>
              <div class="hf-hupu-rate-button">立即评分</div>
              <div class="hf-hupu-bars">
                ${rating.distribution
                  .map(
                    (value, index) => `
                      <div class="hf-hupu-bar">
                        <span>${5 - index}星</span>
                        <div class="hf-hupu-bar-track"><div class="hf-hupu-bar-fill" style="--hupu-value: ${escapeHtml(value)}"></div></div>
                        <strong>${escapeHtml(value)}</strong>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          </div>
          <div class="hf-hupu-disclaimer">模板演示：只有在接入真实虎扑数据源后，才可去掉 mock/template 标记。</div>
        </article>
        <section class="hf-hupu-list">
          <div class="hf-hupu-list-title">本场评分榜</div>
          ${rating.rows
            .map(
              (row) => `
                <div class="hf-hupu-row">
                  <b>${escapeHtml(row.rank)}</b>
                  <span>${escapeHtml(row.player)}<small>${escapeHtml(row.team)} · ${escapeHtml(row.tag)} · ${escapeHtml(row.voters)} JRs</small></span>
                  <strong>${escapeHtml(row.score)}</strong>
                </div>
              `,
            )
            .join("")}
        </section>
        <section class="hf-hupu-list">
          <div class="hf-hupu-list-title">亮评</div>
          ${rating.comments
            .map(
              (comment) => `
                <article class="hf-hupu-comment">
                  <strong>${escapeHtml(comment.user)}</strong> <small>${escapeHtml(comment.likes)}亮了</small>
                  <p>${escapeHtml(comment.body)}</p>
                </article>
              `,
            )
            .join("")}
        </section>
      </div>
    </div>
  </section>
`;

export const renderHupuOfficialLiteRating = (rating: HupuOfficialLiteRating): string => `
  <section class="hf-hupu-lite-phone">
    <div class="hf-hupu-lite-header">
      <div class="hf-hupu-lite-search">搜我想看</div>
      <div class="hf-hupu-lite-open">打开APP</div>
    </div>
    <div class="hf-hupu-lite-body">
      <div class="hf-hupu-lite-category">${escapeHtml(rating.category)}</div>
      <div class="hf-hupu-lite-title">${escapeHtml(rating.title)}</div>
      <div class="hf-hupu-lite-subtitle">${escapeHtml(rating.subtitle)}</div>
      <div class="hf-hupu-lite-score">${escapeHtml(rating.score)}</div>
      <div class="hf-hupu-lite-voters">${escapeHtml(rating.voters)} JRs评分</div>
      <div class="hf-hupu-lite-button">立即评分</div>
      <div class="hf-hupu-lite-bars">
        ${rating.distribution
          .map(
            (value) => `
              <div class="hf-hupu-lite-percent">
                <div class="hf-hupu-lite-track"><div class="hf-hupu-lite-fill" style="--hupu-lite-value: ${escapeHtml(value)}"></div></div>
                <strong>${escapeHtml(value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="hf-hupu-lite-footer"><span>打开虎扑APP</span><span>${escapeHtml(rating.footerCount)}</span><span>分享</span></div>
    </div>
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
  mobileFeed: MobileFeedPost;
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

      .template-stage {
        ${styleVars(options.theme)}
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 56px;
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
        <div class="gallery-card">${renderMobileSocialFeed(options.mobileFeed)}</div>
        <div class="gallery-card">${renderFanCommentWall(options.comments)}</div>
        <div class="gallery-card">${renderHupuRatingPanel(options.ratings)}</div>
        <div class="gallery-card">${renderProducerRundown(options.rundown)}</div>
        <div class="gallery-wide">${renderStickerTape(options.stickers)}</div>
      </section>
    </main>
  </body>
</html>
`;

export const renderStandaloneTemplatePage = (options: {
  title: string;
  theme: OverlayTheme;
  body: string;
  width?: string;
}): string => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(options.title)}</title>
    <style>
      ${socialOverlayStyles()}
      html {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #020505;
      }
      body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        min-height: 100vh;
        background:
          radial-gradient(circle at 18% 12%, ${options.theme.homeColor}cc, transparent 25%),
          radial-gradient(circle at 84% 18%, ${options.theme.awayColor}aa, transparent 28%),
          radial-gradient(circle at 54% 74%, rgba(255,225,153,0.18), transparent 26%),
          linear-gradient(135deg, #020505, #07111a 58%, #050607);
      }
      .template-stage {
        ${styleVars(options.theme)}
        position: relative;
        box-sizing: border-box;
        display: grid;
        place-items: center;
        height: 100vh;
        padding: 56px;
        overflow: hidden;
        perspective: 1400px;
      }
      .template-stage::before,
      .template-stage::after {
        content: "";
        position: absolute;
        pointer-events: none;
      }
      .template-stage::before {
        width: 860px;
        height: 860px;
        border-radius: 50%;
        background:
          conic-gradient(from 210deg, transparent, rgba(255,255,255,0.14), transparent 28%, rgba(255,225,153,0.12), transparent 54%),
          radial-gradient(circle, rgba(255,255,255,0.12), transparent 58%);
        filter: blur(4px);
        transform: translate3d(-210px, -70px, 0) rotate(-18deg);
        opacity: 0.92;
      }
      .template-stage::after {
        inset: auto 8% 8% 8%;
        height: 190px;
        background: radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 68%);
        filter: blur(16px);
        transform: rotateX(64deg);
      }
      .template-frame {
        position: relative;
        z-index: 1;
        width: ${options.width ?? "min(760px, 100%)"};
      }
      .template-frame.phone-showcase {
        transform-style: preserve-3d;
        transform: rotateX(8deg) rotateY(-16deg) rotateZ(1.5deg) translate3d(0, -10px, 0);
        animation: hf-device-float 7.5s ease-in-out infinite;
        filter: drop-shadow(58px 44px 48px rgba(0,0,0,0.42));
      }
      .template-frame.phone-showcase::before {
        content: "";
        position: absolute;
        inset: 5% -8% 6% 76%;
        z-index: -1;
        border-radius: 34px;
        background: linear-gradient(180deg, rgba(255,255,255,0.18), rgba(0,0,0,0.42));
        transform: translateZ(-42px) rotateY(72deg);
        filter: blur(1px);
        opacity: 0.66;
      }
      .template-frame.phone-showcase::after {
        content: "";
        position: absolute;
        inset: -8% 5% 16% 8%;
        z-index: 5;
        pointer-events: none;
        border-radius: 56px;
        background:
          linear-gradient(112deg, transparent 0 31%, rgba(255,255,255,0.24) 38%, rgba(255,255,255,0.06) 44%, transparent 54%),
          radial-gradient(circle at 18% 10%, rgba(255,255,255,0.18), transparent 18%);
        mix-blend-mode: screen;
        opacity: 0.72;
        transform: translateZ(70px);
      }
      .template-frame.phone-showcase .hf-mobile-feed::before,
      .template-frame.phone-showcase .hf-hupu-phone::before,
      .template-frame.phone-showcase .hf-hupu-lite-phone::before {
        display: none;
      }
      .template-frame.phone-showcase .hf-mobile-feed,
      .template-frame.phone-showcase .hf-hupu-phone,
      .template-frame.phone-showcase .hf-hupu-lite-phone {
        box-shadow:
          0 26px 60px rgba(0,0,0,0.46),
          inset 0 0 0 1px rgba(255,255,255,0.18);
      }
      @keyframes hf-device-float {
        0%, 100% {
          transform: rotateX(8deg) rotateY(-16deg) rotateZ(1.5deg) translate3d(0, -10px, 0);
        }
        50% {
          transform: rotateX(9.5deg) rotateY(-12deg) rotateZ(0.2deg) translate3d(8px, -24px, 0);
        }
      }
    </style>
  </head>
  <body>
    <main class="template-stage hf-template-shell">
      <div class="template-frame ${options.body.includes("hf-mobile-feed") || options.body.includes("hf-hupu-phone") || options.body.includes("hf-hupu-lite-phone") ? "phone-showcase" : ""}">${options.body}</div>
    </main>
  </body>
</html>
`;
