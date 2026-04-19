import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {TeamTheme} from "../../themes/teams";
import {HeadToHeadNote, MatchupPreviewData, NarrativeThread, RecentFormNote, StyleProfile} from "../../types/matchup";
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

const NARRATIVE_START = 0;
const H2H_START = 50;
const RECENT_START = 100;
const STYLES_START = 150;

const phaseReveal = (frame: number, start: number) =>
  interpolate(frame, [start, start + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const ComparisonBar: React.FC<{
  label: string;
  homeValue: number;
  awayValue: number;
  homeColor: string;
  awayColor: string;
  delay: number;
}> = ({label, homeValue, awayValue, homeColor, awayColor, delay}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const total = homeValue + awayValue;
  const homePct = total > 0 ? (homeValue / total) * 100 : 50;

  return (
    <div style={{opacity: reveal, transform: `translateY(${(1 - reveal) * 12}px)`}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4}}>
        <span style={{color: homeColor, fontSize: 22, fontWeight: 900, fontVariantNumeric: "tabular-nums"}}>
          {homeValue}
        </span>
        <span style={{color: "rgba(244,239,230,0.5)", fontSize: 13, fontWeight: 600}}>{label}</span>
        <span style={{color: awayColor, fontSize: 22, fontWeight: 900, fontVariantNumeric: "tabular-nums"}}>
          {awayValue}
        </span>
      </div>
      <div style={{
        height: 5,
        borderRadius: 3,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        display: "flex",
      }}>
        <div style={{
          width: `${homePct}%`,
          height: "100%",
          background: homeColor,
          borderRadius: "3px 0 0 3px",
          transition: "width 0.3s",
        }} />
        <div style={{
          width: `${100 - homePct}%`,
          height: "100%",
          background: awayColor,
          borderRadius: "0 3px 3px 0",
        }} />
      </div>
    </div>
  );
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

  const phase1 = phaseReveal(frame, NARRATIVE_START);
  const phase2 = phaseReveal(frame, H2H_START);
  const phase3 = phaseReveal(frame, RECENT_START);
  const phase4 = phaseReveal(frame, STYLES_START);

  return (
    <AbsoluteFill
      style={sceneBackground(
        getSceneTint(homeTheme, 0.1),
        getSceneTint(awayTheme, 0.1),
      )}
    >
      <CourtBg src="assets/court.jpg" opacity={0.05} />
      <CourtLines color="rgba(255,255,255,0.025)" opacity={0.4} />
      <FloatingOrbs colors={[homeTheme.colors.primary, awayTheme.colors.secondary, "#F4B63D"]} count={3} opacity={0.05} />
      <VignetteOverlay strength={0.45} />

      <SceneChrome homeTheme={homeTheme} awayTheme={awayTheme} />
      <NBAScoreBug
        homeCity={data.teams.home.city}
        awayCity={data.teams.away.city}
        homeSeed={data.teams.home.seed}
        awaySeed={data.teams.away.seed}
        contextLabel={data.contextLabel}
      />
      <SlashDivider color={`${homeTheme.colors.primary}06`} width={1.5} angle={-20} />

      <AbsoluteFill style={{padding: "82px 72px 118px"}}>
        {/* Header */}
        <div style={{marginBottom: 24}}>
          <div style={{color: neutral.sky, fontSize: 18, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase"}}>
            DEEP ANALYSIS
          </div>
          <div
            style={{
              marginTop: 6,
              color: neutral.cream,
              fontFamily: '"Noto Sans SC", sans-serif',
              fontWeight: 900,
              fontSize: 64,
              lineHeight: 1,
            }}
          >
            不只是谁更强
          </div>
        </div>

        {/* Phase 1: Story lines */}
        <div style={{
          opacity: phase1,
          transform: `translateY(${(1 - phase1) * 24}px)`,
          marginBottom: 20,
        }}>
          <div style={{color: neutral.sky, fontSize: 15, fontWeight: 700, marginBottom: 10, letterSpacing: 1}}>
            故事线 · NARRATIVES
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14}}>
            {narratives.slice(0, 3).map((thread: NarrativeThread, index) => {
              const theme = resolveTheme(thread.teamId, homeTheme, awayTheme) ?? homeTheme;
              return (
                <div
                  key={thread.title}
                  style={{
                    padding: "16px 18px",
                    background: "rgba(4,11,19,0.65)",
                    borderLeft: `4px solid ${theme.colors.primary}`,
                    borderRadius: "0 4px 4px 0",
                  }}
                >
                  <div style={{color: neutral.cream, fontSize: 18, fontWeight: 800, lineHeight: 1.1}}>
                    {thread.title}
                  </div>
                  <div style={{marginTop: 6, color: "rgba(244,239,230,0.75)", fontSize: 15, lineHeight: 1.2}}>
                    {thread.summary}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2-4: Two-column layout */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18}}>
          {/* Left: Head-to-head + Recent form */}
          <div style={{display: "grid", gap: 14}}>
            {/* Head-to-head */}
            <div style={{
              padding: "16px 18px",
              background: "rgba(4,11,19,0.65)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              opacity: phase2,
              transform: `translateY(${(1 - phase2) * 16}px)`,
            }}>
              <div style={{color: neutral.sky, fontSize: 15, fontWeight: 800, marginBottom: 10, letterSpacing: 1}}>
                历史交手 · HEAD-TO-HEAD
              </div>
              {headToHead.slice(0, 2).map((note: HeadToHeadNote) => (
                <div key={note.label} style={{marginBottom: 8}}>
                  <div style={{color: neutral.cream, fontSize: 17, fontWeight: 800}}>{note.label}</div>
                  <div style={{marginTop: 2, color: "rgba(244,239,230,0.7)", fontSize: 14, lineHeight: 1.15}}>
                    {note.detail}
                  </div>
                </div>
              ))}
              <div style={{marginTop: 10}}>
                <ComparisonBar
                  label="种子排名 (数字越高排名越低)"
                  homeValue={data.teams.home.seed}
                  awayValue={data.teams.away.seed}
                  homeColor={homeTheme.colors.primary}
                  awayColor={awayTheme.colors.secondary}
                  delay={H2H_START + 15}
                />
              </div>
            </div>

            {/* Recent form */}
            <div style={{
              padding: "16px 18px",
              background: "rgba(4,11,19,0.65)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 4,
              opacity: phase3,
              transform: `translateY(${(1 - phase3) * 16}px)`,
            }}>
              <div style={{color: neutral.sky, fontSize: 15, fontWeight: 800, marginBottom: 10, letterSpacing: 1}}>
                近期状态 · RECENT FORM
              </div>
              <div style={{display: "grid", gap: 10}}>
                {recentForm.slice(0, 3).map((note: RecentFormNote) => {
                  const theme = resolveTheme(note.teamId, homeTheme, awayTheme);
                  const accent = theme ? theme.colors.primary : neutral.sky;
                  return (
                    <div key={note.label} style={{paddingLeft: 10, borderLeft: `3px solid ${accent}`}}>
                      <div style={{color: neutral.cream, fontSize: 16, fontWeight: 700}}>{note.label}</div>
                      <div style={{marginTop: 2, color: "rgba(244,239,230,0.7)", fontSize: 14, lineHeight: 1.15}}>
                        {note.detail}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Style profiles */}
          <div style={{
            padding: "16px 18px",
            background: "rgba(4,11,19,0.65)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 4,
            opacity: phase4,
            transform: `translateY(${(1 - phase4) * 16}px)`,
          }}>
            <div style={{color: neutral.sky, fontSize: 15, fontWeight: 800, marginBottom: 14, letterSpacing: 1}}>
              风格冲突 · STYLE CLASH
            </div>
            <div style={{display: "grid", gap: 14}}>
              {styles.slice(0, 2).map((profile: StyleProfile) => {
                const theme = resolveTheme(profile.teamId, homeTheme, awayTheme) ?? homeTheme;
                return (
                  <div key={profile.teamId} style={{
                    padding: "14px 16px",
                    background: `${theme.colors.primary}08`,
                    border: `1px solid ${theme.colors.primary}22`,
                    borderRadius: 4,
                  }}>
                    <div style={{color: neutral.cream, fontSize: 20, fontWeight: 800}}>
                      {theme.city} {theme.name}
                    </div>
                    <div style={{marginTop: 4, color: theme.colors.accent ?? theme.colors.primary, fontSize: 14, fontWeight: 700}}>
                      {profile.identity}
                    </div>
                    <div style={{marginTop: 6, color: "rgba(244,239,230,0.7)", fontSize: 14, lineHeight: 1.2}}>
                      {profile.offense}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      <BottomTicker
        left="故事线 + 历史"
        center="近期状态 + 风格冲突"
        right="用数据说话"
        homeTheme={homeTheme}
        awayTheme={awayTheme}
      />
      <SceneProgress activeIndex={4} durationInFrames={durationInFrames} homeTheme={homeTheme} />
    </AbsoluteFill>
  );
};
