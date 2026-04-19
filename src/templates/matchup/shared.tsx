import React from "react";
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from "remotion";

export const neutral = {
  cream: "#F4EFE6",
  ink: "#07111B",
  sky: "#8FC2FF",
};

export const getSceneTint = (theme: { colors: { primary: string } }, alpha: number): string => {
  const hex = theme.colors.primary.replace("#", "");
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const sceneBackground = (
  left: string,
  right: string,
): React.CSSProperties => ({
  background: [
    `radial-gradient(circle at 18% 12%, ${left} 0%, transparent 34%)`,
    `radial-gradient(circle at 82% 14%, ${right} 0%, transparent 38%)`,
    "linear-gradient(135deg, #040B13 0%, #0A1622 48%, #07111B 100%)",
  ].join(", "),
  overflow: "hidden",
});

export const GridOverlay: React.FC<{opacity?: number}> = ({opacity = 0.18}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "84px 84px",
        opacity,
      }}
    />
  );
};

export const SceneChrome: React.FC<{
  homeTheme: { colors: { primary: string; secondary: string }; motifs: { gridOpacity: number; stripeAngle: number } };
  awayTheme: { colors: { secondary: string }; motifs: { gridOpacity: number; stripeAngle: number } };
}> = ({homeTheme, awayTheme}) => {
  return (
    <>
      <GridOverlay opacity={(homeTheme.motifs.gridOpacity + awayTheme.motifs.gridOpacity) / 2} />
      <div
        style={{
          position: "absolute",
          inset: 20,
          border: "1px solid rgba(244,239,230,0.11)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 16%, transparent 84%, rgba(255,255,255,0.06) 100%)",
          mixBlendMode: "screen",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -160,
          top: 120,
          width: 620,
          height: 8,
          background: `linear-gradient(90deg, transparent, ${homeTheme.colors.primary}, transparent)`,
          transform: `rotate(${homeTheme.motifs.stripeAngle}deg)`,
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -180,
          bottom: 150,
          width: 720,
          height: 8,
          background: `linear-gradient(90deg, transparent, ${awayTheme.colors.secondary}, transparent)`,
          transform: `rotate(${awayTheme.motifs.stripeAngle}deg)`,
          opacity: 0.75,
        }}
      />
    </>
  );
};

type ThemeLike = {
  teamId?: string;
  city?: string;
  name?: string;
  colors: { primary: string; secondary?: string; accent?: string; ink?: string };
};

export const resolveTheme = (
  teamId: string | undefined,
  homeTheme: ThemeLike,
  awayTheme: ThemeLike,
): ThemeLike | null => {
  if (!teamId) return null;
  if (teamId === homeTheme.teamId) return homeTheme;
  if (teamId === awayTheme.teamId) return awayTheme;
  return { colors: { primary: "#aaa", secondary: "#666" } };
};

