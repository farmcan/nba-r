import React from "react";
import {CameraMotionBlur} from "@remotion/motion-blur";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupEdge, MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

const EdgePanel: React.FC<{
  edge: MatchupEdge;
  index: number;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({edge, index, homeTheme, awayTheme}) => {
  const frame = useCurrentFrame();
  const theme = resolveTheme(edge.teamId, homeTheme, awayTheme);
  const accent = theme ? theme.colors.primary : awayTheme.colors.secondary;
  const fromX = index === 0 ? -220 : index === 2 ? 220 : 0;
  const fromY = index === 1 ? 120 : 0;
  const progress = interpolate(frame, [index * 7, 28 + index * 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [fromX, 0]);
  const y = interpolate(progress, [0, 1], [fromY, 0]);

  return (
    <div
      style={{
        minHeight: 400,
        padding: "30px 32px",
        background: "rgba(7,14,22,0.8)",
        borderTop: `10px solid ${accent}`,
        boxShadow: `0 28px 80px ${accent}22`,
        transform: `translate(${x}px, ${y}px) rotate(${index === 1 ? 0 : index === 0 ? -2.5 : 2.5}deg)`,
      }}
    >
      <div
        style={{
          color: accent,
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        {edge.eyebrow}
      </div>
      <div
        style={{
          marginTop: 16,
          color: neutral.cream,
          fontFamily: '"Anton", sans-serif',
          fontSize: 64,
          lineHeight: 0.92,
          textTransform: "uppercase",
        }}
      >
        {edge.headline}
      </div>
      <div
        style={{
          marginTop: 16,
          color: "rgba(244,239,230,0.84)",
          fontSize: 30,
          lineHeight: 1.1,
        }}
      >
        {edge.body}
      </div>
    </div>
  );
};

export const MatchupEdgesScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({data, homeTheme, awayTheme}) => {
  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.24),
        getSceneTint(awayTheme, 0.2),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill style={{padding: "110px 86px 120px"}}>
        <div style={{display: "grid", gridTemplateColumns: "560px 1fr", gap: 32}}>
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
              What swings it
            </div>
            <div
              style={{
                marginTop: 20,
                color: neutral.cream,
                fontFamily: '"Anton", sans-serif',
                fontSize: 122,
                lineHeight: 0.84,
                textTransform: "uppercase",
              }}
            >
              REAL
              <br />
              SERIES
              <br />
              EDGES
            </div>
            <div
              style={{
                marginTop: 26,
                padding: "24px 26px",
                background: "rgba(4,11,19,0.7)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <div
                style={{
                  color: neutral.sky,
                  fontSize: 22,
                  fontWeight: 800,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                }}
              >
                {data.sourceSlate.title}
              </div>
              <div
                style={{
                  marginTop: 14,
                  color: neutral.cream,
                  fontSize: 28,
                  lineHeight: 1.1,
                }}
              >
                {data.sourceSlate.body}
              </div>
            </div>
          </div>
          <CameraMotionBlur shutterAngle={170} samples={8}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 24,
                alignItems: "end",
              }}
            >
              {data.matchupEdges.map((edge, index) => (
                <EdgePanel
                  key={edge.eyebrow}
                  edge={edge}
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
        left="Official playoff preview"
        center="Injury report and matchup structure"
        right={`${data.sources.length} sourced references`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
    </AbsoluteFill>
  );
};

