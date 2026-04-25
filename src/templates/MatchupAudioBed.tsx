import React from "react";
import {Audio, staticFile} from "remotion";
import {MatchupPreviewData} from "../types/matchup";

export const MatchupAudioBed: React.FC<{
  data: MatchupPreviewData;
  musicVolumeWithVoiceover?: number;
  musicVolumeWithoutVoiceover?: number;
}> = ({
  data,
  musicVolumeWithVoiceover = 0.18,
  musicVolumeWithoutVoiceover = 0.52,
}) => {
  const hasVoiceover = Boolean(data.voiceover?.audioSrc);

  return (
    <>
      <Audio
        src={staticFile("audio/pulse.mp3")}
        volume={() => (hasVoiceover ? musicVolumeWithVoiceover : musicVolumeWithoutVoiceover)}
        loop
      />
      {hasVoiceover ? (
        <Audio src={staticFile(data.voiceover!.audioSrc)} volume={1} />
      ) : null}
    </>
  );
};
