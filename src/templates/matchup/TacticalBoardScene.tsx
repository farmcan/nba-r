import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData, TacticalBoardItem} from "../../types/matchup";
import {PlayerSilhouettesRow} from "./PlayerSilhouettes";
import {
  BottomTicker,
  CourtBg,
  CourtLines,
  FloatingOrbs,
  NBAScoreBug,
  SceneChrome,
  SceneProgress,
  SlashDivider,
  VignetteOverlay,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

// Basketball half-court SVG (viewBox 0 0 500 470)
const HalfCourt: React.FC<{
  lineColor?: string;
  style?: React.CSSProperties;
}> = ({lineColor = "rgba(255,255,255,0.2)", style}) => {
  return (
    <svg viewBox="0 0 500 470" style={{position: "absolute", inset: 0, ...style}}>
      {/* Court boundary */}
      <rect x="2" y="2" width="496" height="466" rx="4" fill="none" stroke={lineColor} strokeWidth="2" />

      {/* Paint area (key) */}
      <rect x="170" y="2" width="160" height="190" fill="none" stroke={lineColor} strokeWidth="2" />

      {/* Free throw circle (top half) */}
      <path d="M 170 190 A 80 80 0 0 1 330 190" fill="none" stroke={lineColor} strokeWidth="2" />
      {/* Free throw circle (bottom half, dashed) */}
      <path d="M 170 190 A 80 80 0 0 0 330 190" fill="none" stroke={lineColor} strokeWidth="2" strokeDasharray="8 6" />

      {/* 3-point arc */}
      <path d="M 30 2 L 30 140 Q 30 280, 250 300 Q 470 280, 470 140 L 470 2" fill="none" stroke={lineColor} strokeWidth="2" />

      {/* Restricted area arc */}
      <path d="M 210 80 A 40 40 0 0 1 290 80" fill="none" stroke={lineColor} strokeWidth="2" />

      {/* Backboard */}
      <line x1="210" y1="40" x2="290" y2="40" stroke={lineColor} strokeWidth="3" />

      {/* Hash marks */}
      {[60, 100, 140].map((y) => (
        <g key={y}>
          <line x1="165" y1={y} x2="175" y2={y} stroke={lineColor} strokeWidth="1.5" />
          <line x1="325" y1={y} x2="335" y2={y} stroke={lineColor} strokeWidth="1.5" />
        </g>
      ))}

      {/* Center circle (bottom) */}
      <circle cx="250" cy="430" r="30" fill="none" stroke={lineColor} strokeWidth="2" />
      <line x1="2" y1="430" x2="498" y2="430" stroke={lineColor} strokeWidth="2" />
    </svg>
  );
};

// Player dot on court with pulsing ring
const CourtPlayer: React.FC<{
  x: number;
  y: number;
  color: string;
  number: string;
  label?: string;
  delay?: number;
}> = ({x, y, color, number, label, delay = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: Math.max(0, frame - delay),
    config: {damping: 18, stiffness: 150, mass: 0.7},
  });
  const scale = interpolate(enter, [0, 1], [0, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);

  // Pulse ring animation
  const pulsePhase = ((frame * 0.04) % 1);
  const pulseScale = 1 + pulsePhase * 0.5;
  const pulseOpacity = (1 - pulsePhase) * 0.3 * opacity;

  return (
    <>
      {/* Pulse ring */}
      <div
        style={{
          position: "absolute",
          left: x - 26,
          top: y - 26,
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: `scale(${pulseScale})`,
          opacity: pulseOpacity,
          zIndex: 9,
        }}
      />
      {/* Player dot */}
      <div
        style={{
          position: "absolute",
          left: x - 18,
          top: y - 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: color,
          color: "#07111B",
          fontSize: 14,
          fontWeight: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
          opacity,
          boxShadow: `0 0 16px ${color}88, 0 2px 8px rgba(0,0,0,0.4)`,
          zIndex: 10,
        }}
      >
        {number}
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: -18,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(244,239,230,0.8)",
            whiteSpace: "nowrap",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </div>
      )}
      </div>
    </>
  );
};

