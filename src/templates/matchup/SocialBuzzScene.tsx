import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {MatchupPreviewData, SocialBuzz} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  SceneProgress,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

const BuzzCard: React.FC<{
  post: SocialBuzz;
  index: number;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
}> = ({post, index, homeTheme, awayTheme}) => {
  const frame = useCurrentFrame();
  const theme = resolveTheme(post.teamId, homeTheme, awayTheme);
  const accent = theme ? theme.colors.primary : awayTheme.colors.secondary;
  const progress = interpolate(frame, [index * 6, 28 + index * 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(progress, [0, 1], [index % 2 === 0 ? 130 : -130, 0]);
  const y = interpolate(progress, [0, 1], [70, 0]);

  return (
    <div
      style={{
        minHeight: 290,
        padding: "26px 28px",
        background: "rgba(8,16,24,0.82)",
        border: `1px solid ${accent}`,
        boxShadow: `0 24px 70px ${accent}20`,
        transform: `translate(${x}px, ${y}px) rotate(${index % 2 === 0 ? -2 : 2}deg)`,
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
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 1,
            }}
          >
            {post.date}
          </div>
        </div>
        <div
          style={{
            marginTop: 24,
            color: neutral.cream,
            fontSize: 34,
            lineHeight: 1.06,
            fontWeight: 600,
          }}
        >
          {post.text}
        </div>
        <div
          style={{
            marginTop: 24,
            color: "rgba(244,239,230,0.52)",
            fontSize: 16,
            letterSpacing: 1,
          }}
        >
          来自公开 X 帖文的讨论摘要
        </div>
    </div>
  );
};

export const SocialBuzzScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const bandX = interpolate(frame, [0, 120], [420, -240], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(awayTheme, 0.22),
        getSceneTint(awayTheme, 0.14),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <div
        style={{
          position: "absolute",
          left: bandX,
          top: 0,
          width: 380,
          height: "100%",
          background: `linear-gradient(180deg, ${awayTheme.colors.secondary}24, transparent 80%)`,
          transform: "skewX(-14deg)",
        }}
      />
      <AbsoluteFill style={{padding: "104px 88px 120px"}}>
        <div style={{display: "grid", gridTemplateColumns: "500px 1fr", gap: 28}}>
          <div>
            <div
              style={{
                color: neutral.sky,
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              社媒热度
            </div>
            <div
              style={{
                marginTop: 18,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 86,
                lineHeight: 0.98,
              }}
            >
              X 上最近
              <br />
              都在聊什么
            </div>
            <div
              style={{
                marginTop: 24,
                color: "rgba(244,239,230,0.84)",
                fontSize: 30,
                lineHeight: 1.12,
              }}
            >
              社媒层只负责补充温度，不负责替代事实分析。
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 22,
              alignItems: "start",
            }}
          >
            {data.socialBuzz.map((post, index) => (
              <BuzzCard
                key={`${post.handle}-${post.date}`}
                post={post}
                index={index}
                homeTheme={homeTheme}
                awayTheme={awayTheme}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <BottomTicker
        left="@NBA"
        center="只补充氛围，不制造虚构剧情"
        right="最近 X 讨论"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={3} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
