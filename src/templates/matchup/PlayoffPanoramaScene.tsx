import React from "react";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {BracketSeries, MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  FloatingOrbs,
  NBAScoreBug,
  SceneChrome,
  SceneProgress,
  VignetteOverlay,
  getSceneTint,
  neutral,
  sceneBackground,
} from "./shared";

const topTabs = ["BRACKET", "LATEST", "SERIES", "SCHEDULE"];

const SeriesNode: React.FC<{
  series: BracketSeries;
  index: number;
  isFocus: boolean;
  accent: string;
}> = ({series, index, isFocus, accent}) => {
  const frame = useCurrentFrame();
  const reveal = spring({
    fps: 30,
    frame: Math.max(0, frame - index * 4),
    config: {damping: 16, stiffness: 120, mass: 0.8},
  });
  const y = interpolate(reveal, [0, 1], [28, 0]);
  const opacity = interpolate(reveal, [0, 1], [0, 1]);

  return (
    <div
      style={{
        padding: isFocus ? "20px 22px" : "16px 18px",
        borderRadius: 20,
        border: `1px solid ${isFocus ? `${accent}88` : "rgba(255,255,255,0.12)"}`,
        background: isFocus
          ? `linear-gradient(140deg, rgba(7,17,27,0.94), ${accent}18 120%)`
          : "linear-gradient(140deg, rgba(7,17,27,0.82), rgba(14,24,34,0.9))",
        boxShadow: isFocus ? `0 22px 70px ${accent}25` : "0 16px 44px rgba(0,0,0,0.18)",
        transform: `translateY(${y}px)`,
        opacity,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 26%, transparent 74%, rgba(255,255,255,0.03) 100%)",
          pointerEvents: "none",
        }}
      />
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{color: "rgba(244,239,230,0.65)", fontSize: 14, fontWeight: 800, letterSpacing: 2}}>
          {series.slot}
        </div>
        <div
          style={{
            padding: "5px 10px",
            borderRadius: 999,
            background: isFocus ? `${accent}20` : "rgba(255,255,255,0.06)",
            color: isFocus ? neutral.cream : "rgba(244,239,230,0.72)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          {series.status}
        </div>
      </div>
      <div style={{marginTop: 14, display: "grid", gap: 10}}>
        {[series.topTeam, series.bottomTeam].map((team, rowIndex) => (
          <div
            key={`${team.label}-${rowIndex}`}
            style={{
              display: "grid",
              gridTemplateColumns: "52px 1fr 50px",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                height: 42,
                borderRadius: 14,
                border: `1px solid ${isFocus ? `${accent}40` : "rgba(255,255,255,0.1)"}`,
                background: "rgba(255,255,255,0.03)",
                color: neutral.cream,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 900,
              }}
            >
              {team.seed}
            </div>
            <div style={{color: neutral.cream, fontSize: 24, fontWeight: 900, lineHeight: 1}}>
              {team.label}
            </div>
            <div
              style={{
                color: neutral.cream,
                textAlign: "right",
                fontSize: 28,
                fontWeight: 900,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {team.wins}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewsCard: React.FC<{
  title: string;
  body: string;
  index: number;
  accent: string;
}> = ({title, body, index, accent}) => {
  const frame = useCurrentFrame();
  const rise = interpolate(frame, [88 + index * 6, 118 + index * 6], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [88 + index * 6, 108 + index * 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        minHeight: 168,
        padding: "20px 22px",
        borderRadius: 22,
        background: "linear-gradient(160deg, rgba(7,17,27,0.85), rgba(15,24,36,0.95))",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.22)",
        transform: `translateY(${rise}px)`,
        opacity,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 999,
          background: `${accent}22`,
          color: neutral.cream,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 1.2,
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: 999,
            background: accent,
            boxShadow: `0 0 14px ${accent}`,
          }}
        />
        LATEST
      </div>
      <div
        style={{
          marginTop: 14,
          color: neutral.cream,
          fontSize: 28,
          fontWeight: 900,
          lineHeight: 1.02,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 12,
          color: "rgba(244,239,230,0.74)",
          fontSize: 18,
          lineHeight: 1.18,
        }}
      >
        {body}
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
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const panorama = data.playoffPanorama;
  if (!panorama) {
    return null;
  }

  const east = panorama.series.filter((s) => s.conference === "east");
  const west = panorama.series.filter((s) => s.conference === "west");

  const headerReveal = spring({
    fps,
    frame,
    config: {damping: 15, stiffness: 120, mass: 0.82},
  });
  const bodyReveal = spring({
    fps,
    frame: Math.max(0, frame - 14),
    config: {damping: 16, stiffness: 115, mass: 0.9},
  });
  const frameGlow = interpolate(frame, [0, 90], [0.3, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.17),
        getSceneTint(awayTheme, 0.13),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.11} scale={1.08} />
      <CourtLines color="rgba(255,255,255,0.028)" opacity={0.38} />
      <FloatingOrbs
        colors={[homeTheme.colors.primary, awayTheme.colors.secondary, "#F4B63D", "#7ED0FF"]}
        count={4}
        opacity={0.08}
      />
      <VignetteOverlay strength={0.62} />
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />

      <div
        style={{
          position: "absolute",
          inset: 48,
          borderRadius: 34,
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02), 0 0 120px rgba(0,0,0,0.14)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{padding: "86px 72px 118px"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            transform: `translateY(${interpolate(headerReveal, [0, 1], [36, 0])}px)`,
            opacity: headerReveal,
          }}
        >
          <div>
            <div style={{display: "flex", gap: 10}}>
              {topTabs.map((tab, index) => (
                <div
                  key={tab}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: index === 0 ? "rgba(244,239,230,0.12)" : "rgba(7,17,27,0.55)",
                    color: neutral.cream,
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 18,
                color: neutral.sky,
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 4,
              }}
            >
              2026 NBA PLAYOFFS HUB
            </div>
            <div
              style={{
                marginTop: 12,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 84,
                lineHeight: 0.96,
              }}
            >
              先看全景
              <br />
              再看这组
            </div>
          </div>

          <div
            style={{
              width: 560,
              padding: "24px 24px 22px",
              borderRadius: 28,
              background: "linear-gradient(160deg, rgba(7,17,27,0.86), rgba(15,24,36,0.96))",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: `0 22px 70px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.02)`,
              transform: `translateY(${interpolate(headerReveal, [0, 1], [20, 0])}px)`,
            }}
          >
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <div
                style={{
                  color: "rgba(244,239,230,0.62)",
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1.6,
                }}
              >
                FOCUS SERIES
              </div>
              <div
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: `${homeTheme.colors.primary}18`,
                  color: neutral.cream,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                {panorama.focusSeriesSlot}
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                gap: 16,
                alignItems: "center",
              }}
            >
              {[
                {theme: homeTheme, label: data.teams.home.name, seed: data.teams.home.seed},
                {theme: awayTheme, label: data.teams.away.name, seed: data.teams.away.seed},
              ].map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 122,
                      height: 122,
                      borderRadius: 28,
                      border: `1px solid ${item.theme.colors.primary}55`,
                      background: `radial-gradient(circle at 50% 35%, ${item.theme.colors.primary}2c, rgba(255,255,255,0.02) 62%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 ${frameGlow * 60}px ${item.theme.colors.primary}22`,
                    }}
                  >
                    <Img
                      src={staticFile(item.theme.assets.logo)}
                      style={{width: 80, height: 80, objectFit: "contain"}}
                    />
                  </div>
                  <div style={{color: neutral.cream, fontSize: 28, fontWeight: 900}}>
                    {item.label}
                  </div>
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: 999,
                      background: index === 0 ? `${homeTheme.colors.primary}1a` : `${awayTheme.colors.secondary}1a`,
                      color: neutral.cream,
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 1,
                    }}
                  >
                    #{item.seed} SEED
                  </div>
                </div>
              ))}
              <div
                style={{
                  color: "rgba(244,239,230,0.5)",
                  fontSize: 54,
                  fontWeight: 900,
                  transform: `scale(${1 + frameGlow * 0.03})`,
                }}
              >
                VS
              </div>
            </div>
            <div
              style={{
                marginTop: 18,
                color: "rgba(244,239,230,0.8)",
                fontSize: 21,
                lineHeight: 1.18,
              }}
            >
              {panorama.overview}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "1.28fr 1fr",
            gap: 22,
            opacity: bodyReveal,
            transform: `translateY(${interpolate(bodyReveal, [0, 1], [42, 0])}px)`,
          }}
        >
          <div
            style={{
              borderRadius: 32,
              background: "linear-gradient(160deg, rgba(7,17,27,0.78), rgba(15,24,36,0.95))",
              border: "1px solid rgba(255,255,255,0.09)",
              padding: "26px 26px 24px",
              boxShadow: "0 24px 70px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={{color: neutral.cream, fontSize: 20, fontWeight: 800, letterSpacing: 2}}>
                FIRST ROUND MATRIX
              </div>
              <div style={{color: "rgba(244,239,230,0.58)", fontSize: 15, fontWeight: 700}}>
                路径和局势一起看
              </div>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14}}>
              <div style={{display: "grid", gap: 12}}>
                <div style={{color: homeTheme.colors.secondary, fontSize: 15, fontWeight: 800, letterSpacing: 2}}>
                  EAST
                </div>
                {east.map((series, index) => (
                  <SeriesNode
                    key={series.slot}
                    series={series}
                    index={index}
                    isFocus={series.slot === panorama.focusSeriesSlot}
                    accent={homeTheme.colors.primary}
                  />
                ))}
              </div>
              <div style={{display: "grid", gap: 12}}>
                <div style={{color: awayTheme.colors.secondary, fontSize: 15, fontWeight: 800, letterSpacing: 2}}>
                  WEST
                </div>
                {west.map((series, index) => (
                  <SeriesNode
                    key={series.slot}
                    series={series}
                    index={index + east.length}
                    isFocus={false}
                    accent={awayTheme.colors.secondary}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{display: "grid", gap: 16}}>
            <NewsCard
              title="东部已经先响了一枪"
              body={panorama.eastHeadline}
              index={0}
              accent={homeTheme.colors.secondary}
            />
            <NewsCard
              title="西部的火力也在堆高"
              body={panorama.westHeadline}
              index={1}
              accent={awayTheme.colors.secondary}
            />
            <NewsCard
              title="这组为什么值得放大看"
              body="不是因为名气，而是这轮同时存在体系深度、持球爆点和中轴健康三条变量。"
              index={2}
              accent={neutral.sky}
            />
          </div>
        </div>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.teams.home.name} #${data.teams.home.seed} • ${data.teams.away.name} #${data.teams.away.seed}`}
        center={panorama.focusSeriesSlot ? `焦点系列 ${panorama.focusSeriesSlot}` : data.schedule.matchup}
        right="全景不是背景板，是这轮系列赛的位置"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={0} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