export const TeamStrip: React.FC<{
  data: { teams: { home: { city: string }; away: { city: string } }; contextLabel: string };
  homeTheme: { assets: { logo: string } };
  awayTheme: { assets: { logo: string } };
}> = ({data, homeTheme, awayTheme}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: "34px 58px auto 58px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: neutral.cream,
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <Img
          src={staticFile(homeTheme.assets.logo)}
          style={{width: 68, height: 68, objectFit: "contain"}}
        />
        <div style={{fontSize: 34, letterSpacing: 5, textTransform: "uppercase"}}>
          {data.teams.home.city}
        </div>
      </div>
      <div
        style={{
          padding: "10px 18px",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(7,17,27,0.65)",
          color: "rgba(244,239,230,0.82)",
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        {data.contextLabel}
      </div>
      <div style={{display: "flex", alignItems: "center", gap: 18}}>
        <div style={{fontSize: 34, letterSpacing: 5, textTransform: "uppercase"}}>
          {data.teams.away.city}
        </div>
        <Img
          src={staticFile(awayTheme.assets.logo)}
          style={{width: 68, height: 68, objectFit: "contain"}}
        />
      </div>
    </div>
  );
};

export const BottomTicker: React.FC<{
  left: string;
  center: string;
  right: string;
  homeTheme: { colors: { primary: string } };
  awayTheme: { colors: { secondary: string } };
}> = ({left, center, right, homeTheme, awayTheme}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        bottom: 34,
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1.3fr",
        gap: 16,
      }}
    >
      {[
        {text: left, color: homeTheme.colors.primary},
        {text: center, color: neutral.sky},
        {text: right, color: awayTheme.colors.secondary},
      ].map((item) => (
        <div
          key={item.text}
          style={{
            padding: "12px 16px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(4,11,19,0.76)",
            color: neutral.cream,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            boxShadow: `inset 0 0 0 1px ${item.color}33`,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export const SceneProgress: React.FC<{
  activeIndex: number;
  durationInFrames: number;
  homeTheme: { colors: { primary: string; secondary: string } };
  labels?: string[];
}> = ({activeIndex, durationInFrames, homeTheme, labels}) => {
  const frame = useCurrentFrame();
  const sectionLabels = labels ?? ["全景", "对阵", "球星", "胜负手", "分析", "战术", "收尾"];
  const totalSections = sectionLabels.length;

  const currentProgress = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );

  const overallPct = ((activeIndex + currentProgress) / (totalSections - 1)) * 100;

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        right: 96,
        bottom: 48,
        height: 40,
        display: "flex",
        alignItems: "flex-end",
        gap: 0,
      }}
    >
      {/* Thin track */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 3,
          borderRadius: 2,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Filled portion with soft glow */}
        <div
          style={{
            width: `${overallPct}%`,
            height: "100%",
            borderRadius: 2,
            background: `linear-gradient(90deg, ${homeTheme.colors.primary}, ${homeTheme.colors.secondary})`,
            boxShadow: `0 0 12px ${homeTheme.colors.primary}44`,
          }}
        />
      </div>

      {/* Section dots + labels */}
      {sectionLabels.map((label, index) => {
        const leftPct = (index / (totalSections - 1)) * 100;
        const isDone = index < activeIndex;
        const isActive = index === activeIndex;
        const dotScale = isActive
          ? interpolate(frame, [0, 20], [0.7, 1], {extrapolateRight: "clamp"})
          : 1;
        const labelOpacity = isActive
          ? interpolate(frame, [0, 24], [0.3, 1], {extrapolateRight: "clamp"})
          : isDone
            ? 0.65
            : 0.3;

        return (
          <React.Fragment key={label}>
            {/* Label */}
            <div
              style={{
                position: "absolute",
                left: `${leftPct}%`,
                bottom: 20,
                transform: "translateX(-50%)",
                color: neutral.cream,
                fontSize: isActive ? 13 : 11,
                fontWeight: isActive ? 700 : 500,
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
                opacity: labelOpacity,
              }}
            >
              {label}
            </div>
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: `${leftPct}%`,
                bottom: -2,
                transform: `translateX(-50%) scale(${dotScale})`,
                width: isActive ? 9 : 6,
                height: isActive ? 9 : 6,
                borderRadius: 999,
                background: isActive || isDone
                  ? homeTheme.colors.primary
                  : "rgba(255,255,255,0.15)",
                boxShadow: isActive
                  ? `0 0 10px ${homeTheme.colors.primary}aa, 0 0 4px ${homeTheme.colors.primary}66`
                  : "none",
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Gliding indicator dot on the progress line */}
      <div
        style={{
          position: "absolute",
          left: `${overallPct}%`,
          bottom: -1,
          transform: "translateX(-50%)",
          width: 12,
          height: 12,
          borderRadius: 999,
          background: neutral.cream,
          boxShadow: `0 0 16px ${homeTheme.colors.primary}cc, 0 0 6px ${neutral.cream}88`,
          opacity: isActiveDot(activeIndex, totalSections),
        }}
      />
    </div>
  );
};

const isActiveDot = (activeIndex: number, total: number): number => {
  if (activeIndex >= total - 1) return 0.3;
  return 1;
};

// NBA Logo watermark — broadcast-style corner badge
export const NBAScoreBug: React.FC<{
  homeCity: string;
  awayCity: string;
  homeSeed: number;
  awaySeed: number;
  contextLabel: string;
}> = ({homeCity, awayCity, homeSeed, awaySeed, contextLabel}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        top: 20,
        height: 32,
        display: "flex",
        alignItems: "center",
        gap: 0,
        zIndex: 50,
        fontFamily: '"Noto Sans SC", sans-serif',
      }}
    >
      {/* NBA logo */}
      <div
        style={{
          width: 32,
          height: 32,
          background: "rgba(29,66,138,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px 0 0 4px",
        }}
      >
        <Img
          src={staticFile("assets/nba-logo.svg")}
          style={{width: 20, height: 20, objectFit: "contain"}}
        />
      </div>
      {/* Context label */}
      <div
        style={{
          padding: "0 12px",
          height: 32,
          background: "rgba(29,66,138,0.88)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 1.5,
          display: "flex",
          alignItems: "center",
          textTransform: "uppercase",
        }}
      >
        {contextLabel}
      </div>
      {/* Matchup */}
      <div
        style={{
          padding: "0 14px",
          height: 32,
          background: "rgba(7,17,27,0.88)",
          color: neutral.cream,
          fontSize: 13,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: "0 4px 4px 0",
          border: "1px solid rgba(255,255,255,0.1)",
          borderLeft: "none",
        }}
      >
        <span>{homeCity}</span>
        <span style={{color: "rgba(255,255,255,0.3)", fontSize: 11}}>#{homeSeed}</span>
        <span style={{color: "rgba(255,255,255,0.3)"}}>vs</span>
        <span>{awayCity}</span>
        <span style={{color: "rgba(255,255,255,0.3)", fontSize: 11}}>#{awaySeed}</span>
      </div>
    </div>
  );
};

// Court background image layer
export const CourtBg: React.FC<{
  src?: string;
  opacity?: number;
  scale?: number;
}> = ({src = "assets/court.jpg", opacity = 0.06, scale = 1}) => {
  return (
    <AbsoluteFill>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity,
          transform: `scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

// Basketball court SVG decorations — lines, hoops
export const CourtLines: React.FC<{
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({color = "rgba(255,255,255,0.04)", opacity = 1, style}) => {
  return (
    <div style={{position: "absolute", inset: 0, opacity, ...style}}>
      {/* Left hoop area */}
      <svg viewBox="0 0 400 200" style={{position: "absolute", left: -40, top: "20%", width: 400, height: 200}}>
        <circle cx="340" cy="100" r="60" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="0" y="50" width="120" height="100" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M 120 50 A 50 50 0 0 1 120 150" fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
      {/* Right hoop area */}
      <svg viewBox="0 0 400 200" style={{position: "absolute", right: -40, bottom: "10%", width: 400, height: 200}}>
        <circle cx="60" cy="100" r="60" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="280" y="50" width="120" height="100" fill="none" stroke={color} strokeWidth="1.5" />
        <path d="M 280 50 A 50 50 0 0 0 280 150" fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
    </div>
  );
};

// Diagonal slash divider — broadcast graphic element
export const SlashDivider: React.FC<{
  color?: string;
  width?: number;
  angle?: number;
}> = ({color = "rgba(255,255,255,0.06)", width = 3, angle = -25}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "-10%",
        width,
        height: "120%",
        background: color,
        transform: `rotate(${angle}deg)`,
        pointerEvents: "none",
      }}
    />
  );
};


// Text reveal: characters appear one by one
export const TextReveal: React.FC<{
  text: string;
  baseStyle?: React.CSSProperties;
  highlightStyle?: React.CSSProperties;
  highlightWords?: string[];
  startFrame?: number;
  charsPerTick?: number;
}> = ({text, baseStyle, highlightStyle, highlightWords, startFrame = 0, charsPerTick = 2}) => {
  const frame = useCurrentFrame();
  const chars = text.split("");
  const charCount = Math.floor((frame - startFrame) / charsPerTick);

  return (
    <span>
      {chars.map((char, i) => {
        if (i > charCount) return null;
        const isHighlighted = highlightWords?.some((w) => text.substring(Math.max(0, i - w.length + 1), i + 1) === w) ?? false;
        return (
          <span
            key={i}
            style={{
              ...baseStyle,
              ...(isHighlighted && highlightStyle ? highlightStyle : {}),
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

// ─── Atmosphere Components ───

// FloatingOrbs — blurred light blobs drifting in background
export const FloatingOrbs: React.FC<{
  colors?: string[];
  count?: number;
  opacity?: number;
}> = ({colors = ["#007A33", "#ED174C", "#F4B63D", "#2667FF"], count = 4, opacity = 0.12}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  // Deterministic seeded positions from index
  const seeded = (seed: number) => {
    const x = ((seed * 7919 + 104729) % 1000) / 1000;
    const y = ((seed * 6271 + 32749) % 1000) / 1000;
    return {x, y};
  };

  return (
    <>
      {Array.from({length: count}).map((_, i) => {
        const base = seeded(i * 37 + 13);
        const size = 200 + i * 80;
        const driftX = Math.sin(frame * 0.008 + i * 1.7) * 60;
        const driftY = Math.cos(frame * 0.006 + i * 2.3) * 40;
        const cx = base.x * width + driftX;
        const cy = base.y * height + driftY;
        const color = colors[i % colors.length];

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: cx - size / 2,
              top: cy - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              filter: `blur(${60 + i * 20}px)`,
              opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

// ParticleField — small dots rising upward, stadium dust effect
export const ParticleField: React.FC<{
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  opacity?: number;
}> = ({count = 40, color = "#F4EFE6", size = 2, speed = 0.5, opacity = 0.35}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

  const seeded = (seed: number) => {
    const x = ((seed * 7919 + 104729) % 1000) / 1000;
    const y = ((seed * 6271 + 32749) % 1000) / 1000;
    return {x, y};
  };

  return (
    <>
      {Array.from({length: count}).map((_, i) => {
        const base = seeded(i * 53 + 7);
        const baseX = base.x * width;
        const rise = ((frame * speed * 0.3 + base.y * 200) % (height + 40)) - 20;
        const wobble = Math.sin(frame * 0.02 + i * 3.1) * 15;
        const particleOpacity = Math.min(1, (height - rise) / 80) * Math.min(1, rise / 80) * opacity;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: baseX + wobble,
              top: height - rise,
              width: size + (i % 3) * 0.5,
              height: size + (i % 3) * 0.5,
              borderRadius: "50%",
              background: color,
              opacity: particleOpacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

// VignetteOverlay — radial dark gradient framing
export const VignetteOverlay: React.FC<{
  strength?: number;
}> = ({strength = 0.7}) => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${strength}) 100%)`,
        pointerEvents: "none",
      }}
    />
  );
};

// AmbientGrid — subtle breathing grid overlay
export const AmbientGrid: React.FC<{
  color?: string;
  baseOpacity?: number;
  cellSize?: number;
}> = ({color = "#fff", baseOpacity = 0.04, cellSize = 84}) => {
  const frame = useCurrentFrame();
  const breath = 0.7 + Math.sin(frame * 0.015) * 0.3;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(${color}${Math.round(baseOpacity * breath * 255).toString(16).padStart(2, "0")} 1px, transparent 1px), linear-gradient(90deg, ${color}${Math.round(baseOpacity * breath * 255).toString(16).padStart(2, "0")} 1px, transparent 1px)`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        pointerEvents: "none",
      }}
    />
  );
};

