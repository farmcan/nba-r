import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {getTeamTheme, TeamTheme} from "../themes/teams";
import {MatchupPreviewData, TeamId} from "../types/matchup";

type MatchupPreviewTemplateProps = {
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  mode?: "broadcast" | "social";
};

const neutral = {
  cream: "#F4EFE6",
  ink: "#081018",
};

const sceneBackground = (left: string, right: string): React.CSSProperties => ({
  background: `radial-gradient(circle at 20% 10%, ${left} 0%, transparent 32%), radial-gradient(circle at 82% 12%, ${right} 0%, transparent 38%), linear-gradient(135deg, #07111b 0%, #0f1b29 100%)`,
  overflow: "hidden",
});

const getSceneTint = (theme: TeamTheme, alpha: number): string => {
  const hex = theme.colors.primary.replace("#", "");
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const GridOverlay: React.FC<{opacity?: number}> = ({opacity = 0.18}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        opacity,
      }}
    />
  );
};

const resolveTheme = (
  teamId: TeamId | undefined,
  homeTheme: TeamTheme,
  awayTheme: TeamTheme,
): TeamTheme | null => {
  if (!teamId) {
    return null;
  }

  if (teamId === homeTheme.teamId) {
    return homeTheme;
  }

  if (teamId === awayTheme.teamId) {
    return awayTheme;
  }

  return getTeamTheme(teamId);
};

const TeamStrip: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({data, homeTheme, awayTheme}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: "40px 64px auto 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: neutral.cream,
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <Img
          src={staticFile(homeTheme.assets.logo)}
          style={{width: 72, height: 72, objectFit: "contain"}}
        />
        <div style={{fontSize: 36, letterSpacing: 5, textTransform: "uppercase"}}>
          {data.teams.home.city}
        </div>
      </div>
      <div style={{fontSize: 28, letterSpacing: 6, opacity: 0.8, textTransform: "uppercase"}}>
        {data.contextLabel}
      </div>
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <div style={{fontSize: 36, letterSpacing: 5, textTransform: "uppercase"}}>
          {data.teams.away.city}
        </div>
        <Img
          src={staticFile(awayTheme.assets.logo)}
          style={{width: 72, height: 72, objectFit: "contain"}}
        />
      </div>
    </div>
  );
};

