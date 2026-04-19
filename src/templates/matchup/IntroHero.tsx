import React from "react";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  SceneProgress,
  TeamStrip,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

export const IntroHero: React.FC<{
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
    config: {damping: 14, stiffness: 120, mass: 0.8},
  });
  const courtPush = interpolate(frame, [0, 120], [1.14, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(reveal, [0, 1], [100, 0]);

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.34),
        getSceneTint(awayTheme, 0.3),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill>
        <Img
          src={staticFile("assets/court.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.16,
            transform: `scale(${courtPush})`,
          }}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: -80,
          top: 170,
          color: `${homeTheme.colors.primary}33`,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 184,
          lineHeight: 0.82,
          transform: "rotate(-90deg)",
          transformOrigin: "top left",
        }}
      >
        {data.teams.home.shortName}
      </div>
      <div
        style={{
          position: "absolute",
          right: -80,
          bottom: 140,
          color: `${awayTheme.colors.secondary}30`,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 172,
          lineHeight: 0.82,
          transform: "rotate(90deg)",
          transformOrigin: "bottom right",
        }}
      >
        {data.teams.away.name}
      </div>
      <TeamStrip data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill style={{padding: "120px 110px 120px", justifyContent: "center"}}>
        <div
          style={{
            color: neutral.sky,
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 2,
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {data.subtitle}
        </div>
        <div
          style={{
            marginTop: 22,
            color: neutral.cream,
            fontFamily: '"Noto Sans SC", sans-serif',
            fontWeight: 900,
            fontSize: 142,
            lineHeight: 0.92,
            transform: `translateY(${titleY}px) scale(${0.88 + reveal * 0.12})`,
            opacity: reveal,
          }}
        >
          {data.teams.home.name}
          <br />
          VS {data.teams.away.name}
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          {[
            data.schedule.matchup,
            `${data.schedule.game} • ${data.schedule.date}`,
            `${data.schedule.tipoff} • ${data.schedule.venue}`,
          ].map((chip) => (
            <div
              key={chip}
              style={{
                padding: "14px 24px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(7,17,27,0.74)",
                color: neutral.cream,
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 34,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 20,
            width: 1280,
          }}
        >
          {data.pulse.slice(0, 4).map((item, index) => {
            const theme = resolveTheme(item.teamId, homeTheme, awayTheme);
            const accent = theme ? theme.colors.primary : index % 2 === 0 ? homeTheme.colors.primary : awayTheme.colors.secondary;
            const lift = interpolate(frame, [index * 5, 30 + index * 5], [60, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={item.text}
                style={{
                  minHeight: 118,
                  padding: "22px 24px",
                  borderLeft: `10px solid ${accent}`,
                  background: "rgba(4,11,19,0.72)",
                  color: "rgba(244,239,230,0.9)",
                  fontSize: 28,
                  lineHeight: 1.08,
                  transform: `translateY(${lift}px)`,
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <BottomTicker
        left={`${data.teams.home.name} ${data.teams.home.seed} 号种子`}
        center={data.schedule.seasonSeries ?? "系列赛信息"}
        right={`${data.teams.away.name} ${data.teams.away.seed} 号种子`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={0} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
