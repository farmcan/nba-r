import React from "react";
import {AbsoluteFill, useCurrentFrame} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {HeadToHeadNote, MatchupPreviewData, NarrativeThread, RecentFormNote, StyleProfile} from "../../types/matchup";
import {
  BottomTicker,
  SceneChrome,
  SceneProgress,
  getSceneTint,
  neutral,
  resolveTheme,
  sceneBackground,
} from "./shared";

const threadStyle = (frame: number, index: number): React.CSSProperties => {
  const progress = Math.max(0, Math.min(1, (frame - index * 5) / 18));
  return {
    transform: `translateY(${(1 - progress) * 40}px)`,
    opacity: progress,
  };
};

export const DeepAnalysisScene: React.FC<{
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
  durationInFrames: number;
}> = ({data, homeTheme, awayTheme, durationInFrames}) => {
  const frame = useCurrentFrame();
  const narratives = data.narrativeThreads ?? [];
  const headToHead = data.headToHead ?? [];
  const recentForm = data.recentForm ?? [];
  const styles = data.styleProfiles ?? [];

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.2),
        getSceneTint(awayTheme, 0.2),
      )}
    >
      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <AbsoluteFill style={{padding: "88px 72px 118px"}}>
        <div style={{display: "grid", gridTemplateColumns: "580px 1fr", gap: 28}}>
          <div>
            <div style={{color: neutral.sky, fontSize: 24, fontWeight: 800, letterSpacing: 2}}>深一层分析</div>
            <div
              style={{
                marginTop: 18,
                color: neutral.cream,
                fontFamily: '"Noto Sans SC", sans-serif',
                fontWeight: 900,
                fontSize: 84,
                lineHeight: 0.98,
              }}
            >
              不只是
              <br />
              谁更强
            </div>
            <div style={{marginTop: 20, color: "rgba(244,239,230,0.86)", fontSize: 28, lineHeight: 1.12}}>
              真正能撑住 20 到 30 秒视频内容密度的，是把故事线、近期状态、历史和风格冲突同时摆出来。
            </div>
            <div style={{marginTop: 24, display: "grid", gap: 16}}>
              {narratives.slice(0, 3).map((thread: NarrativeThread, index) => (
                <div
                  key={thread.title}
                  style={{
                    ...threadStyle(frame, index),
                    padding: "20px 22px",
                    background: "rgba(4,11,19,0.72)",
                    borderLeft: `8px solid ${(resolveTheme(thread.teamId, homeTheme, awayTheme) ?? homeTheme).colors.secondary}`,
                  }}
                >
                  <div style={{color: neutral.cream, fontSize: 26, fontWeight: 800}}>{thread.title}</div>
                  <div style={{marginTop: 10, color: "rgba(244,239,230,0.82)", fontSize: 24, lineHeight: 1.1}}>
                    {thread.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display: "grid", gridTemplateRows: "1fr 1fr", gap: 18}}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18}}>
              <div style={{padding: "22px 24px", background: "rgba(4,11,19,0.74)", border: "1px solid rgba(255,255,255,0.12)"}}>
                <div style={{color: neutral.sky, fontSize: 22, fontWeight: 800}}>历史与交手</div>
                <div style={{marginTop: 14, display: "grid", gap: 14}}>
                  {headToHead.slice(0, 2).map((note: HeadToHeadNote) => (
                    <div key={note.label}>
                      <div style={{color: neutral.cream, fontSize: 24, fontWeight: 800}}>{note.label}</div>
                      <div style={{marginTop: 8, color: "rgba(244,239,230,0.82)", fontSize: 22, lineHeight: 1.08}}>{note.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding: "22px 24px", background: "rgba(4,11,19,0.74)", border: "1px solid rgba(255,255,255,0.12)"}}>
                <div style={{color: neutral.sky, fontSize: 22, fontWeight: 800}}>近期状态</div>
                <div style={{marginTop: 14, display: "grid", gap: 14}}>
                  {recentForm.slice(0, 3).map((note: RecentFormNote) => (
                    <div key={note.label}>
                      <div style={{color: neutral.cream, fontSize: 24, fontWeight: 800}}>{note.label}</div>
                      <div style={{marginTop: 8, color: "rgba(244,239,230,0.82)", fontSize: 22, lineHeight: 1.08}}>{note.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{padding: "22px 24px", background: "rgba(4,11,19,0.74)", border: "1px solid rgba(255,255,255,0.12)"}}>
              <div style={{color: neutral.sky, fontSize: 22, fontWeight: 800}}>风格冲突</div>
              <div style={{marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18}}>
                {styles.slice(0, 2).map((profile: StyleProfile) => {
                  const theme = resolveTheme(profile.teamId, homeTheme, awayTheme) ?? homeTheme;
                  return (
                    <div key={profile.teamId} style={{padding: "18px 18px", background: `${theme.colors.primary}14`, border: `1px solid ${theme.colors.primary}44`}}>
                      <div style={{color: neutral.cream, fontSize: 26, fontWeight: 800}}>{theme.city} {theme.name}</div>
                      <div style={{marginTop: 10, color: theme.colors.accent, fontSize: 21, fontWeight: 700}}>{profile.identity}</div>
                      <div style={{marginTop: 12, color: "rgba(244,239,230,0.82)", fontSize: 20, lineHeight: 1.08}}>
                        <strong>进攻：</strong>{profile.offense}
                      </div>
                      <div style={{marginTop: 10, color: "rgba(244,239,230,0.82)", fontSize: 20, lineHeight: 1.08}}>
                        <strong>防守：</strong>{profile.defense}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <BottomTicker
        left="故事线 + 历史 + 近期状态"
        center="把事实组织成 tension"
        right="风格决定比赛样子"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={4} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
