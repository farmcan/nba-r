import React from "react";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  getSceneTint,
  neutral,
  sceneBackground,
} from "./shared";

export const ClosingScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({data, homeTheme, awayTheme}) => {
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
              fontFamily: '"Anton", sans-serif',
              fontSize: 178,
              lineHeight: 0.84,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {data.schedule.game}
            <br />
            PREVIEW
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
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
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
        left="Reusable matchup template"
        center={`${data.sources.length} verified references`}
        right="Rendered with Remotion"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
    </AbsoluteFill>
  );
};
