import React from "react";
import {CameraMotionBlur} from "@remotion/motion-blur";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupEdge, MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  SceneProgress,
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
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: 1,
        }}
      >
        {edge.eyebrow}
      </div>
      <div
        style={{
          marginTop: 16,
          color: neutral.cream,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 50,
          lineHeight: 1.02,
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
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
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
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              胜负手
            </div>
            <div
              style={{
                marginTop: 20,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 86,
                lineHeight: 0.98,
              }}
            >
              真正决定
              <br />
              这轮走势的
              <br />
              三个点
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
                  letterSpacing: 1,
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
        left="官方季后赛前瞻"
        center="伤病信息 + 对位结构"
        right={`${data.sources.length} 个已落地来源`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={3} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
