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
import { celticsSixersPreview as data } from "./data/celticsSixersPreview";

const palette = {
  ink: "#081018",
  cream: "#f4efe6",
  green: "#007A33",
  blue: "#006BB6",
  red: "#ED174C",
  gold: "#BA9653",
};

const sceneBackground = (left: string, right: string): React.CSSProperties => ({
  background: `radial-gradient(circle at 20% 10%, ${left} 0%, transparent 32%), radial-gradient(circle at 82% 12%, ${right} 0%, transparent 38%), linear-gradient(135deg, #07111b 0%, #0f1b29 100%)`,
  overflow: "hidden",
});

const GridOverlay: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        opacity: 0.18,
      }}
    />
  );
};

const TeamStrip: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: "40px 64px auto 64px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: palette.cream,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Img
          src={staticFile("assets/logos/celtics.svg")}
          style={{ width: 72, height: 72, objectFit: "contain" }}
        />
        <div style={{ fontSize: 36, letterSpacing: 5, textTransform: "uppercase" }}>
          Boston
        </div>
      </div>
      <div style={{ fontSize: 28, letterSpacing: 6, opacity: 0.8, textTransform: "uppercase" }}>
        East Round 1
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ fontSize: 36, letterSpacing: 5, textTransform: "uppercase" }}>
          Philadelphia
        </div>
        <Img
          src={staticFile("assets/logos/sixers.svg")}
          style={{ width: 72, height: 72, objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });
  const push = interpolate(frame, [0, 90], [1.12, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={sceneBackground("rgba(0,122,51,0.32)", "rgba(0,107,182,0.34)")}>
      <GridOverlay />
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
      <TeamStrip />
      <AbsoluteFill style={{ justifyContent: "center", padding: "110px 110px 80px" }}>
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
            color: palette.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 180,
            lineHeight: 0.88,
            textTransform: "uppercase",
            transform: `translateY(${interpolate(reveal, [0, 1], [120, 0])}px) scale(${0.85 + reveal * 0.15})`,
            opacity: reveal,
          }}
        >
          CELTICS
          <br />
          76ERS
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
          {[data.schedule.matchup, `${data.schedule.game} • ${data.schedule.date}`, `${data.schedule.tipoff} • ${data.schedule.venue}`].map(
            (chip) => (
              <div
                key={chip}
                style={{
                  padding: "14px 24px",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(9,16,24,0.64)",
                  color: palette.cream,
                  fontSize: 30,
                  letterSpacing: 2,
                }}
              >
                {chip}
              </div>
            ),
          )}
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
        {data.pulse.slice(0, 2).map((item, index) => (
          <div
            key={item}
            style={{
              borderLeft: `8px solid ${index === 0 ? palette.green : palette.blue}`,
              paddingLeft: 18,
              color: "rgba(244,239,230,0.84)",
              fontSize: 28,
              lineHeight: 1.15,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PlayerCardsScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={sceneBackground("rgba(0,107,182,0.28)", "rgba(237,23,76,0.24)")}>
      <GridOverlay />
      <AbsoluteFill style={{ padding: "120px 76px 90px" }}>
        <div
          style={{
            color: palette.cream,
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
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {data.playerCards.map((card, index) => {
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
                  border: `2px solid ${card.color}`,
                  boxShadow: `0 35px 80px ${card.color}26`,
                  transform: `translateY(${rise}px) rotate(${rotate}deg) scale(${pulse})`,
                }}
              >
                <div
                  style={{
                    height: 360,
                    position: "relative",
                    overflow: "hidden",
                    background: `linear-gradient(180deg, ${card.color}55, rgba(255,255,255,0.06))`,
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
                      background: card.accent,
                      color: "#081018",
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
                    color: palette.cream,
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
                    color: card.accent,
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {card.team}
                </div>
                <div
                  style={{
                    marginTop: 22,
                    color: palette.cream,
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
                  Source: {card.source}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const EdgesScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={sceneBackground("rgba(0,122,51,0.18)", "rgba(186,150,83,0.22)")}>
      <GridOverlay />
      <AbsoluteFill style={{ padding: "110px 90px" }}>
        <div
          style={{
            color: palette.cream,
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 28,
          }}
        >
          {data.matchupEdges.map((edge, index) => {
            const start = index * 9;
            const x = interpolate(frame, [start, start + 22], [index === 1 ? 0 : index === 0 ? -180 : 180, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const opacity = interpolate(frame, [start, start + 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={edge.title}
                style={{
                  minHeight: 360,
                  padding: "30px 32px",
                  background: "rgba(7,14,22,0.76)",
                  borderTop: `10px solid ${edge.color}`,
                  transform: `translateX(${x}px)`,
                  opacity,
                }}
              >
                <div
                  style={{
                    color: edge.color,
                    fontSize: 30,
                    fontWeight: 800,
                    letterSpacing: 4,
                    textTransform: "uppercase",
                  }}
                >
                  {edge.title}
                </div>
                <div
                  style={{
                    marginTop: 20,
                    color: palette.cream,
                    fontFamily: '"Anton", sans-serif',
                    fontSize: 62,
                    lineHeight: 0.92,
                    textTransform: "uppercase",
                  }}
                >
                  {edge.title === "Availability watch" ? "EMBIID CLOUD" : edge.title === "Boston edge" ? "BASELINE ADVANTAGE" : "SHOT CREATION WINDOW"}
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
            Reality check
          </div>
          <div
            style={{
              marginTop: 16,
              color: palette.cream,
              fontSize: 30,
              lineHeight: 1.12,
            }}
          >
            This cut is sourced to official NBA coverage and official injury-report PDFs, not invented matchup lore.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const SocialBuzzScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={sceneBackground("rgba(237,23,76,0.18)", "rgba(0,107,182,0.22)")}>
      <GridOverlay />
      <AbsoluteFill style={{ padding: "110px 90px" }}>
        <div
          style={{
            color: palette.cream,
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
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {data.socialBuzz.map((post, index) => {
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
                  border: `1px solid ${post.color}`,
                  boxShadow: `0 24px 60px ${post.color}22`,
                  transform: `translateY(${lift}px)`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div
                    style={{
                      color: palette.cream,
                      fontSize: 28,
                      fontWeight: 800,
                      letterSpacing: 1,
                    }}
                  >
                    {post.handle}
                  </div>
                  <div
                    style={{
                      color: post.color,
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
                    color: palette.cream,
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

const CloseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    fps,
    frame,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });

  return (
    <AbsoluteFill style={sceneBackground("rgba(0,122,51,0.26)", "rgba(237,23,76,0.22)")}>
      <GridOverlay />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "80px 120px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 34,
            transform: `scale(${0.85 + reveal * 0.15})`,
            opacity: reveal,
          }}
        >
          <Img src={staticFile("assets/logos/celtics.svg")} style={{ width: 140, height: 140 }} />
          <div
            style={{
              color: palette.cream,
              fontFamily: '"Anton", sans-serif',
              fontSize: 150,
              textTransform: "uppercase",
            }}
          >
            vs
          </div>
          <Img src={staticFile("assets/logos/sixers.svg")} style={{ width: 140, height: 140 }} />
        </div>
        <div
          style={{
            marginTop: 30,
            color: palette.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 164,
            lineHeight: 0.88,
            textTransform: "uppercase",
            textAlign: "center",
            opacity: reveal,
          }}
        >
          GAME 1
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
          Built from local, sourced matchup data so this project can scale to more NBA preview videos without rewriting the edit from scratch.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const CelticsSixersPreview: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink }}>
      <Audio src={staticFile("audio/pulse.mp3")} volume={0.52} loop />
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>
      <Sequence from={138} durationInFrames={190}>
        <PlayerCardsScene />
      </Sequence>
      <Sequence from={316} durationInFrames={150}>
        <EdgesScene />
      </Sequence>
      <Sequence from={454} durationInFrames={150}>
        <SocialBuzzScene />
      </Sequence>
      <Sequence from={592} durationInFrames={128}>
        <CloseScene />
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
