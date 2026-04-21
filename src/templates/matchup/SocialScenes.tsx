import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData, PlayerCard} from "../../types/matchup";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  NBAScoreBug,
  SceneChrome,
  SceneProgress,
  SlashDivider,
  VignetteOverlay,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

const SocialTitle: React.FC<{
  kicker: string;
  headline: React.ReactNode;
  subline: string;
}> = ({kicker, headline, subline}) => {
  return (
    <div>
      <div
        style={{
          color: neutral.sky,
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          marginTop: 10,
          color: neutral.cream,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 98,
          lineHeight: 0.92,
          maxWidth: 1320,
        }}
      >
        {headline}
      </div>
      <div
        style={{
          marginTop: 18,
          color: "rgba(244,239,230,0.78)",
          fontSize: 30,
          fontWeight: 700,
          maxWidth: 1180,
          lineHeight: 1.12,
        }}
      >
        {subline}
      </div>
    </div>
  );
};

export const SocialHookScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    config: {damping: 14, stiffness: 120, mass: 0.85},
  });
  const titleY = interpolate(reveal, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.2),
        getSceneTint(awayTheme, 0.16),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.14} scale={1.06} />
      <CourtLines color="rgba(255,255,255,0.03)" opacity={0.5} />
      <VignetteOverlay strength={0.45} />
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />
      <SlashDivider color={`${homeTheme.colors.primary}10`} width={2} angle={-24} />
      <SlashDivider color={`${awayTheme.colors.secondary}08`} width={2} angle={24} />

      <div
        style={{
          position: "absolute",
          left: -30,
          top: 150,
          color: `${homeTheme.colors.primary}22`,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 220,
          transform: "rotate(-90deg)",
          transformOrigin: "top left",
        }}
      >
        BOS
      </div>
      <div
        style={{
          position: "absolute",
          right: -10,
          bottom: 180,
          color: `${awayTheme.colors.secondary}20`,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 210,
          transform: "rotate(90deg)",
          transformOrigin: "bottom right",
        }}
      >
        PHI
      </div>

      <AbsoluteFill style={{padding: "130px 96px 124px", justifyContent: "center"}}>
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <SocialTitle
            kicker="SOCIAL PREVIEW"
            headline={
              <>
                <span style={{color: homeTheme.colors.primary}}>{data.teams.home.name}</span>
                <span style={{color: "rgba(244,239,230,0.58)"}}> 打 </span>
                <span style={{color: awayTheme.colors.secondary}}>{data.teams.away.shortName}</span>
              </>
            }
            subline="这轮真的会一边倒吗？波士顿更完整，但费城的第一拍爆点没那么容易被关掉。"
          />
        </div>

        <div
          style={{
            marginTop: 34,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          {[
            data.schedule.matchup,
            `${data.schedule.game} · ${data.schedule.date}`,
            `${data.schedule.tipoff} · ${data.schedule.venue}`,
          ].map((chip, index) => (
            <div
              key={chip}
              style={{
                padding: "14px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(7,17,27,0.72)",
                color: neutral.cream,
                fontSize: 24,
                fontWeight: 750,
                opacity: interpolate(frame, [10 + index * 4, 24 + index * 4], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
                transform: `translateY(${interpolate(frame, [10 + index * 4, 24 + index * 4], [20, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })}px)`,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <BottomTicker
        left="先看强弱，再看爆点"
        center="波士顿完整性 vs 费城制造波动"
        right="第一拍决定这轮温度"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress
        activeIndex={0}
        durationInFrames={durationInFrames}
        homeTheme={homeTheme}
        labels={["开场", "球星", "胜负手", "结论"]}
      />
    </AbsoluteFill>
  );
};

const SocialPlayerCard: React.FC<{
  card: PlayerCard;
  index: number;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({card, index, homeTheme, awayTheme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = resolveTheme(card.teamId, homeTheme, awayTheme) ?? homeTheme;
  const reveal = spring({
    fps,
    frame: Math.max(0, frame - index * 8),
    config: {damping: 16, stiffness: 130, mass: 0.9},
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "290px 1fr",
        minHeight: 340,
        border: `1px solid ${theme.colors.primary}44`,
        background: "rgba(5,12,20,0.88)",
        boxShadow: `0 24px 60px ${theme.colors.primary}18`,
        overflow: "hidden",
        transform: `translateY(${interpolate(reveal, [0, 1], [36, 0])}px) scale(${interpolate(reveal, [0, 1], [0.96, 1])})`,
        opacity: reveal,
      }}
    >
      <div
        style={{
          position: "relative",
          background: `linear-gradient(180deg, ${theme.colors.primary}4d, rgba(255,255,255,0.02))`,
        }}
      >
        <Img
          src={staticFile(card.image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 18,
            padding: "8px 12px",
            background: theme.colors.primary,
            color: theme.colors.ink,
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: 1.5,
          }}
        >
          {card.badge}
        </div>
      </div>
      <div style={{padding: "28px 28px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <div>
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 48,
              lineHeight: 0.98,
            }}
          >
            {card.name}
          </div>
          <div
            style={{
              marginTop: 10,
              color: theme.colors.accent ?? theme.colors.primary,
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {card.stat}
          </div>
          <div
            style={{
              marginTop: 16,
              color: "rgba(244,239,230,0.84)",
              fontSize: 22,
              lineHeight: 1.18,
              maxWidth: 520,
            }}
          >
            {card.note}
          </div>
        </div>
        <div
          style={{
            marginTop: 16,
            color: "rgba(244,239,230,0.42)",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {card.sourceLabel}
        </div>
      </div>
    </div>
  );
};

export const SocialStarsScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const primaryCards = [data.playerCards[0], data.playerCards[2]].filter(Boolean);
  const supportCards = [data.playerCards[1], data.playerCards[3]].filter(Boolean);

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.14),
        getSceneTint(awayTheme, 0.18),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.1} />
      <CourtLines color="rgba(255,255,255,0.03)" opacity={0.45} />
      <VignetteOverlay strength={0.52} />
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />

      <AbsoluteFill style={{padding: "92px 80px 126px"}}>
        <SocialTitle
          kicker="STAR PRESSURE"
          headline="先看谁先把比赛打热"
          subline="真正决定观感的不是名单有多豪华，而是谁先把节奏钉到自己的回合里。"
        />

        <div
          style={{
            marginTop: 34,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 22,
          }}
        >
          {primaryCards.map((card, index) => (
            <SocialPlayerCard
              key={card.name}
              card={card}
              index={index}
              homeTheme={homeTheme}
              awayTheme={awayTheme}
            />
          ))}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
          }}
        >
          {supportCards.map((card) => {
            const theme = resolveTheme(card.teamId, homeTheme, awayTheme) ?? homeTheme;
            return (
              <div
                key={card.name}
                style={{
                  padding: "18px 20px",
                  borderLeft: `6px solid ${theme.colors.primary}`,
                  background: "rgba(5,12,20,0.76)",
                  color: neutral.cream,
                  fontSize: 20,
                  lineHeight: 1.15,
                }}
              >
                <span style={{fontWeight: 900}}>{card.name}</span>
                <span style={{color: "rgba(244,239,230,0.62)"}}> · </span>
                <span>{card.badge}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <BottomTicker
        left={`${primaryCards[0]?.name ?? ""} vs ${primaryCards[1]?.name ?? ""}`}
        center="主攻手先手权"
        right={`${supportCards[0]?.name ?? ""} / ${supportCards[1]?.name ?? ""}`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress
        activeIndex={1}
        durationInFrames={durationInFrames}
        homeTheme={homeTheme}
        labels={["开场", "球星", "胜负手", "结论"]}
      />
    </AbsoluteFill>
  );
};

export const SocialEdgesScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.12),
        getSceneTint(awayTheme, 0.12),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.08} />
      <CourtLines color="rgba(255,255,255,0.025)" opacity={0.4} />
      <VignetteOverlay strength={0.5} />
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />
      <SlashDivider color={`${awayTheme.colors.secondary}08`} width={2} angle={22} />

      <AbsoluteFill style={{padding: "92px 80px 126px"}}>
        <SocialTitle
          kicker="THREE SWINGS"
          headline="真正决定走势的三个点"
          subline="这轮不是纯对飙，真正的分水岭是完整性、第一拍推进和恩比德把结构撑到什么程度。"
        />

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 20,
          }}
        >
          {data.matchupEdges.slice(0, 3).map((edge, index) => {
            const theme = resolveTheme(edge.teamId, homeTheme, awayTheme) ?? homeTheme;
            const opacity = interpolate(frame, [index * 6, 22 + index * 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={edge.headline}
                style={{
                  minHeight: 360,
                  padding: "24px 24px 22px",
                  borderTop: `8px solid ${theme.colors.primary}`,
                  background: "rgba(5,12,20,0.82)",
                  boxShadow: `0 22px 52px ${theme.colors.primary}15`,
                  opacity,
                  transform: `translateY(${interpolate(opacity, [0, 1], [28, 0])}px)`,
                }}
              >
                <div
                  style={{
                    color: theme.colors.primary,
                    fontSize: 15,
                    fontWeight: 900,
                    letterSpacing: 1.3,
                  }}
                >
                  {edge.eyebrow}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    color: neutral.cream,
                    fontFamily: '"Noto Sans SC", sans-serif',
                    fontWeight: 900,
                    fontSize: 40,
                    lineHeight: 1.02,
                  }}
                >
                  {edge.headline}
                </div>
                <div
                  style={{
                    marginTop: 18,
                    color: "rgba(244,239,230,0.84)",
                    fontSize: 24,
                    lineHeight: 1.2,
                  }}
                >
                  {edge.body}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <BottomTicker
        left="完整性是波士顿底线"
        center="爆点制造悬念"
        right="中轴状态决定上限"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress
        activeIndex={2}
        durationInFrames={durationInFrames}
        homeTheme={homeTheme}
        labels={["开场", "球星", "胜负手", "结论"]}
      />
    </AbsoluteFill>
  );
};

export const SocialClosingScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    config: {damping: 16, stiffness: 130, mass: 0.9},
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.2),
        getSceneTint(awayTheme, 0.16),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.08} scale={1.02} />
      <CourtLines color="rgba(255,255,255,0.03)" opacity={0.45} />
      <VignetteOverlay strength={0.58} />
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <SlashDivider color={`${homeTheme.colors.primary}10`} width={2} angle={-24} />
      <SlashDivider color={`${awayTheme.colors.secondary}08`} width={2} angle={24} />

      <AbsoluteFill style={{padding: "120px 112px 132px", justifyContent: "center"}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            transform: `translateY(${interpolate(reveal, [0, 1], [30, 0])}px)`,
            opacity: reveal,
          }}
        >
          <Img
            src={staticFile(homeTheme.assets.logo)}
            style={{width: 112, height: 112}}
          />
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 94,
              lineHeight: 0.92,
            }}
          >
            谁先把自己的
            <br />
            节奏钉死？
          </div>
          <Img
            src={staticFile(awayTheme.assets.logo)}
            style={{width: 112, height: 112}}
          />
        </div>

        <div
          style={{
            marginTop: 28,
            color: "rgba(244,239,230,0.82)",
            fontSize: 34,
            fontWeight: 700,
            maxWidth: 1160,
            lineHeight: 1.14,
            opacity: interpolate(frame, [14, 32], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          波士顿更完整，但费城不是没机会。关键不是名气，而是谁先让对手跟着自己的第一拍走。
        </div>

        <div
          style={{
            marginTop: 30,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          {[data.schedule.game, data.schedule.date, data.schedule.tipoff, data.schedule.venue].map((chip) => (
            <div
              key={chip}
              style={{
                padding: "12px 18px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(7,17,27,0.72)",
                color: neutral.cream,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 34,
            padding: "22px 24px",
            background: "rgba(4,11,19,0.72)",
            borderLeft: `8px solid ${awayTheme.colors.secondary}`,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              color: neutral.cream,
              fontSize: 40,
              fontWeight: 900,
              lineHeight: 1.06,
            }}
          >
            你站哪边？
          </div>
          <div
            style={{
              marginTop: 10,
              color: "rgba(244,239,230,0.68)",
              fontSize: 22,
              lineHeight: 1.16,
            }}
          >
            评论区写下你的预测: 凯尔特人稳过，还是 76 人把悬念拖出来？
          </div>
        </div>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.teams.home.name} vs ${data.teams.away.shortName}`}
        center="评论区给出你的判断"
        right="你站哪边？"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress
        activeIndex={3}
        durationInFrames={durationInFrames}
        homeTheme={homeTheme}
        labels={["开场", "球星", "胜负手", "结论"]}
      />
    </AbsoluteFill>
  );
};
