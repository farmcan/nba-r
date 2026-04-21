import React from "react";
import {Audio, AbsoluteFill, staticFile} from "remotion";
import {springTiming, TransitionSeries} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
import {TeamTheme} from "../themes/teams";
import {MatchupPreviewData} from "../types/matchup";
import {
  SocialClosingScene,
  SocialEdgesScene,
  SocialHookScene,
  SocialStarsScene,
} from "./matchup/SocialScenes";
import {neutral} from "./matchup/shared";

export type MatchupSocialPreviewTemplateProps = {
  data: MatchupPreviewData;
  homeTheme: TeamTheme;
  awayTheme: TeamTheme;
};

const transitionTiming = springTiming({
  durationInFrames: 10,
  config: {
    damping: 17,
    stiffness: 140,
    mass: 0.82,
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
        <TransitionSeries.Sequence durationInFrames={150} name="Hook">
          <SocialHookScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={150}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          timing={transitionTiming}
          presentation={slide({direction: "from-right"})}
        />
        <TransitionSeries.Sequence durationInFrames={180} name="Stars">
          <SocialStarsScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={180}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={transitionTiming} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={180} name="Edges">
          <SocialEdgesScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={180}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition timing={transitionTiming} presentation={fade()} />
        <TransitionSeries.Sequence durationInFrames={170} name="Closing">
          <SocialClosingScene
            data={data}
            homeTheme={homeTheme}
            awayTheme={awayTheme}
            durationInFrames={170}
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