// Play arrow on court
const PlayArrow: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  dashed?: boolean;
  delay?: number;
}> = ({fromX, fromY, toX, toY, color, dashed, delay = 0}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );

  const midX = (fromX + toX) / 2 + (toY - fromY) * 0.15;
  const midY = (fromY + toY) / 2 - (toX - fromX) * 0.15;

  const currentX = fromX + (toX - fromX) * progress;
  const currentY = fromY + (toY - fromY) * progress;

  return (
    <svg style={{position: "absolute", inset: 0, pointerEvents: "none"}} viewBox="0 0 500 470">
      {/* Trail */}
      <path
        d={`M ${fromX} ${fromY} Q ${midX} ${midY} ${currentX} ${currentY}`}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeDasharray={dashed ? "8 6" : undefined}
        opacity="0.7"
        strokeLinecap="round"
      />
      {/* Arrowhead */}
      {progress > 0.3 && (
        <g
          transform={`translate(${currentX}, ${currentY}) rotate(${Math.atan2(currentY - midY, currentX - midX) * (180 / Math.PI)})`}
        >
          <polygon
            points="0,-6 10,0 0,6"
            fill={color}
            opacity="0.9"
          />
        </g>
      )}
    </svg>
  );
};

// 5-on-5 court visualization
const FiveOnFiveCourt: React.FC<{
  item: TacticalBoardItem;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  offensePlayers: {x: number; y: number; number: string; label: string}[];
  defensePlayers: {x: number; y: number; number: string; label: string}[];
  arrows: {fromX: number; fromY: number; toX: number; toY: number; color: string; dashed?: boolean; delay: number}[];
}> = ({item, homeTheme, awayTheme, offensePlayers, defensePlayers, arrows}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const offenseTheme = resolveTheme(item.offenseTeamId, homeTheme, awayTheme) ?? homeTheme;
  const defenseTheme = resolveTheme(item.defenseTeamId, homeTheme, awayTheme) ?? awayTheme;

  const titleReveal = spring({
    fps,
    frame,
    config: {damping: 15, stiffness: 120, mass: 0.9},
  });

  return (
    <div
      style={{
        position: "relative",
        height: 340,
        borderRadius: 12,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(15,60,30,0.35), rgba(8,35,18,0.45))",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      {/* Court */}
      <HalfCourt />

      {/* Offense players */}
      {offensePlayers.map((p, i) => (
        <CourtPlayer
          key={`off-${i}`}
          x={p.x}
          y={p.y}
          color={offenseTheme.colors.primary}
          number={p.number}
          label={p.label}
          delay={8 + i * 4}
        />
      ))}

      {/* Defense players */}
      {defensePlayers.map((p, i) => (
        <CourtPlayer
          key={`def-${i}`}
          x={p.x}
          y={p.y}
          color={defenseTheme.colors.primary}
          number={p.number}
          label={p.label}
          delay={8 + i * 4}
        />
      ))}

      {/* Play arrows */}
      {arrows.map((a, i) => (
        <PlayArrow
          key={`arrow-${i}`}
          fromX={a.fromX}
          fromY={a.fromY}
          toX={a.toX}
          toY={a.toY}
          color={a.color}
          dashed={a.dashed}
          delay={a.delay}
        />
      ))}

      {/* Play title overlay */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          right: 12,
          padding: "6px 14px",
          background: "rgba(7,17,27,0.8)",
          borderRadius: 6,
          backdropFilter: "blur(4px)",
          opacity: titleReveal,
          zIndex: 20,
        }}
      >
        <div style={{color: neutral.cream, fontSize: 16, fontWeight: 800, letterSpacing: 1}}>
          {item.title}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 12,
          right: 12,
          display: "flex",
          justifyContent: "space-between",
          padding: "6px 14px",
          background: "rgba(7,17,27,0.8)",
          borderRadius: 6,
          backdropFilter: "blur(4px)",
          opacity: titleReveal,
          zIndex: 20,
        }}
      >
        <div style={{display: "flex", alignItems: "center", gap: 6}}>
          <div style={{width: 10, height: 10, borderRadius: "50%", background: offenseTheme.colors.primary}} />
          <span style={{color: neutral.cream, fontSize: 11, fontWeight: 700}}>
            {offenseTheme.city} {offenseTheme.name}
          </span>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 6}}>
          <div style={{width: 10, height: 10, borderRadius: "50%", background: defenseTheme.colors.primary}} />
          <span style={{color: neutral.cream, fontSize: 11, fontWeight: 700}}>
            {defenseTheme.city} {defenseTheme.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export const TacticalBoardScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const board = data.tacticalBoard ?? [];

  const fadeUp = (index: number, startFrame: number) =>
    interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.1),
        getSceneTint(awayTheme, 0.12),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.07} />
      <CourtLines color="rgba(255,255,255,0.025)" opacity={0.35} />
      <FloatingOrbs colors={[homeTheme.colors.primary, awayTheme.colors.secondary, "#fff"]} count={3} opacity={0.07} />
      <VignetteOverlay strength={0.4} />

      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />
      <SlashDivider color={`${homeTheme.colors.primary}06`} width={1.5} angle={-18} />

      {/* Background silhouettes */}
      <div style={{position: "absolute", right: 40, top: 80, opacity: 0.06}}>
        <PlayerSilhouettesRow
          count={5}
          poses={["dribble", "shoot", "defend", "pass", "stand"]}
          color={homeTheme.colors.primary}
          width={100}
          height={150}
          opacity={0.5}
        />
      </div>
      <div style={{position: "absolute", left: 40, bottom: 120, opacity: 0.04, transform: "scaleX(-1)"}}>
        <PlayerSilhouettesRow
          count={4}
          poses={["defend", "pass", "shoot", "dribble"]}
          color={awayTheme.colors.secondary}
          width={80}
          height={120}
          opacity={0.5}
        />
      </div>

      <AbsoluteFill style={{padding: "86px 72px 118px"}}>
        {/* Header */}
        <div style={{marginBottom: 24, opacity: fadeUp(0, 0)}}>
          <div style={{color: neutral.sky, fontSize: 18, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase"}}>
            TACTICAL BOARD
          </div>
          <div
            style={{
              marginTop: 6,
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 64,
              lineHeight: 0.98,
            }}
          >
            这球会怎么打
          </div>
        </div>

        {/* Two tactical boards side by side */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24}}>
          {board.slice(0, 2).map((item, idx) => {
            const offenseTheme = resolveTheme(item.offenseTeamId, homeTheme, awayTheme) ?? homeTheme;
            const delay = idx * 15;

            // Standard pick-and-roll formation
            const offensePlayers = [
              {x: 120, y: 340, number: "1", label: "持球"},
              {x: 200, y: 220, number: "4", label: "掩护"},
              {x: 370, y: 320, number: "3", label: "弱侧"},
              {x: 420, y: 180, number: "2", label: "底角"},
              {x: 250, y: 120, number: "5", label: "弧顶"},
            ];
            const defensePlayers = [
              {x: 140, y: 310, number: "1", label: ""},
              {x: 210, y: 250, number: "4", label: ""},
              {x: 350, y: 290, number: "3", label: ""},
              {x: 400, y: 210, number: "2", label: ""},
              {x: 260, y: 150, number: "5", label: ""},
            ];

            const arrows = [
              {
                fromX: 120,
                fromY: 340,
                toX: 200,
                toY: 250,
                color: offenseTheme.colors.primary,
                delay: delay + 20,
              },
              {
                fromX: 200,
                fromY: 220,
                toX: 280,
                toY: 180,
                color: offenseTheme.colors.primary,
                dashed: true,
                delay: delay + 40,
              },
              {
                fromX: 280,
                fromY: 180,
                toX: 370,
                toY: 200,
                color: offenseTheme.colors.secondary ?? offenseTheme.colors.primary,
                delay: delay + 60,
              },
            ];

            return (
              <div
                key={item.title}
                style={{
                  opacity: fadeUp(idx, delay),
                }}
              >
                <FiveOnFiveCourt
                  item={item}
                  homeTheme={homeTheme}
                  awayTheme={awayTheme}
                  offensePlayers={offensePlayers}
                  defensePlayers={defensePlayers}
                  arrows={arrows}
                />

                {/* Play details below court */}
                <div style={{marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10}}>
                  {[
                    ["站位", item.setup],
                    ["触发", item.trigger],
                    ["第一读秒", item.read],
                    ["反制", item.counter ?? "无"],
                  ].map(([label, value]) => (
                    <div
                      key={label as string}
                      style={{
                        padding: "10px 12px",
                        background: "rgba(4,11,19,0.6)",
                        borderRadius: 6,
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <div style={{color: neutral.sky, fontSize: 12, fontWeight: 800, letterSpacing: 1}}>
                        {label}
                      </div>
                      <div style={{marginTop: 4, color: "rgba(244,239,230,0.82)", fontSize: 14, lineHeight: 1.12}}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <BottomTicker
        left="第一拍 / 协防 / 弱侧转移"
        center="5 对 5 战术拆解"
        right="把抽象分析落到动作"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={5} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
