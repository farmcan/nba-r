import React from "react";
import {celticsSixersPreview} from "./data/matchups/celtics-sixers";
import {getTeamTheme} from "./themes/teams";
import {MatchupSocialPreviewTemplate} from "./templates/MatchupSocialPreviewTemplate";

export const CelticsSixersSocialPreview: React.FC = () => {
  return (
    <MatchupSocialPreviewTemplate
      data={celticsSixersPreview}
      homeTheme={getTeamTheme(celticsSixersPreview.teams.home.teamId)}
      awayTheme={getTeamTheme(celticsSixersPreview.teams.away.teamId)}
    />
  );
};
