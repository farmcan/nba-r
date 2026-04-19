import React from "react";

export type PlayerPose = "dribble" | "shoot" | "pass" | "defend" | "dunk" | "stand";

const POSE_PATHS: Record<PlayerPose, string> = {
  dribble: "M50 12 C50 6,58 2,64 6 C70 10,70 18,66 22 C62 26,58 28,56 32 L52 34 C48 36,44 34,42 30 L38 26 C34 22,28 20,24 24 L22 28 C20 32,22 38,26 40 L30 42 C34 44,38 46,40 50 L42 56 C44 62,48 70,50 78 L48 82 C46 86,44 90,46 94 L50 96 L54 94 C56 90,54 86,52 82 L50 78 C48 70,52 62,54 56 L56 50 C58 46,62 44,66 42 L72 38 C76 36,78 32,74 28 L70 24 C66 20,60 18,56 20 L52 22 C50 20,50 16,50 12 Z",
  shoot: "M50 10 C50 4,58 0,64 4 C70 8,70 16,66 20 C62 24,58 26,56 30 L52 32 C48 34,44 32,42 28 L38 24 C34 20,28 18,24 22 L22 26 C20 30,22 36,26 38 L30 40 C34 42,38 44,40 48 L42 54 C44 60,48 68,50 76 L48 80 C46 84,44 88,46 92 L50 94 L54 92 C56 88,54 84,52 80 L50 76 C48 68,52 60,54 54 L56 48 C58 44,62 42,66 40 L72 36 C76 34,78 30,74 26 L70 22 C66 18,60 16,56 18 L52 20 C50 18,50 14,50 10 Z",
  pass: "M50 10 C50 4,58 0,64 4 C70 8,70 16,66 20 C62 24,58 26,56 30 L52 32 C48 34,44 32,42 28 L38 24 C34 20,28 18,24 22 L22 26 C20 30,22 36,26 38 L30 40 C34 42,38 44,40 48 L42 54 C44 60,48 68,50 76 L48 80 C46 84,44 88,46 92 L50 94 L54 92 C56 88,54 84,52 80 L50 76 C48 68,52 60,54 54 L56 48 C58 44,62 42,66 40 L72 36 C76 34,78 30,74 26 L70 22 C66 18,60 16,56 18 L52 20 C50 18,50 14,50 10 Z",
  defend: "M50 10 C50 4,58 0,64 4 C70 8,70 16,66 20 C62 24,58 26,56 30 L52 32 C48 34,44 32,42 28 L38 24 C34 20,28 18,24 22 L22 26 C20 30,22 36,26 38 L30 40 C34 42,38 44,40 48 L42 54 C44 60,48 68,50 76 L48 80 C46 84,44 88,46 92 L50 94 L54 92 C56 88,54 84,52 80 L50 76 C48 68,52 60,54 54 L56 48 C58 44,62 42,66 40 L72 36 C76 34,78 30,74 26 L70 22 C66 18,60 16,56 18 L52 20 C50 18,50 14,50 10 Z",
  dunk: "M50 10 C50 4,58 0,64 4 C70 8,70 16,66 20 C62 24,58 26,56 30 L52 32 C48 34,44 32,42 28 L38 24 C34 20,28 18,24 22 L22 26 C20 30,22 36,26 38 L30 40 C34 42,38 44,40 48 L42 54 C44 60,48 68,50 76 L48 80 C46 84,44 88,46 92 L50 94 L54 92 C56 88,54 84,52 80 L50 76 C48 68,52 60,54 54 L56 48 C58 44,62 42,66 40 L72 36 C76 34,78 30,74 26 L70 22 C66 18,60 16,56 18 L52 20 C50 18,50 14,50 10 Z",
  stand: "M50 10 C50 4,58 0,64 4 C70 8,70 16,66 20 C62 24,58 26,56 30 L52 32 C48 34,44 32,42 28 L38 24 C34 20,28 18,24 22 L22 26 C20 30,22 36,26 38 L30 40 C34 42,38 44,40 48 L42 54 C44 60,48 68,50 76 L48 80 C46 84,44 88,46 92 L50 94 L54 92 C56 88,54 84,52 80 L50 76 C48 68,52 60,54 54 L56 48 C58 44,62 42,66 40 L72 36 C76 34,78 30,74 26 L70 22 C66 18,60 16,56 18 L52 20 C50 18,50 14,50 10 Z",
};

export const PlayerSilhouette: React.FC<{
  pose?: PlayerPose;
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({
  pose = "stand",
  color = "#F4EFE6",
  width = 80,
  height = 120,
  opacity = 0.12,
  style,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={width}
      height={height}
      style={{
        ...style,
        opacity,
      }}
    >
      <path d={POSE_PATHS[pose]} fill={color} />
    </svg>
  );
};

export const PlayerSilhouettesRow: React.FC<{
  count?: number;
  poses?: PlayerPose[];
  color?: string;
  width?: number;
  height?: number;
  opacity?: number;
  style?: React.CSSProperties;
}> = ({
  count = 5,
  poses = ["stand", "dribble", "shoot", "pass", "defend"],
  color = "#F4EFE6",
  width = 60,
  height = 90,
  opacity = 0.08,
  style,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "flex-end",
        ...style,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <PlayerSilhouette
          key={i}
          pose={poses[i % poses.length]}
          color={color}
          width={width}
          height={height}
          opacity={opacity * (1 - i * 0.1)}
        />
      ))}
    </div>
  );
};

export const PlayerHeadShot: React.FC<{
  initials: string;
  color: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ initials, color, size = 48, style }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${color}44, ${color}22)`,
        border: `2px solid ${color}66`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color,
        fontSize: size * 0.36,
        fontWeight: 900,
        letterSpacing: 1,
        ...style,
      }}
    >
      {initials}
    </div>
  );
};
