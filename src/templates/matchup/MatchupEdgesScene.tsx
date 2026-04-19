import React from "react";
import {CameraMotionBlur} from "@remotion/motion-blur";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupEdge, MatchupPreviewData} from "../../types/matchup";
import {
  AmbientGrid,
  BottomTicker,
  CourtBg,
  CourtLines,
  FloatingOrbs,
  NBAScoreBug,
  SceneChrome,
  SceneProgress,
  SlashDivider,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

const AdvantageBar: React.FC<{
  label: string;
  homeTeam: string;
  awayTeam: string;
  homeAdvantage: number;
  homeColor: string;
  awayColor: string;
  delay: number;
}> = ({label, homeTeam, awayTeam, homeAdvantage, homeColor, awayColor, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: {damping: 18, stiffness: 140, mass: 0.7},
  });
  const currentHome = homeAdvantage * reveal;

  return (
    <div style={{opacity: reveal, transform: `translateY(${(1 - reveal) * 8}px)`}}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4,
        fontSize: 13,
        fontWeight: 700,
      }}>
        <span style={{color: homeColor}}>{homeTeam}</span>
        <span style={{color: neutral.cream, fontSize: 12, fontWeight: 600, opacity: 0.7}}>{label}</span>
        <span style={{color: awayColor}}>{awayTeam}</span>
      </div>
      <div style={{
        height: 4,
        borderRadius: 2,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        display: "flex",
      }}>
        <div style={{
          width: `${currentHome}%`,
          height: "100%",
          background: homeColor,
          borderRadius: "2px 0 0 2px",
        }} />
        <div style={{
          width: `${100 - currentHome}%`,
          height: "100%",
          background: awayColor,
          borderRadius: "0 2px 2px 0",
        }} />
      </div>
    </div>
  );
};

const EdgePanel: React.FC<{
  edge: MatchupEdge;
  index: number;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({edge, index, homeTheme, awayTheme}) => {
  const frame = useCurrentFrame();
  const theme = resolveTheme(edge.teamId, homeTheme, awayTheme);
  const accent = theme ? theme.colors.primary : awayTheme.colors.secondary;
  const fromX = index === 0 ? -180 : index === 2 ? 180 : 0;
  const fromY = index === 1 ? 80 : 0;
  const progress = interpolate(frame, [index * 7, 28 + index * 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [fromX, 0]);
  const y = interpolate(progress, [0, 1], [fromY, 0]);

  return (
    <div
      style={{
        minHeight: 340,
        padding: "24px 26px",
        background: "rgba(7,14,22,0.75)",
        borderTop: `6px solid ${accent}`,
        borderRadius: "0 0 6px 6px",
        boxShadow: `0 20px 60px ${accent}18`,
        transform: `translate(${x}px, ${y}px) rotate(${index === 1 ? 0 : index === 0 ? -1.5 : 1.5}deg)`,
      }}
    >
      <div style={{color: accent, fontSize: 16, fontWeight: 800, letterSpacing: 1}}>
        {edge.eyebrow}
      </div>
      <div
        style={{
          marginTop: 10,
          color: neutral.cream,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 38,
          lineHeight: 1.05,
        }}
      >
        {edge.headline}
      </div>
      <div
        style={{
          marginTop: 12,
          color: "rgba(244,239,230,0.8)",
          fontSize: 20,
          lineHeight: 1.15,
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
        getSceneTint(homeTheme, 0.12),
        getSceneTint(awayTheme, 0.1),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.06} />
      <CourtLines color="rgba(255,255,255,0.02)" opacity={0.3} />
      <FloatingOrbs colors={[homeTheme.colors.primary, awayTheme.colors.secondary]} count={2} opacity={0.06} />
      <AmbientGrid baseOpacity={0.03} cellSize={64} />

      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />
      <SlashDivider color={`${homeTheme.colors.primary}06`} width={1.5} angle={-22} />

      <AbsoluteFill style={{padding: "86px 86px 120px"}}>
        <div style={{display: "grid", gridTemplateColumns: "460px 1fr", gap: 28}}>
          {/* Left: Title + advantage bars */}
          <div>
            <div style={{color: neutral.sky, fontSize: 18, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase"}}>
              KEY EDGES
            </div>
            <div
              style={{
                marginTop: 6,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 64,
                lineHeight: 0.98,
              }}
            >
              真正决定
              <br />
              走势的三个点
            </div>
            <div
              style={{
                marginTop: 20,
                padding: "16px 18px",
                background: "rgba(4,11,19,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
              }}
            >
              <div style={{color: neutral.sky, fontSize: 14, fontWeight: 800, letterSpacing: 1, marginBottom: 12}}>
                关键对位 · MATCHUP ADVANTAGE
              </div>
              <div style={{display: "grid", gap: 10}}>
                <AdvantageBar
                  label="阵容深度"
                  homeTeam="波士顿"
                  awayTeam="费城"
                  homeAdvantage={72}
                  homeColor={homeTheme.colors.primary}
                  awayColor={awayTheme.colors.secondary}
                  delay={20}
                />
                <AdvantageBar
                  label="爆点能力"
                  homeTeam="波士顿"
                  awayTeam="费城"
                  homeAdvantage={45}
                  homeColor={homeTheme.colors.primary}
                  awayColor={awayTheme.colors.secondary}
                  delay={30}
                />
                <AdvantageBar
                  label="季后赛经验"
                  homeTeam="波士顿"
                  awayTeam="费城"
                  homeAdvantage={68}
                  homeColor={homeTheme.colors.primary}
                  awayColor={awayTheme.colors.secondary}
                  delay={40}
                />
                <AdvantageBar
                  label="不稳定因素"
                  homeTeam="波士顿"
                  awayTeam="费城"
                  homeAdvantage={35}
                  homeColor={homeTheme.colors.primary}
                  awayColor={awayTheme.colors.secondary}
                  delay={50}
                />
              </div>
            </div>
          </div>

          {/* Right: Edge panels */}
          <CameraMotionBlur shutterAngle={170} samples={8}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 18,
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
        right="关键对位优劣势"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={3} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
