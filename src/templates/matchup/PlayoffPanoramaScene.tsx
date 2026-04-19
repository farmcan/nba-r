import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {BracketSeries, MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  SceneProgress,
  getSceneTint,
  neutral,
  sceneBackground,
} from "./shared";

const SeriesNode: React.FC<{
  series: BracketSeries;
  index: number;
  isFocus: boolean;
}> = ({series, index, isFocus}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [index * 4, 30 + index * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(progress, [0, 1], [30, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const accent = isFocus ? "#F5EFE0" : "rgba(255,255,255,0.18)";
  return (
    <div
      style={{
        padding: "18px 20px",
        background: isFocus ? "rgba(245,239,230,0.08)" : "rgba(4,11,19,0.72)",
        border: `1px solid ${accent}`,
        boxShadow: isFocus ? "0 20px 50px rgba(245,239,230,0.12)" : "none",
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div style={{display: "flex", justifyContent: "space-between", color: isFocus ? neutral.cream : "rgba(244,239,230,0.72)"}}>
        <div style={{fontSize: 18, fontWeight: 800}}>{series.slot}</div>
        <div style={{fontSize: 18, fontWeight: 700}}>{series.status}</div>
      </div>
      <div style={{marginTop: 12, display: "grid", gap: 10}}>
        {[series.topTeam, series.bottomTeam].map((team) => (
          <div
            key={team.label}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr 40px",
              gap: 10,
              alignItems: "center",
              color: neutral.cream,
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            <div style={{opacity: 0.65}}>#{team.seed}</div>
            <div>{team.label}</div>
            <div style={{textAlign: "right"}}>{team.wins}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PlayoffPanoramaScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const panorama = data.playoffPanorama;
  if (!panorama) {
    return null;
  }

  const east = panorama.series.filter((s) => s.conference === "east");
  const west = panorama.series.filter((s) => s.conference === "west");

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.26),
        getSceneTint(awayTheme, 0.22),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill style={{padding: "86px 70px 118px"}}>
        <div style={{display: "grid", gridTemplateColumns: "640px 1fr", gap: 30}}>
          <div>
            <div style={{color: neutral.sky, fontSize: 24, fontWeight: 800, letterSpacing: 2}}>
              当前季后赛全景
            </div>
            <div
              style={{
                marginTop: 18,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 86,
                lineHeight: 0.96,
              }}
            >
              先看树
              <br />
              再看这场
            </div>
            <div style={{marginTop: 22, color: "rgba(244,239,230,0.9)", fontSize: 30, lineHeight: 1.1}}>
              {panorama.overview}
            </div>
            <div
              style={{
                marginTop: 26,
                padding: "22px 24px",
                background: "rgba(4,11,19,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: neutral.cream,
                fontSize: 24,
                lineHeight: 1.12,
              }}
            >
              <div style={{fontWeight: 800, color: homeTheme.colors.secondary}}>东部</div>
              <div style={{marginTop: 10}}>{panorama.eastHeadline}</div>
              <div style={{marginTop: 18, fontWeight: 800, color: awayTheme.colors.secondary}}>西部</div>
              <div style={{marginTop: 10}}>{panorama.westHeadline}</div>
            </div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18}}>
            <div style={{display: "grid", gap: 14}}>
              <div style={{color: neutral.cream, fontSize: 26, fontWeight: 800}}>东部</div>
              {east.map((series, index) => (
                <SeriesNode
                  key={series.slot}
                  series={series}
                  index={index}
                  isFocus={series.slot === panorama.focusSeriesSlot}
                />
              ))}
            </div>
            <div style={{display: "grid", gap: 14}}>
              <div style={{color: neutral.cream, fontSize: 26, fontWeight: 800}}>西部</div>
              {west.map((series, index) => (
                <SeriesNode
                  key={series.slot}
                  series={series}
                  index={index + east.length}
                  isFocus={false}
                />
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <BottomTicker
        left={`快照时间 ${panorama.capturedAt}`}
        center="焦点系列已高亮"
        right={`${data.teams.home.name} vs ${data.teams.away.name}`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={0} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};

