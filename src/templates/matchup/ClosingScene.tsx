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
    config: {damping: 16, stiffness: 120, mass: 0.88},
  });
  const promptReveal = spring({
    fps,
    frame: Math.max(0, frame - 24),
    config: {damping: 17, stiffness: 110, mass: 0.94},
  });
  const scan = interpolate(frame, [0, 80], [-180, 1450], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.18),
        getSceneTint(awayTheme, 0.14),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.12} scale={1.06} />
      <CourtLines color="rgba(255,255,255,0.024)" opacity={0.34} />
      <FloatingOrbs
        colors={[homeTheme.colors.primary, awayTheme.colors.secondary, neutral.sky, "#fff"]}
        count={4}
        opacity={0.08}
      />
      <VignetteOverlay strength={0.66} />

      <div
        style={{
          position: "absolute",
          left: scan,
          top: -120,
          width: 180,
          height: 1300,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.14) 42%, rgba(255,255,255,0.04) 74%, transparent 100%)",
          transform: "rotate(14deg)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "78px 78px 96px",
          borderRadius: 38,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02), 0 30px 90px rgba(0,0,0,0.22)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 14%, transparent 82%, rgba(255,255,255,0.05) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -140,
            top: 120,
            width: 700,
            height: 700,
            borderRadius: 999,
            background: `radial-gradient(circle, ${homeTheme.colors.primary}18 0%, transparent 68%)`,
            filter: "blur(18px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: 60,
            width: 720,
            height: 720,
            borderRadius: 999,
            background: `radial-gradient(circle, ${awayTheme.colors.secondary}16 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
      </div>

      <AbsoluteFill style={{padding: "118px 110px 122px", justifyContent: "space-between"}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            opacity: reveal,
            transform: `translateY(${interpolate(reveal, [0, 1], [26, 0])}px)`,
          }}
        >
          <div>
            <div style={{color: neutral.sky, fontSize: 18, fontWeight: 800, letterSpacing: 4}}>
              FINAL TAKE
            </div>
            <div
              style={{
                marginTop: 12,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 94,
                lineHeight: 0.94,
              }}
            >
              谁先钉死
              <br />
              自己的节奏
            </div>
          </div>
          <div
            style={{
              width: 420,
              padding: "18px 20px",
              borderRadius: 24,
              background: "rgba(7,17,27,0.64)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(244,239,230,0.74)",
              fontSize: 18,
              lineHeight: 1.18,
            }}
          >
            这轮系列赛不会只靠名气决定，更像是完整度与爆点制造能力之间的持续拉扯。
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.12fr 0.88fr",
            gap: 22,
            alignItems: "stretch",
            opacity: reveal,
          }}
        >
          <div
            style={{
              padding: "26px 28px",
              borderRadius: 30,
              background: "linear-gradient(160deg, rgba(7,17,27,0.82), rgba(14,24,36,0.96))",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 70px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 20, alignItems: "center"}}>
              {[
                {theme: homeTheme, name: data.teams.home.name, seed: data.teams.home.seed},
                {theme: awayTheme, name: data.teams.away.name, seed: data.teams.away.seed},
              ].map((item, index) => (
                <React.Fragment key={item.name}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 144,
                        height: 144,
                        borderRadius: 34,
                        border: `1px solid ${item.theme.colors.primary}4a`,
                        background: `radial-gradient(circle at 50% 34%, ${item.theme.colors.primary}26, rgba(255,255,255,0.03) 64%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Img
                        src={staticFile(item.theme.assets.logo)}
                        style={{width: 92, height: 92, objectFit: "contain"}}
                      />
                    </div>
                    <div style={{color: neutral.cream, fontSize: 34, fontWeight: 900}}>{item.name}</div>
                    <div
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        background: index === 0 ? `${homeTheme.colors.primary}20` : `${awayTheme.colors.secondary}20`,
                        color: neutral.cream,
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: 1.2,
                      }}
                    >
                      #{item.seed} SEED
                    </div>
                  </div>
                  {index === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <div style={{color: "rgba(244,239,230,0.46)", fontSize: 54, fontWeight: 900}}>VS</div>
                      <div style={{color: neutral.sky, fontSize: 14, fontWeight: 800, letterSpacing: 2}}>
                        {data.schedule.game}
                      </div>
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </div>

            <div
              style={{
                marginTop: 26,
                padding: "20px 22px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{color: "rgba(244,239,230,0.46)", fontSize: 12, fontWeight: 800, letterSpacing: 1.6}}>
                SCHEDULE
              </div>
              <div style={{marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap"}}>
                {[data.schedule.date, data.schedule.tipoff, data.schedule.venue].map((chip) => (
                  <div
                    key={chip}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.09)",
                      background: "rgba(7,17,27,0.72)",
                      color: neutral.cream,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 18,
              transform: `translateY(${interpolate(promptReveal, [0, 1], [28, 0])}px)`,
              opacity: promptReveal,
            }}
          >
            <div
              style={{
                padding: "24px 24px 22px",
                borderRadius: 28,
                background: "linear-gradient(160deg, rgba(7,17,27,0.82), rgba(14,24,36,0.96))",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{color: "rgba(244,239,230,0.46)", fontSize: 12, fontWeight: 800, letterSpacing: 1.6}}>
                QUESTION
              </div>
              <div
                style={{
                  marginTop: 14,
                  color: neutral.cream,
                  fontFamily: '"Noto Sans SC", sans-serif',
                  fontWeight: 900,
                  fontSize: 58,
                  lineHeight: 1,
                }}
              >
                你觉得
                <br />
                谁能赢？
              </div>
              <div
                style={{
                  marginTop: 14,
                  color: "rgba(244,239,230,0.72)",
                  fontSize: 22,
                  lineHeight: 1.18,
                }}
              >
                评论区留下你的预测，看这轮系列赛会不会按纸面剧本走。
              </div>
            </div>

            <div
              style={{
                padding: "22px 24px",
                borderRadius: 28,
                background: `${homeTheme.colors.primary}14`,
                border: `1px solid ${homeTheme.colors.primary}30`,
              }}
            >
              <div style={{color: neutral.sky, fontSize: 12, fontWeight: 800, letterSpacing: 1.6}}>
                MATCHUP NOTE
              </div>
              <div
                style={{
                  marginTop: 12,
                  color: neutral.cream,
                  fontSize: 24,
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {data.closingNote}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <BottomTicker
        left={`${data.teams.home.name} vs ${data.teams.away.name}`}
        center={data.schedule.matchup}
        right="评论区见"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={6} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
