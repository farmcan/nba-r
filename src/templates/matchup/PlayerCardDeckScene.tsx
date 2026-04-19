import React from "react";
import {CameraMotionBlur} from "@remotion/motion-blur";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData, PlayerCard} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

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
  const x = interpolate(enter, [0, 1], [fromLeft ? -180 : 180, 0]);
  const y = interpolate(enter, [0, 1], [90 + index * 12, 0]);
  const rotate = interpolate(enter, [0, 1], [fromLeft ? -9 : 9, index < 2 ? -3 : 3]);
  const scale = interpolate(enter, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        minHeight: 300,
        padding: 16,
        background: "rgba(6,14,22,0.84)",
        border: `2px solid ${theme.colors.primary}`,
        boxShadow: `0 34px 90px ${theme.colors.primary}33`,
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "180px 1fr",
            gap: 18,
            minHeight: 268,
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: `linear-gradient(180deg, ${theme.colors.primary}66, rgba(255,255,255,0.06))`,
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
                left: 12,
                top: 12,
                padding: "10px 14px",
                background: theme.colors.secondary,
                color: theme.colors.ink,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {card.badge}
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div>
              <div
                style={{
                  color: neutral.cream,
                  fontFamily: '"Anton", sans-serif',
                  fontSize: 48,
                  lineHeight: 0.92,
                  textTransform: "uppercase",
                }}
              >
                {card.name}
              </div>
              <div
                style={{
                  marginTop: 8,
                  color: theme.colors.accent,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {theme.city} {theme.name}
              </div>
              <div
                style={{
                  marginTop: 18,
                  display: "inline-block",
                  padding: "12px 16px",
                  background: `${theme.colors.primary}26`,
                  color: neutral.cream,
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {card.stat}
              </div>
              <div
                style={{
                  marginTop: 18,
                  color: "rgba(244,239,230,0.86)",
                  fontSize: 22,
                  lineHeight: 1.08,
                }}
              >
                {card.note}
              </div>
            </div>
            <div
              style={{
                color: "rgba(244,239,230,0.52)",
                fontSize: 16,
                letterSpacing: 1.4,
                textTransform: "uppercase",
              }}
            >
              Source: {card.sourceLabel}
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
}> = ({data, homeTheme, awayTheme}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, 140], [360, -220], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(awayTheme, 0.22),
        getSceneTint(homeTheme, 0.26),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <div
        style={{
          position: "absolute",
          left: sweep,
          top: 98,
          width: 420,
          height: 920,
          background: `linear-gradient(180deg, ${homeTheme.colors.primary}18, transparent)`,
          transform: "skewX(-18deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: sweep - 120,
          top: 40,
          width: 340,
          height: 940,
          background: `linear-gradient(180deg, ${awayTheme.colors.secondary}18, transparent)`,
          transform: "skewX(18deg)",
        }}
      />
      <AbsoluteFill style={{padding: "92px 74px 110px"}}>
        <div style={{display: "flex", flexDirection: "column", gap: 30}}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "820px 1fr",
              gap: 32,
              alignItems: "end",
            }}
          >
            <div>
            <div
              style={{
                color: neutral.sky,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 8,
                textTransform: "uppercase",
              }}
            >
              Primary creators
            </div>
            <div
              style={{
                marginTop: 20,
                color: neutral.cream,
                fontFamily: '"Anton", sans-serif',
                fontSize: 130,
                lineHeight: 0.84,
                textTransform: "uppercase",
              }}
            >
              STAR
              CARD
              GRID
            </div>
            </div>
            <div
              style={{
                color: "rgba(244,239,230,0.84)",
                fontSize: 28,
                lineHeight: 1.12,
                paddingBottom: 18,
              }}
            >
              A broadcast-style flat layout with staggered entrances, glow edges and stat chips.
              Same data model, stronger presentation layer.
            </div>
          </div>
          <CameraMotionBlur shutterAngle={150} samples={6}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 20,
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
        </div>
      </AbsoluteFill>
      <BottomTicker
        left={`${data.playerCards[0]?.name} • ${data.playerCards[1]?.name}`}
        center="Flat hero cards with stagger + trail"
        right={`${data.playerCards[2]?.name} • ${data.playerCards[3]?.name}`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
    </AbsoluteFill>
  );
};
