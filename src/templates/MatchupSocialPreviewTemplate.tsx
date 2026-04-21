import React from "react";
import {Audio, AbsoluteFill, staticFile} from "remotion";
import {springTiming, TransitionSeries} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
import {wipe} from "@remotion/transitions/wipe";
import {TeamTheme} from "../themes/teams";
import {MatchupPreviewData} from "../types/matchup";
import {ClosingScene} from "./matchup/ClosingScene";
import {IntroHero} from "./matchup/IntroHero";
import {MatchupEdgesScene} from "./matchup/MatchupEdgesScene";
import {PlayerCardDeckScene} from "./matchup/PlayerCardDeckScene";
import {PlayoffPanoramaScene} from "./matchup/PlayoffPanoramaScene";
import {neutral} from "./matchup/shared";

export type MatchupSocialPreviewTemplateProps = {
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
};

const transitionTiming = springTiming({
  durationInFrames: 8,
  config: {
    damping: 18,
    stiffness: 135,
    mass: 0.8,
  },
});

export const MatchupSocialPreviewTemplate: React.FC<
  MatchupSocialPreviewTemplateProps
> = ({data, homeTheme, awayTheme}) => {
  const hasVoiceover = Boolean(data.voiceover?.audioSrc);

  return (
    <AbsoluteFill style={{backgroundColor: neutral.ink}}>
      <Audio
        src={staticFile("audio/pulse.mp3")}
        volume={() => (hasVoiceover ? 0.16 : 0.48)}
        loop
      />
      {hasVoiceover ? (
        <Audio src={staticFile(data.voiceover!.audioSrc)} volume={1} />
      ) : null}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120} name="Playoff Panorama">
          <PlayoffPanoramaScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={120}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={slide({direction: "from-right"})}
        />
        <TransitionSeries.Sequence durationInFrames={140} name="Intro Hero">
          <IntroHero
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={140}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={wipe({direction: "from-right"})}
        />
        <TransitionSeries.Sequence durationInFrames={170} name="Player Cards">
          <PlayerCardDeckScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={170}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={slide({direction: "from-bottom"})}
        />
        <TransitionSeries.Sequence durationInFrames={150} name="Matchup Edges">
          <MatchupEdgesScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={150}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={transitionTiming} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={100} name="Closing">
          <ClosingScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={100}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "12px solid rgba(244,239,230,0.08)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
