import React from "react";
import {AbsoluteFill} from "remotion";
import {springTiming, TransitionSeries} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
import {wipe} from "@remotion/transitions/wipe";
import {TeamTheme} from "../themes/teams";
import {MatchupPreviewData} from "../types/matchup";
import {MatchupAudioBed} from "./MatchupAudioBed";
import {ClosingScene} from "./matchup/ClosingScene";
import {DeepAnalysisScene} from "./matchup/DeepAnalysisScene";
import {IntroHero} from "./matchup/IntroHero";
import {MatchupEdgesScene} from "./matchup/MatchupEdgesScene";
import {PlayerCardDeckScene} from "./matchup/PlayerCardDeckScene";
import {PlayoffPanoramaScene} from "./matchup/PlayoffPanoramaScene";
import {TacticalBoardScene} from "./matchup/TacticalBoardScene";
import {neutral} from "./matchup/shared";

export type MatchupPreviewTemplateProps = {
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
};

const transitionTiming = springTiming({
  durationInFrames: 10,
  config: {
    damping: 16,
    stiffness: 120,
    mass: 0.9,
  },
});

export const MatchupPreviewTemplate: React.FC<MatchupPreviewTemplateProps> = ({
  data,
  homeTheme,
  awayTheme,
}) => {
  return (
    <AbsoluteFill style={{backgroundColor: neutral.ink}}>
      <MatchupAudioBed data={data} musicVolumeWithVoiceover={0.18} musicVolumeWithoutVoiceover={0.52} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={205} name="Playoff Panorama">
          <PlayoffPanoramaScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={205}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={slide({direction: "from-right"})}
        />
        <TransitionSeries.Sequence durationInFrames={220} name="Intro Hero">
          <IntroHero
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={220}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={wipe({direction: "from-right"})}
        />
        <TransitionSeries.Sequence durationInFrames={250} name="Player Cards">
          <PlayerCardDeckScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={250}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={slide({direction: "from-bottom"})}
        />
        <TransitionSeries.Sequence durationInFrames={225} name="Matchup Edges">
          <MatchupEdgesScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={225}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={fade()}
        />
        <TransitionSeries.Sequence durationInFrames={240} name="Deep Analysis">
          <DeepAnalysisScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={240}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={wipe({direction: "from-bottom-left"})}
        />
        <TransitionSeries.Sequence durationInFrames={250} name="Tactical Board">
          <TacticalBoardScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={250}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={fade()}
        />
        <TransitionSeries.Sequence durationInFrames={150} name="Closing">
          <ClosingScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={150}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "14px solid rgba(244,239,230,0.08)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
