import React from "react";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  SceneProgress,
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
  const spread = interpolate(reveal, [0, 1], [180, 0]);

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.28),
        getSceneTint(awayTheme, 0.24),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill style={{justifyContent: "center", alignItems: "center", padding: "100px 140px"}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 44,
            opacity: reveal,
          }}
        >
          <Img
            src={staticFile(homeTheme.assets.logo)}
            style={{width: 176, height: 176, transform: `translateX(${-spread}px)`}}
          />
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 132,
              lineHeight: 0.96,
              textAlign: "center",
            }}
          >
            {data.schedule.game}
            <br />
            比赛前瞻
          </div>
          <Img
            src={staticFile(awayTheme.assets.logo)}
            style={{width: 176, height: 176, transform: `translateX(${spread}px)`}}
          />
        </div>
        <div
          style={{
            marginTop: 24,
            color: neutral.sky,
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: 1,
            opacity: reveal,
          }}
        >
          {data.schedule.date} • {data.schedule.tipoff} • {data.schedule.venue}
        </div>
        <div
          style={{
            marginTop: 40,
            width: 1220,
            padding: "28px 32px",
            background: "rgba(4,11,19,0.72)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "rgba(244,239,230,0.88)",
            fontSize: 30,
            lineHeight: 1.14,
            textAlign: "center",
          }}
        >
          {data.closingNote}
        </div>
      </AbsoluteFill>
      <BottomTicker
        left="可复用对阵模板"
        center={`${data.sources.length} 个真实来源`}
        right="Remotion 渲染完成"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={4} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
