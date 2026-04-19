import React from "react";
import {celticsSixersPreview} from "./data/matchups/celtics-sixers";
import {getTeamTheme} from "./themes/teams";
import {MatchupPreviewTemplate} from "./templates/MatchupPreviewTemplate";

export const CelticsSixersPreview: React.FC = () => {
  return (
    <MatchupPreviewTemplate
      data={celticsSixersPreview}
      homeTheme={getTeamTheme(celticsSixersPreview.teams.home.teamId)}
      awayTheme={getTeamTheme(celticsSixersPreview.teams.away.teamId)}
      mode="broadcast"
    />
  );
};
