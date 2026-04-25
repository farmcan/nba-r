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
} from "./shared";

const parseStats = (stat: string): {value: string; suffix: string}[] => {
  const parts: {value: string; suffix: string}[] = [];
  const regex = /(\d+\.?\d*)\s*([^\d•]+?)(?:\s*•\s*|$)/g;
  let match;
  while ((match = regex.exec(stat)) !== null) {
    parts.push({value: match[1], suffix: match[2].trim()});
  }

  return parts.length > 0 ? parts : [{value: stat, suffix: ""}];
};

const cardSkins = [
  {label: "PULSE", finish: "REFRACTOR", accentShift: 0.24},
  {label: "BASELINE", finish: "CHROME", accentShift: 0.18},
  {label: "ELECTRIC", finish: "PRISM", accentShift: 0.3},
  {label: "HEADLINER", finish: "FOIL", accentShift: 0.22},
];

const PlayerInsertCard: React.FC<{
  card: PlayerCard;
  index: number;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  homeSeed: number;
  awaySeed: number;
}> = ({card, index, homeTheme, awayTheme, homeSeed, awaySeed}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const theme = resolveTheme(card.teamId, homeTheme, awayTheme) ?? homeTheme;
  const reveal = spring({
    fps,
    frame: Math.max(0, frame - index * 7),
    config: {damping: 15, stiffness: 135, mass: 0.82},
  });
  const hover = Math.sin((frame + index * 7) / 18) * 8;
  const glint = interpolate(frame, [18 + index * 12, 82 + index * 12], [-240, 420], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tilt = [-11, -4, 4, 11][index] ?? 0;
  const xBase = [-180, -56, 56, 180][index] ?? 0;
  const yBase = [38, 0, 0, 38][index] ?? 0;
  const skin = cardSkins[index] ?? cardSkins[0];
  const stats = parseStats(card.stat);

  return (
    <div
      style={{
        position: "relative",
        width: 356,
        height: 560,
        borderRadius: 28,
        overflow: "hidden",
        transform: `translate(${interpolate(reveal, [0, 1], [xBase * 1.8, xBase])}px, ${
          interpolate(reveal, [0, 1], [yBase + 46, yBase + hover])
        }px) rotate(${interpolate(reveal, [0, 1], [tilt * 1.8, tilt])}deg) scale(${interpolate(reveal, [
          0,
          1,
        ], [0.8, 1])})`,
        opacity: interpolate(reveal, [0, 1], [0, 1]),
        boxShadow: `0 42px 100px ${theme.colors.primary}26, 0 20px 45px rgba(0,0,0,0.25)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 28,
          padding: 2,
          background: `linear-gradient(145deg, ${theme.colors.accent}, ${theme.colors.primary}, ${theme.colors.secondary})`,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 26,
            overflow: "hidden",
            background: [
              `radial-gradient(circle at 18% 8%, ${theme.colors.primary}55 0%, transparent 34%)`,
              `radial-gradient(circle at 84% 16%, ${theme.colors.secondary}4a 0%, transparent 36%)`,
              "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.02) 24%, rgba(7,17,27,0.92) 45%, rgba(7,17,27,0.98) 100%)",
            ].join(", "),
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.11) 0%, transparent 12%, transparent 80%, rgba(255,255,255,0.04) 100%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 16,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: glint,
              top: -70,
              width: 150,
              height: 720,
              background:
                "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.32) 40%, rgba(255,255,255,0.06) 70%, transparent 100%)",
              transform: "rotate(16deg)",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              opacity: skin.accentShift,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              top: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 3,
            }}
          >
            <div
              style={{
                padding: "7px 12px",
                borderRadius: 999,
                background: `${theme.colors.primary}2a`,
                border: `1px solid ${theme.colors.primary}55`,
                color: neutral.cream,
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 1.4,
              }}
            >
              {skin.label}
            </div>
            <div style={{color: "rgba(244,239,230,0.48)", fontSize: 11, fontWeight: 800, letterSpacing: 1.4}}>
              #{String(index + 1).padStart(2, "0")} / 99
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 22,
              right: 22,
              top: 68,
              height: 262,
              borderRadius: 22,
              background: `radial-gradient(circle at 50% 18%, ${theme.colors.primary}48 0%, rgba(255,255,255,0.02) 58%, transparent 100%)`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 12%, transparent 35%, transparent 100%)",
              }}
            />
            <Img
              src={staticFile(card.image)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center bottom",
                filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.35))",
                transform: `translateY(${interpolate(reveal, [0, 1], [34, 0])}px) scale(${interpolate(reveal, [
                  0,
                  1,
                ], [0.92, 1])})`,
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 22,
              right: 22,
              bottom: 24,
              display: "grid",
              gap: 14,
            }}
          >
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12}}>
              <div>
                <div
                  style={{
                    color: neutral.cream,
                    fontFamily: '"Noto Sans SC", sans-serif',
                    fontWeight: 900,
                    fontSize: 33,
                    lineHeight: 1,
                  }}
                >
                  {card.name}
                </div>
                <div
                  style={{
                    marginTop: 6,
                    color: theme.colors.accent,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                  }}
                >
                  {theme.city} {theme.name} • {skin.finish}
                </div>
              </div>
              <div
                style={{
                  minWidth: 62,
                  padding: "10px 10px 8px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: "center",
                }}
              >
                <div style={{color: "rgba(244,239,230,0.45)", fontSize: 10, fontWeight: 800, letterSpacing: 1.2}}>
                  SEED
                </div>
                <div style={{color: neutral.cream, fontSize: 28, fontWeight: 900, lineHeight: 1}}>
                  {card.teamId === homeTheme.teamId ? homeSeed : awaySeed}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "14px 14px 12px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{color: "rgba(244,239,230,0.48)", fontSize: 11, fontWeight: 800, letterSpacing: 1.4}}>
                FEATURE TAG
              </div>
              <div style={{marginTop: 8, color: neutral.cream, fontSize: 21, fontWeight: 900, lineHeight: 1.05}}>
                {card.badge}
              </div>
              <div style={{marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8}}>
                {stats.map((part) => (
                  <div
                    key={`${card.name}-${part.suffix}`}
                    style={{
                      padding: "10px 8px",
                      borderRadius: 14,
                      background: `${theme.colors.primary}14`,
                      border: `1px solid ${theme.colors.primary}33`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: neutral.cream,
                        fontSize: 26,
                        fontWeight: 900,
                        fontVariantNumeric: "tabular-nums",
                        lineHeight: 1,
                      }}
                    >
                      {part.value}
                    </div>
                    <div style={{marginTop: 4, color: "rgba(244,239,230,0.56)", fontSize: 11, fontWeight: 700}}>
                      {part.suffix || "VALUE"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "14px 16px",
                borderRadius: 18,
                background: "rgba(7,17,27,0.7)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(244,239,230,0.76)",
                fontSize: 14,
                lineHeight: 1.22,
              }}
            >
              {card.note}
            </div>
          </div>
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
  const titleReveal = spring({
    fps: 30,
    frame,
    config: {damping: 16, stiffness: 120, mass: 0.82},
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(awayTheme, 0.14),
        getSceneTint(homeTheme, 0.2),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.08} scale={1.12} />
      <CourtLines color="rgba(255,255,255,0.028)" opacity={0.44} />
      <VignetteOverlay strength={0.62} />

      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />

      <div
        style={{
          position: "absolute",
          left: 84,
          top: 132,
          color: `${homeTheme.colors.primary}15`,
          fontSize: 210,
          fontWeight: 900,
          lineHeight: 0.82,
          letterSpacing: -4,
        }}
      >
        INSERT
      </div>
      <div
        style={{
          position: "absolute",
          right: 84,
          bottom: 110,
          color: `${awayTheme.colors.secondary}12`,
          fontSize: 180,
          fontWeight: 900,
          lineHeight: 0.82,
          letterSpacing: -4,
        }}
      >
        SET
      </div>

      <AbsoluteFill style={{padding: "74px 72px 112px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            opacity: titleReveal,
            transform: `translateY(${interpolate(titleReveal, [0, 1], [28, 0])}px)`,
          }}
        >
          <div>
            <div style={{color: neutral.sky, fontSize: 18, fontWeight: 800, letterSpacing: 4}}>
              COLLECTOR EDITION
            </div>
            <div
              style={{
                marginTop: 10,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 82,
                lineHeight: 0.96,
              }}
            >
              这轮系列赛
              <br />
              核心四卡
            </div>
          </div>

          <div
            style={{
              width: 420,
              padding: "18px 20px",
              borderRadius: 24,
              background: "rgba(7,17,27,0.64)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(244,239,230,0.72)",
              fontSize: 18,
              lineHeight: 1.18,
            }}
          >
            不再是四块信息面板，而是四张能直接定义比赛气质的球星插卡。
          </div>
        </div>

        <CameraMotionBlur shutterAngle={140} samples={6}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 210,
              transform: "translateX(-50%)",
              width: 1480,
              height: 720,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.playerCards.map((card, index) => (
              <PlayerInsertCard
                key={card.name}
                card={card}
                index={index}
                homeTheme={homeTheme}
                awayTheme={awayTheme}
                homeSeed={data.teams.home.seed}
                awaySeed={data.teams.away.seed}
              />
            ))}
          </div>
        </CameraMotionBlur>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.playerCards[0]?.name} • ${data.playerCards[1]?.name}`}
        center="INSERT SET / CORE FOUR"
        right={`${data.playerCards[2]?.name} • ${data.playerCards[3]?.name}`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={2} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
