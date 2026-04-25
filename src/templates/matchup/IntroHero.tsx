import React from "react";
import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData} from "../../types/matchup";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  NBAScoreBug,
  ParticleField,
  SceneChrome,
  SceneProgress,
  VignetteOverlay,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

const topLabels = ["MATCHUP", "GAME 1", "EAST"];

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
    config: {damping: 16, stiffness: 120, mass: 0.84},
  });
  const heroReveal = spring({
    fps,
    frame: Math.max(0, frame - 10),
    config: {damping: 17, stiffness: 110, mass: 0.92},
  });
  const pulseReveal = spring({
    fps,
    frame: Math.max(0, frame - 22),
    config: {damping: 18, stiffness: 105, mass: 0.95},
  });
  const courtPush = interpolate(frame, [0, 110], [1.14, 1.02], {
    extrapolateRight: "clamp",
  });
  const scanLine = interpolate(frame, [0, 80], [-320, 1780], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.22),
        getSceneTint(awayTheme, 0.18),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.12} scale={courtPush} />
      <CourtLines color="rgba(255,255,255,0.025)" opacity={0.44} />
      <ParticleField count={34} speed={0.45} opacity={0.18} />
      <VignetteOverlay strength={0.5} />
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
          left: scanLine,
          top: -120,
          width: 200,
          height: 1300,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.03) 70%, transparent 100%)",
          transform: "rotate(15deg)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: 78,
          bottom: 98,
          borderRadius: 36,
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02), 0 28px 80px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 12%, transparent 82%, rgba(255,255,255,0.05) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "56%",
            background: `linear-gradient(120deg, ${homeTheme.colors.primary}18 0%, rgba(7,17,27,0.08) 52%, transparent 100%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "54%",
            background: `linear-gradient(240deg, ${awayTheme.colors.secondary}16 0%, rgba(7,17,27,0.06) 52%, transparent 100%)`,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 94,
          top: 112,
          display: "flex",
          gap: 10,
          opacity: reveal,
          transform: `translateY(${interpolate(reveal, [0, 1], [22, 0])}px)`,
        }}
      >
        {topLabels.map((label, index) => (
          <div
            key={label}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.12)",
              background: index === 1 ? "rgba(244,239,230,0.14)" : "rgba(7,17,27,0.56)",
              color: neutral.cream,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 1.6,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: 112,
          top: 200,
          color: `${homeTheme.colors.primary}14`,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 224,
          lineHeight: 0.82,
          transform: `translateY(${interpolate(heroReveal, [0, 1], [38, 0])}px)`,
        }}
      >
        {data.teams.home.shortName}
      </div>
      <div
        style={{
          position: "absolute",
          right: 116,
          bottom: 158,
          color: `${awayTheme.colors.secondary}13`,
          fontFamily: '"Noto Sans SC", sans-serif',
          fontWeight: 900,
          fontSize: 204,
          lineHeight: 0.82,
          textAlign: "right",
          transform: `translateY(${interpolate(heroReveal, [0, 1], [38, 0])}px)`,
        }}
      >
        {data.teams.away.name}
      </div>

      <AbsoluteFill style={{padding: "154px 112px 122px"}}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.18fr 0.82fr",
            gap: 28,
            height: "100%",
          }}
        >
          <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div>
              <div
                style={{
                  color: neutral.sky,
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 3,
                  opacity: reveal,
                }}
              >
                {data.subtitle}
              </div>
              <div
                style={{
                  marginTop: 18,
                  color: neutral.cream,
                  fontFamily: '"Noto Sans SC", sans-serif',
                  fontWeight: 900,
                  fontSize: 150,
                  lineHeight: 0.9,
                  transform: `translateY(${interpolate(heroReveal, [0, 1], [64, 0])}px) scale(${0.9 + heroReveal * 0.1})`,
                }}
              >
                <span style={{color: homeTheme.colors.primary}}>{data.teams.home.name}</span>
                <br />
                <span style={{color: "rgba(244,239,230,0.52)", fontSize: 92}}>VS</span>
                <br />
                <span style={{color: awayTheme.colors.secondary}}>{data.teams.away.name}</span>
              </div>

              <div
                style={{
                  marginTop: 28,
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  opacity: heroReveal,
                }}
              >
                {[
                  `${data.schedule.game} • ${data.schedule.date}`,
                  `${data.schedule.tipoff} • ${data.schedule.venue}`,
                  data.schedule.matchup,
                ].map((chip, index) => (
                  <div
                    key={chip}
                    style={{
                      padding: "14px 22px",
                      borderRadius: 18,
                      border: "1px solid rgba(255,255,255,0.13)",
                      background: index === 2 ? "rgba(244,239,230,0.09)" : "rgba(7,17,27,0.72)",
                      color: neutral.cream,
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: 0.6,
                    }}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 16,
                width: 1080,
                opacity: pulseReveal,
                transform: `translateY(${interpolate(pulseReveal, [0, 1], [36, 0])}px)`,
              }}
            >
              {data.pulse.slice(0, 4).map((item, index) => {
                const theme = resolveTheme(item.teamId, homeTheme, awayTheme);
                const accent = theme
                  ? theme.colors.primary
                  : index % 2 === 0
                    ? homeTheme.colors.primary
                    : awayTheme.colors.secondary;

                return (
                  <div
                    key={item.text}
                    style={{
                      minHeight: 116,
                      padding: "20px 22px",
                      borderRadius: 22,
                      background: "linear-gradient(160deg, rgba(7,17,27,0.84), rgba(13,22,32,0.95))",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: `inset 0 0 0 1px ${accent}22`,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 5,
                        borderRadius: 999,
                        background: accent,
                        boxShadow: `0 0 16px ${accent}66`,
                      }}
                    />
                    <div
                      style={{
                        marginTop: 14,
                        color: "rgba(244,239,230,0.92)",
                        fontSize: 28,
                        lineHeight: 1.08,
                      }}
                    >
                      {item.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateRows: "1fr auto",
              gap: 20,
              opacity: heroReveal,
              transform: `translateX(${interpolate(heroReveal, [0, 1], [36, 0])}px)`,
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: 30,
                overflow: "hidden",
                background: "linear-gradient(180deg, rgba(7,17,27,0.88), rgba(11,20,31,0.96))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 28px 80px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 16%, transparent 84%, rgba(255,255,255,0.05) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "18px 18px auto 18px",
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {[
                  {theme: homeTheme, label: data.teams.home.shortName, seed: data.teams.home.seed},
                  {theme: awayTheme, label: data.teams.away.shortName, seed: data.teams.away.seed},
                ].map((item, index) => (
                  <React.Fragment key={item.label}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 118,
                          height: 118,
                          borderRadius: 28,
                          border: `1px solid ${item.theme.colors.primary}4a`,
                          background: `radial-gradient(circle at 50% 35%, ${item.theme.colors.primary}2a, rgba(255,255,255,0.02) 62%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Img
                          src={staticFile(item.theme.assets.logo)}
                          style={{width: 76, height: 76, objectFit: "contain"}}
                        />
                      </div>
                      <div style={{color: neutral.cream, fontSize: 23, fontWeight: 900}}>{item.label}</div>
                      <div
                        style={{
                          padding: "6px 12px",
                          borderRadius: 999,
                          background: index === 0 ? `${homeTheme.colors.primary}1b` : `${awayTheme.colors.secondary}1b`,
                          color: neutral.cream,
                          fontSize: 12,
                          fontWeight: 800,
                          letterSpacing: 1.1,
                        }}
                      >
                        #{item.seed} SEED
                      </div>
                    </div>
                    {index === 0 ? (
                      <div
                        style={{
                          color: "rgba(244,239,230,0.48)",
                          fontSize: 54,
                          fontWeight: 900,
                          transform: `scale(${1 + reveal * 0.04})`,
                        }}
                      >
                        VS
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>

              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 24,
                  padding: "22px 24px",
                  borderRadius: 24,
                  background: "rgba(5,12,20,0.74)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{color: "rgba(244,239,230,0.48)", fontSize: 12, fontWeight: 800, letterSpacing: 1.5}}>
                  SERIES TEMPERATURE
                </div>
                <div
                  style={{
                    marginTop: 12,
                    color: neutral.cream,
                    fontSize: 30,
                    fontWeight: 900,
                    lineHeight: 1.04,
                  }}
                >
                  这不是简单的强弱分明
                </div>
                <div
                  style={{
                    marginTop: 10,
                    color: "rgba(244,239,230,0.76)",
                    fontSize: 18,
                    lineHeight: 1.18,
                  }}
                >
                  一边是更稳的五人链路，一边是更凶的第一拍爆点，真正的问题是谁先把比赛拖进自己的轨道。
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
              }}
            >
              {[
                `${data.teams.home.name} ${data.teams.home.seed} 号种子`,
                data.schedule.seasonSeries ?? "系列赛信息",
              ].map((chip, index) => (
                <div
                  key={chip}
                  style={{
                    padding: "16px 18px",
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: index === 0 ? `${homeTheme.colors.primary}18` : `${awayTheme.colors.secondary}14`,
                    color: neutral.cream,
                    fontSize: 18,
                    fontWeight: 800,
                    lineHeight: 1.08,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.teams.home.name} ${data.teams.home.seed} 号种子`}
        center={data.schedule.seasonSeries ?? "系列赛信息"}
        right={`${data.teams.away.name} ${data.teams.away.seed} 号种子`}
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={1} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
