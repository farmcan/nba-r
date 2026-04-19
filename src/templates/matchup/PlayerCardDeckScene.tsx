import React from "react";
import {CameraMotionBlur} from "@remotion/motion-blur";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData, PlayerCard} from "../../types/matchup";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  NBAScoreBug,
  SceneChrome,
  SceneProgress,
  VignetteOverlay,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
  SlashDivider,
} from "./shared";

// Parse stat string to extract numbers for animation
const parseStats = (stat: string): {value: number; suffix: string}[] => {
  const parts: {value: number; suffix: string}[] = [];
  const regex = /(\d+\.?\d*)\s*([^\d•]+?)(?:\s*•\s*|$)/g;
  let match;
  while ((match = regex.exec(stat)) !== null) {
    parts.push({value: parseFloat(match[1]), suffix: match[2].trim()});
  }
  return parts.length > 0 ? parts : [{value: 0, suffix: stat}];
};

// Animated stat number that counts up
const AnimatedStat: React.FC<{
  stat: string;
  animDelay: number;
  accent: string;
}> = ({stat, animDelay, accent}) => {
  const frame = useCurrentFrame();
  const statParts = parseStats(stat);

  return (
    <div
      style={{
        marginTop: 14,
        display: "flex",
        gap: 4,
        alignItems: "baseline",
        flexWrap: "wrap",
      }}
    >
      {statParts.map((part, i) => {
        const countValue = interpolate(
          frame,
          [animDelay, animDelay + 28],
          [0, part.value],
          {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
        );
        const displayValue = part.value % 1 !== 0
          ? countValue.toFixed(1)
          : Math.round(countValue);
        return (
          <React.Fragment key={i}>
            {i > 0 && <span style={{color: "rgba(244,239,230,0.3)", fontSize: 16, margin: "0 2px"}}>/</span>}
            <span style={{
              color: neutral.cream,
              fontSize: 32,
              fontWeight: 900,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}>
              {displayValue}
            </span>
            <span style={{
              color: "rgba(244,239,230,0.55)",
              fontSize: 18,
              fontWeight: 600,
            }}>
              {part.suffix}
            </span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const PlayerCardPanel: React.FC<{
  card: PlayerCard;
  index: number;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({card, index, homeTheme, awayTheme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = resolveTheme(card.teamId, homeTheme, awayTheme) ?? homeTheme;
  const enter = spring({
    fps,
    frame: Math.max(0, frame - index * 6),
    config: {damping: 15, stiffness: 130, mass: 0.85},
  });
  const fromLeft = index % 2 === 0;
  const x = interpolate(enter, [0, 1], [fromLeft ? -120 : 120, 0]);
  const y = interpolate(enter, [0, 1], [50 + index * 8, 0]);
  const scale = interpolate(enter, [0, 1], [0.92, 1]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: 240,
        background: "rgba(6,14,22,0.88)",
        border: `1px solid ${theme.colors.primary}44`,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: `0 20px 60px ${theme.colors.primary}22`,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        opacity: interpolate(enter, [0, 1], [0, 1]),
      }}
    >
      {/* Player image */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, ${theme.colors.primary}55, rgba(255,255,255,0.04))`,
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
        {/* Badge overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "10px 14px",
            background: `linear-gradient(180deg, rgba(7,17,27,0.85), transparent)`,
          }}
        >
          <div style={{
            padding: "4px 10px",
            background: theme.colors.primary,
            color: theme.colors.ink ?? "#07111B",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            borderRadius: 3,
            display: "inline-block",
          }}>
            {card.badge}
          </div>
        </div>
      </div>

      {/* Card info */}
      <div style={{padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
        <div>
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 30,
              lineHeight: 1.05,
            }}
          >
            {card.name}
          </div>
          <div
            style={{
              marginTop: 4,
              color: theme.colors.accent ?? theme.colors.primary,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
          >
            {theme.city} {theme.name}
          </div>
          <AnimatedStat
            stat={card.stat}
            animDelay={index * 6 + 12}
            accent={theme.colors.primary}
          />
        </div>
        <div
          style={{
            marginTop: 10,
            color: "rgba(244,239,230,0.75)",
            fontSize: 15,
            lineHeight: 1.2,
          }}
        >
          {card.note}
        </div>
      </div>
    </div>
  );
};

export const PlayerCardDeckScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, 140], [360, -220], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(awayTheme, 0.12),
        getSceneTint(homeTheme, 0.16),
      )}
    >
      {/* Court photo background */}
      <CourtBg src="assets/court.jpg" opacity={0.08} />
      <CourtLines color="rgba(255,255,255,0.03)" opacity={0.5} />
      <VignetteOverlay strength={0.55} />

      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />

      {/* Sweep light effect */}
      <div
        style={{
          position: "absolute",
          left: sweep,
          top: 98,
          width: 200,
          height: 920,
          background: `linear-gradient(180deg, ${homeTheme.colors.primary}12, transparent)`,
          transform: "skewX(-18deg)",
        }}
      />
      <SlashDivider color={`${homeTheme.colors.primary}08`} width={2} angle={-25} />
      <SlashDivider color={`${awayTheme.colors.secondary}06`} width={2} angle={25} />

      <AbsoluteFill style={{padding: "72px 74px 110px"}}>
        {/* Header — compact, top-right aligned */}
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24}}>
          <div>
            <div
              style={{
                color: neutral.sky,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              PLAYER CARDS
            </div>
            <div
              style={{
                marginTop: 6,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 56,
                lineHeight: 1,
              }}
            >
              核心球星
            </div>
          </div>
          <div
            style={{
              color: "rgba(244,239,230,0.6)",
              fontSize: 18,
              lineHeight: 1.2,
              maxWidth: 420,
              textAlign: "right",
            }}
          >
            四卡平铺 + 分批进场，让信息密度和视觉冲击一起成立
          </div>
        </div>

        {/* 2x2 card grid */}
        <CameraMotionBlur shutterAngle={150} samples={6}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 18,
            }}
          >
            {data.playerCards.map((card, index) => (
              <PlayerCardPanel
                key={card.name}
                card={card}
                index={index}
                homeTheme={homeTheme}
                awayTheme={awayTheme}
              />
            ))}
          </div>
        </CameraMotionBlur>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.playerCards[0]?.name} • ${data.playerCards[1]?.name}`}
        center="核心球星卡"
        right={`${data.playerCards[2]?.name} • ${data.playerCards[3]?.name}`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={2} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
