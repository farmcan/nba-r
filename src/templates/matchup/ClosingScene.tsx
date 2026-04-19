import React from "react";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  FloatingOrbs,
  SceneProgress,
  SlashDivider,
  VignetteOverlay,
  getSceneTint,
  neutral,
  sceneBackground,
} from "./shared";

export const ClosingScene: React.FC<{
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
    config: {damping: 15, stiffness: 125, mass: 0.9},
  });
  const spread = interpolate(reveal, [0, 1], [120, 0]);

  const promptOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const promptY = interpolate(frame, [25, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const totalSeeds = data.teams.home.seed + data.teams.away.seed;
  const homePct = (data.teams.away.seed / totalSeeds) * 100;
  const barWidth = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.16),
        getSceneTint(awayTheme, 0.12),
      )}
    >
      {/* Arena background */}
      <CourtBg src="assets/court.jpg" opacity={0.1} />
      <CourtLines color="rgba(255,255,255,0.03)" opacity={0.4} />
      <FloatingOrbs colors={[homeTheme.colors.primary, awayTheme.colors.secondary, "#F4B63D", "#fff"]} count={4} opacity={0.1} />
      <VignetteOverlay strength={0.6} />

      <SlashDivider color={`${homeTheme.colors.primary}08`} width={2} angle={-20} />
      <SlashDivider color={`${awayTheme.colors.secondary}06`} width={2} angle={20} />

      <AbsoluteFill style={{justifyContent: "center", alignItems: "center", padding: "100px 140px"}}>
        {/* Logos and title */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            opacity: reveal,
          }}
        >
          <Img
            src={staticFile(homeTheme.assets.logo)}
            style={{width: 140, height: 140, transform: `translateX(${-spread}px)`}}
          />
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 100,
              lineHeight: 0.96,
              textAlign: "center",
            }}
          >
            {data.schedule.game}
            <br />
            前瞻
          </div>
          <Img
            src={staticFile(awayTheme.assets.logo)}
            style={{width: 140, height: 140, transform: `translateX(${spread}px)`}}
          />
        </div>

        {/* Schedule chips */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 12,
            opacity: reveal,
          }}
        >
          {[data.schedule.date, data.schedule.tipoff, data.schedule.venue].map((chip) => (
            <div
              key={chip}
              style={{
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(7,17,27,0.7)",
                color: neutral.cream,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 1,
                borderRadius: 4,
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Seed comparison bar */}
        <div
          style={{
            marginTop: 30,
            width: 560,
            opacity: barWidth,
          }}
        >
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6}}>
            <span style={{color: homeTheme.colors.primary, fontSize: 15, fontWeight: 800}}>
              {data.teams.home.name} #{data.teams.home.seed}
            </span>
            <span style={{color: awayTheme.colors.secondary, fontSize: 15, fontWeight: 800}}>
              {data.teams.away.name} #{data.teams.away.seed}
            </span>
          </div>
          <div style={{
            height: 6,
            borderRadius: 3,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
            display: "flex",
          }}>
            <div style={{
              width: `${homePct}%`,
              height: "100%",
              background: homeTheme.colors.primary,
              borderRadius: "3px 0 0 3px",
            }} />
            <div style={{
              flex: 1,
              height: "100%",
              background: awayTheme.colors.secondary,
              borderRadius: "0 3px 3px 0",
            }} />
          </div>
        </div>

        {/* Interactive prompt */}
        <div
          style={{
            marginTop: 34,
            textAlign: "center",
            opacity: promptOpacity,
            transform: `translateY(${promptY}px)`,
          }}
        >
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 48,
              lineHeight: 1.1,
            }}
          >
            你觉得谁能赢？
          </div>
          <div
            style={{
              marginTop: 10,
              color: "rgba(244,239,230,0.55)",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            评论区留下你的预测
          </div>
        </div>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.teams.home.name} vs ${data.teams.away.name}`}
        center={`${data.schedule.matchup}`}
        right="评论区见"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={6} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
