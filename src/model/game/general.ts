import { Prisma, Wind } from "@prisma/client";
import { Static } from "runtypes";
import { GameInputGuard } from "src/utils/guard";
import { gameTypes } from "../gameType/general";

const windRank: Record<Wind, number> = {
  [Wind.EAST]: 0,
  [Wind.SOUTH]: 1,
  [Wind.WEST]: 2,
  [Wind.NORTH]: 3,
};

export const gameInputToGameDataCreateInput = (
  gameInput: Static<typeof GameInputGuard>
): Prisma.GameRecordCreateInput => {
  const { gameType, userScores } = gameInput;
  userScores.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return windRank[a.initialSeat] - windRank[b.initialSeat];
  });

  const { uma, starsPerYakuman } = gameTypes[gameType];

  return {
    gameType,
    userScores: {
      create: userScores.map(
        ({ score, userId, initialSeat, yakuman: yakumanArray }, i) => {
          const stars = yakumanArray
            .flatMap((x) => x)
            .reduce((acc, x) => acc + starsPerYakuman[x], 0);
          return {
            score,
            user: {
              connect: { userId },
            },
            rank: i + 1,
            initialSeat,
            stars,
            uma: uma(score, i + 1),
            userScoreYakumanRecords: {
              create: yakumanArray.map((yakumans) => ({
                starCount: yakumans.reduce(
                  (acc, x) => acc + starsPerYakuman[x],
                  0
                ),
                userScoreYakuman: {
                  create: yakumans.map((yakuman) => ({ yakuman })),
                },
              })),
            },
          };
        }
      ),
    },
  };
};