const IntroScene: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    config: {damping: 14, stiffness: 120, mass: 0.8},
  });
  const push = interpolate(frame, [0, 90], [1.12, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.32),
        getSceneTint(awayTheme, 0.34),
      )}
    >
      <GridOverlay opacity={(homeTheme.motifs.gridOpacity + awayTheme.motifs.gridOpacity) / 2} />
      <AbsoluteFill>
        <Img
          src={staticFile("assets/court.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.16,
            transform: `scale(${push})`,
          }}
        />
      </AbsoluteFill>
      <TeamStrip data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill style={{justifyContent: "center", padding: "110px 110px 80px"}}>
        <div
          style={{
            color: "#8fc2ff",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 18], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {data.subtitle}
        </div>
        <div
          style={{
            marginTop: 24,
            color: neutral.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 180,
            lineHeight: 0.88,
            textTransform: "uppercase",
            transform: `translateY(${interpolate(reveal, [0, 1], [120, 0])}px) scale(${0.85 + reveal * 0.15})`,
            opacity: reveal,
          }}
        >
          {data.teams.home.name}
          <br />
          {data.teams.away.name}
        </div>
        <div
          style={{
            marginTop: 34,
            display: "flex",
            gap: 20,
            alignItems: "center",
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
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(9,16,24,0.64)",
                color: neutral.cream,
                fontSize: 30,
                letterSpacing: 2,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          bottom: 86,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 18,
        }}
      >
        {data.pulse.slice(0, 2).map((item, index) => {
          const theme = resolveTheme(item.teamId, homeTheme, awayTheme);
          const accent = theme ? theme.colors.primary : index === 0 ? homeTheme.colors.primary : awayTheme.colors.primary;
          return (
            <div
              key={item.text}
              style={{
                borderLeft: `8px solid ${accent}`,
                paddingLeft: 18,
                color: "rgba(244,239,230,0.84)",
                fontSize: 28,
                lineHeight: 1.15,
              }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const PlayerCardsScene: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(awayTheme, 0.28),
        getSceneTint({ ...awayTheme, colors: {...awayTheme.colors, primary: homeTheme.colors.secondary} }, 0.24),
      )}
    >
      <GridOverlay />
      <AbsoluteFill style={{padding: "120px 76px 90px"}}>
        <div
          style={{
            color: neutral.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 120,
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          PLAYER
          <br />
          STACK
        </div>
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: `repeat(${data.playerCards.length}, 1fr)`,
            gap: 24,
          }}
        >
          {data.playerCards.map((card, index) => {
            const teamTheme = resolveTheme(card.teamId, homeTheme, awayTheme) ?? homeTheme;
            const start = index * 7;
            const rise = interpolate(frame, [start, start + 18], [140, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const rotate = interpolate(frame, [start, start + 20], [index % 2 === 0 ? -7 : 7, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const pulse = interpolate(frame, [start + 16, start + 40], [1, 1.03], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={card.name}
                style={{
                  minHeight: 700,
                  padding: 18,
                  background: "rgba(7,14,22,0.82)",
                  border: `2px solid ${teamTheme.colors.primary}`,
                  boxShadow: `0 35px 80px ${teamTheme.colors.primary}26`,
                  transform: `translateY(${rise}px) rotate(${rotate}deg) scale(${pulse})`,
                }}
              >
                <div
                  style={{
                    height: 360,
                    position: "relative",
                    overflow: "hidden",
                    background: `linear-gradient(180deg, ${teamTheme.colors.primary}55, rgba(255,255,255,0.06))`,
                  }}
                >
                  <Img
                    src={staticFile(card.image)}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 14,
                      top: 14,
                      padding: "10px 14px",
                      background: teamTheme.colors.secondary,
                      color: teamTheme.colors.ink,
                      fontSize: 20,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    {card.badge}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 18,
                    color: neutral.cream,
                    fontFamily: '"Anton", sans-serif',
                    fontSize: 54,
                    lineHeight: 0.9,
                    textTransform: "uppercase",
                  }}
                >
                  {card.name}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    color: teamTheme.colors.accent,
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {teamTheme.city} {teamTheme.name}
                </div>
                <div
                  style={{
                    marginTop: 22,
                    color: neutral.cream,
                    fontSize: 38,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {card.stat}
                </div>
                <div
                  style={{
                    marginTop: 18,
                    color: "rgba(244,239,230,0.82)",
                    fontSize: 28,
                    lineHeight: 1.12,
                  }}
                >
                  {card.note}
                </div>
                <div
                  style={{
                    marginTop: 18,
                    color: "rgba(244,239,230,0.54)",
                    fontSize: 18,
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                  }}
                >
                  Source: {card.sourceLabel}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const EdgesScene: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.18),
        getSceneTint({...homeTheme, colors: {...homeTheme.colors, primary: homeTheme.colors.secondary}}, 0.22),
      )}
    >
      <GridOverlay />
      <AbsoluteFill style={{padding: "110px 90px"}}>
        <div
          style={{
            color: neutral.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 140,
            lineHeight: 0.88,
            textTransform: "uppercase",
            width: 900,
          }}
        >
          WHAT
          <br />
          REALLY
          <br />
          SWINGS IT
        </div>
        <div
          style={{
            marginTop: 42,
            display: "grid",
            gridTemplateColumns: `repeat(${data.matchupEdges.length}, 1fr)`,
            gap: 28,
          }}
        >
          {data.matchupEdges.map((edge, index) => {
            const theme = resolveTheme(edge.teamId, homeTheme, awayTheme);
            const edgeColor = theme ? theme.colors.primary : awayTheme.colors.secondary;
            const start = index * 9;
            const x = interpolate(
              frame,
              [start, start + 22],
              [index === 1 ? 0 : index === 0 ? -180 : 180, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            );
            const opacity = interpolate(frame, [start, start + 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={edge.eyebrow}
                style={{
                  minHeight: 360,
                  padding: "30px 32px",
                  background: "rgba(7,14,22,0.76)",
                  borderTop: `10px solid ${edgeColor}`,
                  transform: `translateX(${x}px)`,
                  opacity,
                }}
              >
                <div
                  style={{
                    color: edgeColor,
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {edge.eyebrow}
                </div>
                <div
                  style={{
                    marginTop: 20,
                    color: neutral.cream,
                    fontFamily: '"Anton", sans-serif',
                    fontSize: 62,
                    lineHeight: 0.92,
                    textTransform: "uppercase",
                  }}
                >
                  {edge.headline}
                </div>
                <div
                  style={{
                    marginTop: 18,
                    color: "rgba(244,239,230,0.82)",
                    fontSize: 30,
                    lineHeight: 1.12,
                  }}
                >
                  {edge.body}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            right: 90,
            bottom: 90,
            width: 520,
            padding: "28px 30px",
            background: "rgba(0,0,0,0.38)",
            border: "1px solid rgba(255,255,255,0.16)",
          }}
        >
          <div
            style={{
              color: "#8fc2ff",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {data.sourceSlate.title}
          </div>
          <div
            style={{
              marginTop: 16,
              color: neutral.cream,
              fontSize: 30,
              lineHeight: 1.12,
            }}
          >
            {data.sourceSlate.body}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SocialBuzzScene: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint({ ...awayTheme, colors: {...awayTheme.colors, primary: awayTheme.colors.secondary}}, 0.18),
        getSceneTint(awayTheme, 0.22),
      )}
    >
      <GridOverlay />
      <AbsoluteFill style={{padding: "110px 90px"}}>
        <div
          style={{
            color: neutral.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 148,
            lineHeight: 0.88,
            textTransform: "uppercase",
          }}
        >
          X
          <br />
          BUZZ
        </div>
        <div
          style={{
            marginTop: 38,
            display: "grid",
            gridTemplateColumns: `repeat(${data.socialBuzz.length}, 1fr)`,
            gap: 24,
          }}
        >
          {data.socialBuzz.map((post, index) => {
            const theme = resolveTheme(post.teamId, homeTheme, awayTheme);
            const accent = theme ? theme.colors.primary : awayTheme.colors.secondary;
            const start = index * 8;
            const lift = interpolate(frame, [start, start + 20], [120, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });

            return (
              <div
                key={`${post.handle}-${post.date}`}
                style={{
                  minHeight: 380,
                  padding: "28px 30px",
                  background: "rgba(10,17,26,0.82)",
                  border: `1px solid ${accent}`,
                  boxShadow: `0 24px 60px ${accent}22`,
                  transform: `translateY(${lift}px)`,
                  position: "relative",
                }}
              >
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                  <div
                    style={{
                      color: neutral.cream,
                      fontSize: 28,
                      fontWeight: 800,
                      letterSpacing: 1,
                    }}
                  >
                    {post.handle}
                  </div>
                  <div
                    style={{
                      color: accent,
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    {post.date}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 26,
                    color: neutral.cream,
                    fontSize: 38,
                    lineHeight: 1.08,
                    fontWeight: 600,
                  }}
                >
                  {post.text}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 30,
                    right: 30,
                    bottom: 28,
                    color: "rgba(244,239,230,0.54)",
                    fontSize: 18,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  Public post, summarized for context
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const CloseScene: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    config: {damping: 16, stiffness: 120, mass: 0.8},
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.26),
        getSceneTint({...awayTheme, colors: {...awayTheme.colors, primary: awayTheme.colors.secondary}}, 0.22),
      )}
    >
      <GridOverlay />
      <AbsoluteFill style={{justifyContent: "center", alignItems: "center", padding: "80px 120px"}}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 34,
            transform: `scale(${0.85 + reveal * 0.15})`,
            opacity: reveal,
          }}
        >
          <Img src={staticFile(homeTheme.assets.logo)} style={{width: 140, height: 140}} />
          <div
            style={{
              color: neutral.cream,
              fontFamily: '"Anton", sans-serif',
              fontSize: 150,
              textTransform: "uppercase",
            }}
          >
            vs
          </div>
          <Img src={staticFile(awayTheme.assets.logo)} style={{width: 140, height: 140}} />
        </div>
        <div
          style={{
            marginTop: 30,
            color: neutral.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 164,
            lineHeight: 0.88,
            textTransform: "uppercase",
            textAlign: "center",
            opacity: reveal,
          }}
        >
          {data.schedule.game}
          <br />
          PREVIEW
        </div>
        <div
          style={{
            marginTop: 26,
            color: "#8fc2ff",
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
            marginTop: 44,
            width: 1180,
            color: "rgba(244,239,230,0.84)",
            fontSize: 30,
            lineHeight: 1.18,
            textAlign: "center",
          }}
        >
          {data.closingNote}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const MatchupPreviewTemplate: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  return (
    <AbsoluteFill style={{backgroundColor: neutral.ink}}>
      <Audio src={staticFile("audio/pulse.mp3")} volume={0.52} loop />
      <Sequence from={0} durationInFrames={150}>
        <IntroScene data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      </Sequence>
      <Sequence from={138} durationInFrames={190}>
        <PlayerCardsScene data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      </Sequence>
      <Sequence from={316} durationInFrames={150}>
        <EdgesScene data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      </Sequence>
      <Sequence from={454} durationInFrames={150}>
        <SocialBuzzScene data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      </Sequence>
      <Sequence from={592} durationInFrames={128}>
        <CloseScene data={data} homeTheme={homeTheme} awayTheme={awayTheme} />
      </Sequence>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "16px solid rgba(244,239,230,0.08)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
