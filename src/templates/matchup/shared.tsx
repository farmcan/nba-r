import React from "react";
import {AbsoluteFill, Img, staticFile} from "remotion";
import {getTeamTheme, TeamTheme} from "../../themes/teams";
import {MatchupPreviewData, TeamId} from "../../types/matchup";

export const neutral = {
  cream: "#F4EFE6",
  ink: "#07111B",
  sky: "#8FC2FF",
};

export const getSceneTint = (theme: TeamTheme, alpha: number): string => {
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
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
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

export const resolveTheme = (
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

export const TeamStrip: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
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
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
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
            letterSpacing: 2,
            textTransform: "uppercase",
            boxShadow: `inset 0 0 0 1px ${item.color}33`,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

