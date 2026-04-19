import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {BracketSeries, MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  FloatingOrbs,
  NBAScoreBug,
  SceneProgress,
  VignetteOverlay,
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
  const y = interpolate(progress, [0, 1], [20, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  return (
    <div
      style={{
        padding: isFocus ? "14px 16px" : "12px 14px",
        background: isFocus ? "rgba(245,239,230,0.08)" : "rgba(4,11,19,0.65)",
        border: `1px solid ${isFocus ? "#F5EFE0" : "rgba(255,255,255,0.12)"}`,
        borderRadius: 4,
        boxShadow: isFocus ? "0 16px 40px rgba(245,239,230,0.1)" : "none",
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div style={{display: "flex", justifyContent: "space-between", color: isFocus ? neutral.cream : "rgba(244,239,230,0.6)"}}>
        <div style={{fontSize: 14, fontWeight: 800, letterSpacing: 0.5}}>{series.slot}</div>
        <div style={{fontSize: 13, fontWeight: 600}}>{series.status}</div>
      </div>
      <div style={{marginTop: 8, display: "grid", gap: 6}}>
        {[series.topTeam, series.bottomTeam].map((team) => (
          <div
            key={team.label}
            style={{
              display: "grid",
              gridTemplateColumns: "32px 1fr 32px",
              gap: 8,
              alignItems: "center",
              color: neutral.cream,
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            <div style={{opacity: 0.5, fontSize: 14}}>#{team.seed}</div>
            <div>{team.label}</div>
            <div style={{textAlign: "right", opacity: 0.7}}>{team.wins}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HOOK_DURATION = 55;

export const PlayoffPanoramaScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const panorama = data.playoffPanorama;
  if (!panorama) {
    return null;
  }

  const east = panorama.series.filter((s) => s.conference === "east");
  const west = panorama.series.filter((s) => s.conference === "west");

  const hookReveal = spring({
    fps,
    frame,
    config: {damping: 14, stiffness: 120, mass: 0.8},
  });
  const hookOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const hookExit = interpolate(frame, [HOOK_DURATION - 25, HOOK_DURATION], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hookScale = interpolate(hookReveal, [0, 1], [1.15, 1]);
  const suspenseOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateRight: "clamp",
  });

  const bracketOpacity = interpolate(frame, [HOOK_DURATION - 15, HOOK_DURATION + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bracketY = interpolate(frame, [HOOK_DURATION - 10, HOOK_DURATION + 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.14),
        getSceneTint(awayTheme, 0.12),
      )}
    >
      {/* Arena background */}
      <CourtBg src="assets/court.jpg" opacity={0.08} />
      <CourtLines color="rgba(255,255,255,0.03)" opacity={0.4} />
      <FloatingOrbs colors={[homeTheme.colors.primary, awayTheme.colors.secondary, "#F4B63D"]} count={3} opacity={0.08} />
      <VignetteOverlay strength={0.5} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />

      {/* ====== OPENING HOOK ====== */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: hookOpacity * hookExit,
          pointerEvents: "none",
          zIndex: 30,
        }}
      >
        {/* Giant team names as background texture */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 100,
            color: `${homeTheme.colors.primary}14`,
            fontFamily: '"Noto Sans SC", sans-serif',
            fontWeight: 900,
            fontSize: 260,
            lineHeight: 0.8,
            transform: `scale(${hookScale})`,
          }}
        >
          {data.teams.home.city}
        </div>
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 140,
            color: `${awayTheme.colors.secondary}10`,
            fontFamily: '"Noto Sans SC", sans-serif',
            fontWeight: 900,
            fontSize: 240,
            lineHeight: 0.8,
            transform: `scale(${hookScale})`,
          }}
        >
          {data.teams.away.city}
        </div>

        {/* VS divider */}
        <div
          style={{
            position: "absolute",
            width: 4,
            height: interpolate(hookReveal, [0, 1], [0, 420]),
            background: `linear-gradient(180deg, ${homeTheme.colors.primary}, ${awayTheme.colors.secondary})`,
            borderRadius: 2,
            boxShadow: `0 0 80px ${homeTheme.colors.primary}44`,
          }}
        />

        {/* Main title */}
        <div
          style={{
            textAlign: "center",
            transform: `translateY(${interpolate(hookReveal, [0, 1], [80, 0])}px) scale(${hookScale})`,
          }}
        >
          <div
            style={{
              color: neutral.sky,
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: suspenseOpacity,
            }}
          >
            东部首轮 · {data.schedule.matchup}
          </div>
          <div
            style={{
              marginTop: 16,
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 128,
              lineHeight: 1,
            }}
          >
            <span style={{color: homeTheme.colors.primary}}>{data.teams.home.name}</span>
            <span style={{margin: "0 24px", color: "rgba(244,239,230,0.5)", fontSize: 80}}>VS</span>
            <span style={{color: awayTheme.colors.secondary}}>{data.teams.away.name}</span>
          </div>
          <div
            style={{
              marginTop: 22,
              color: "rgba(244,239,230,0.82)",
              fontSize: 34,
              fontWeight: 800,
              fontFamily: '"Noto Sans SC", sans-serif',
              opacity: suspenseOpacity,
            }}
          >
            这轮系列赛，差距真有那么大？
          </div>
        </div>
      </AbsoluteFill>

      {/* ====== BRACKET CONTENT ====== */}
      <AbsoluteFill style={{
        padding: "72px 70px 118px",
        opacity: bracketOpacity,
        transform: `translateY(${bracketY}px)`,
      }}>
        <div style={{display: "grid", gridTemplateColumns: "520px 1fr", gap: 28}}>
          {/* Left: Title + overview */}
          <div>
            <div style={{color: neutral.sky, fontSize: 18, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase"}}>
              PLAYOFF BRACKET
            </div>
            <div
              style={{
                marginTop: 8,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 72,
                lineHeight: 0.96,
              }}
            >
              先看树
              <br />
              再看这场
            </div>
            <div style={{marginTop: 16, color: "rgba(244,239,230,0.85)", fontSize: 22, lineHeight: 1.15}}>
              {panorama.overview}
            </div>
            <div
              style={{
                marginTop: 18,
                padding: "16px 18px",
                background: "rgba(4,11,19,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                color: neutral.cream,
                fontSize: 18,
                lineHeight: 1.15,
              }}
            >
              <div style={{fontWeight: 800, color: homeTheme.colors.secondary, marginBottom: 6}}>
                东部 · EAST
              </div>
              <div style={{opacity: 0.8}}>{panorama.eastHeadline}</div>
              <div style={{marginTop: 12, fontWeight: 800, color: awayTheme.colors.secondary, marginBottom: 6}}>
                西部 · WEST
              </div>
              <div style={{opacity: 0.8}}>{panorama.westHeadline}</div>
            </div>
          </div>

          {/* Right: Bracket nodes */}
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
            <div style={{display: "grid", gap: 10}}>
              <div style={{color: neutral.cream, fontSize: 16, fontWeight: 800, letterSpacing: 1, opacity: 0.7}}>
                东部 EAST
              </div>
              {east.map((series, index) => (
                <SeriesNode
                  key={series.slot}
                  series={series}
                  index={index}
                  isFocus={series.slot === panorama.focusSeriesSlot}
                />
              ))}
            </div>
            <div style={{display: "grid", gap: 10}}>
              <div style={{color: neutral.cream, fontSize: 16, fontWeight: 800, letterSpacing: 1, opacity: 0.7}}>
                西部 WEST
              </div>
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
        left={`快照 ${panorama.capturedAt}`}
        center="焦点系列已高亮"
        right={`${data.teams.home.name} vs ${data.teams.away.name}`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={0} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
