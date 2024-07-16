import { GameTypeDetails } from "./general";

export const toGameTypeDetailsResponse = (
  type: string,
  { players, totalScore, scoreType, winds, displayName }: GameTypeDetails
) => {
  return {
    type,
    players,
    totalScore,
    scoreType,
    winds,
    displayName,
  };
};
