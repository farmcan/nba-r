import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  interpolateColors,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  ink: "#090909",
  cream: "#f5efe0",
  red: "#f04e3e",
  gold: "#f4b63d",
  blue: "#2667ff",
};

const fitImage = (
  src: string,
  style?: React.CSSProperties,
): React.ReactElement => {
  return (
    <Img
      src={src}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }}
    />
  );
};

const SceneShell: React.FC<{
  children: React.ReactNode;
  tintA: string;
  tintB: string;
}> = ({ children, tintA, tintB }) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 20% 20%, ${tintA} 0%, transparent 35%), radial-gradient(circle at 80% 20%, ${tintB} 0%, transparent 45%), ${palette.ink}`,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
          opacity: 0.2,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

const AccentBars: React.FC<{ frame: number }> = ({ frame }) => {
  const slide = interpolate(frame, [0, 24], [-500, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: "80px auto 80px 80px",
          width: 24,
          transform: `translateX(${slide}px)`,
          background: `linear-gradient(180deg, ${palette.red}, ${palette.gold})`,
          boxShadow: `0 0 80px ${palette.red}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "120px 80px 120px auto",
          width: 18,
          transform: `translateX(${-slide}px)`,
          background: `linear-gradient(180deg, ${palette.blue}, ${palette.cream})`,
          boxShadow: `0 0 80px ${palette.blue}`,
        }}
      />
    </>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleProgress = spring({
    fps,
    frame,
    config: {
      damping: 14,
      stiffness: 140,
      mass: 0.8,
    },
  });
  const glow = interpolate(frame, [0, 75], [0.6, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell tintA="rgba(240,78,62,0.35)" tintB="rgba(38,103,255,0.28)">
      {fitImage(staticFile("assets/court.jpg"), {
        opacity: 0.22,
        transform: `scale(${1.05 + frame * 0.0009})`,
      })}
      <AccentBars frame={frame} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: "120px 130px",
        }}
      >
        <div
          style={{
            color: palette.gold,
            fontFamily: '"Barlow Condensed", sans-serif',
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: 12,
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 20], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          2026 playoff opener
        </div>
        <div
          style={{
            fontFamily: '"Anton", sans-serif',
            fontSize: 230,
            lineHeight: 0.9,
            marginTop: 28,
            color: palette.cream,
            textTransform: "uppercase",
            transform: `translateY(${interpolate(
              titleProgress,
              [0, 1],
              [120, 0],
            )}px) scale(${0.84 + titleProgress * 0.16})`,
            opacity: titleProgress,
            textShadow: `0 0 ${120 * glow}px rgba(240,78,62,0.22)`,
          }}
        >
          PLAYOFF
          <br />
          PULSE
        </div>
        <div
          style={{
            marginTop: 32,
            width: 840,
            color: "rgba(245,239,224,0.82)",
            fontSize: 48,
            lineHeight: 1.1,
            letterSpacing: 1,
            opacity: interpolate(frame, [14, 34], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Lights up. Crowd rises. Every possession feels like a last shot.
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 90,
          color: palette.cream,
          fontSize: 42,
          letterSpacing: 8,
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        April 18
      </div>
    </SceneShell>
  );
};

const Stars: React.FC = () => {
  const frame = useCurrentFrame();
  const leftX = interpolate(frame, [0, 18], [-220, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });
  const rightX = interpolate(frame, [0, 18], [220, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: "clamp",
  });
  const slashW = interpolate(frame, [0, 24], [0, 560], {
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell tintA="rgba(38,103,255,0.22)" tintB="rgba(244,182,61,0.22)">
      <AbsoluteFill style={{ flexDirection: "row" }}>
        <div
          style={{
            flex: 1,
            transform: `translateX(${leftX}px)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {fitImage(staticFile("assets/curry.jpg"), {
            objectPosition: "center top",
            filter: "contrast(1.12) saturate(1.08)",
          })}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(9,9,9,0.1), rgba(9,9,9,0.6))",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            transform: `translateX(${rightX}px)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {fitImage(staticFile("assets/lebron.jpg"), {
            objectPosition: "center 20%",
            filter: "contrast(1.12) saturate(1.02)",
          })}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(270deg, rgba(9,9,9,0.18), rgba(9,9,9,0.62))",
            }}
          />
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: -120,
          width: slashW,
          height: 1320,
          transform: "translateX(-50%) rotate(14deg)",
          background: `linear-gradient(180deg, ${palette.gold}, ${palette.red})`,
          boxShadow: `0 0 120px rgba(244,182,61,0.45)`,
          opacity: 0.88,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "90px 110px auto 110px",
          display: "flex",
          justifyContent: "space-between",
          color: palette.cream,
          fontFamily: '"Anton", sans-serif',
          fontSize: 150,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <div>CURRY</div>
        <div>LEBRON</div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: "auto 0 120px 0",
          textAlign: "center",
          color: "rgba(245,239,224,0.92)",
          fontSize: 70,
          fontWeight: 800,
          letterSpacing: 10,
          textTransform: "uppercase",
        }}
      >
        Legends still bending the spotlight
      </div>
    </SceneShell>
  );
};

const PulseCards: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = [
    { label: "Scene", value: "Round one chaos", color: palette.red },
    { label: "Energy", value: "Fast breaks and static", color: palette.gold },
    { label: "Mood", value: "One-shot pressure", color: palette.blue },
  ];

  return (
    <SceneShell tintA="rgba(240,78,62,0.18)" tintB="rgba(38,103,255,0.18)">
      {fitImage(staticFile("assets/curry-james.jpg"), {
        opacity: 0.2,
        filter: "grayscale(0.05) contrast(1.1)",
      })}
      <div
        style={{
          position: "absolute",
          inset: "90px 110px auto 110px",
          color: palette.cream,
          fontFamily: '"Anton", sans-serif',
          fontSize: 170,
          lineHeight: 0.95,
          textTransform: "uppercase",
          width: 1200,
        }}
      >
        THIS ISN'T
        <br />
        REGULAR SEASON
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          right: 110,
          bottom: 110,
          display: "flex",
          gap: 28,
        }}
      >
        {cards.map((card, index) => {
          const start = index * 7;
          const rise = interpolate(frame, [start, start + 18], [120, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const opacity = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={card.label}
              style={{
                flex: 1,
                minHeight: 270,
                padding: "32px 36px",
                background: "rgba(9,9,9,0.68)",
                border: `2px solid ${card.color}`,
                boxShadow: `0 0 60px ${card.color}33`,
                transform: `translateY(${rise}px)`,
                opacity,
              }}
            >
              <div
                style={{
                  color: card.color,
                  fontSize: 34,
                  fontWeight: 800,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  marginTop: 24,
                  color: palette.cream,
                  fontFamily: '"Anton", sans-serif',
                  fontSize: 76,
                  lineHeight: 0.92,
                  textTransform: "uppercase",
                }}
              >
                {card.value}
              </div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};

const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zoom = interpolate(frame, [0, 90], [1.12, 1], {
    extrapolateRight: "clamp",
  });
  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 16,
      stiffness: 120,
      mass: 0.8,
    },
  });
  const ringColor = interpolateColors(
    frame,
    [0, 90],
    [palette.red, palette.blue],
  );

  return (
    <SceneShell tintA="rgba(244,182,61,0.24)" tintB="rgba(38,103,255,0.24)">
      {fitImage(staticFile("assets/court.jpg"), {
        opacity: 0.18,
        transform: `scale(${zoom})`,
      })}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 510,
            height: 510,
            borderRadius: 9999,
            border: `12px solid ${ringColor}`,
            boxShadow: `0 0 160px ${ringColor}55`,
            transform: `scale(${0.76 + reveal * 0.24})`,
            opacity: reveal,
            position: "absolute",
          }}
        />
        <Img
          src={staticFile("assets/nba-logo.svg")}
          style={{
            width: 126,
            height: 280,
            objectFit: "contain",
            opacity: reveal,
            filter: "drop-shadow(0 0 40px rgba(255,255,255,0.25))",
          }}
        />
        <div
          style={{
            marginTop: 360,
            color: palette.cream,
            fontFamily: '"Anton", sans-serif',
            fontSize: 150,
            lineHeight: 0.9,
            letterSpacing: 4,
            textTransform: "uppercase",
            textAlign: "center",
            transform: `translateY(${interpolate(reveal, [0, 1], [80, 0])}px)`,
            opacity: reveal,
          }}
        >
          NBA
          <br />
          PLAYOFFS
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 110,
            color: palette.gold,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: 0.92,
          }}
        >
          Lights. Contact. Legacy.
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const NoisePass: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        mixBlendMode: "screen",
        opacity: 0.08,
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.9) 0, transparent 1.6px), radial-gradient(circle at 70% 40%, rgba(255,255,255,0.75) 0, transparent 1.2px), radial-gradient(circle at 40% 75%, rgba(255,255,255,0.9) 0, transparent 1.8px)",
        backgroundSize: `${160 + (frame % 3) * 30}px ${160 + ((frame + 1) % 3) * 25}px`,
      }}
    />
  );
};

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.ink }}>
      <Audio src={staticFile("audio/pulse.mp3")} volume={() => 0.45} loop />
      <Sequence durationInFrames={120}>
        <Intro />
      </Sequence>
      <Sequence from={110} durationInFrames={150}>
        <Stars />
      </Sequence>
      <Sequence from={250} durationInFrames={180}>
        <PulseCards />
      </Sequence>
      <Sequence from={430} durationInFrames={200}>
        <Finale />
      </Sequence>
      <NoisePass />
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "18px solid rgba(245,239,224,0.08)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
