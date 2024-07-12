import { GameType, Wind, Yakuman } from "@prisma/client";
import { LocalizedString } from "src/types/i18n";
import { YAKUMAN_STARS_DEFAULT } from "./yakuman";

const RANK_UMA_HANCHAN_4P = [30, 10, -10, -30];
const RANK_UMA_HANCHAN_3P = [30, 0, -30];

export interface GameTypeDetails {
  players: number;
  totalScore: number;
  winds: Wind[];
  starsPerYakuman: Record<Yakuman, number>;
  uma: (score: number, rank: number) => number;
  displayName: LocalizedString;
}

export const gameTypes: Record<GameType, GameTypeDetails> = {
  P4_HANCHAN: {
    players: 4,
    totalScore: 100000,
    winds: [Wind.EAST, Wind.SOUTH, Wind.WEST, Wind.NORTH],
    starsPerYakuman: YAKUMAN_STARS_DEFAULT,
    uma: (score, rank) => {
      const scoreUma = (score - 25000) / 1000;
      const rankUma = RANK_UMA_HANCHAN_4P[rank - 1];
      return scoreUma + rankUma;
    },
    displayName: {
      ko: "4인 반장전",
      en: "4-player Hanchan",
      ja: "四人半荘戦",
    },
  },
  P3_HANCHAN: {
    players: 3,
    totalScore: 105000,
    winds: [Wind.EAST, Wind.SOUTH, Wind.WEST],
    starsPerYakuman: YAKUMAN_STARS_DEFAULT,
    uma: (score, rank) => {
      const scoreUma = (score - 35000) / 1000;
      const rankUma = RANK_UMA_HANCHAN_3P[rank - 1];
      return scoreUma + rankUma;
    },
    displayName: {
      ko: "3인 반장전",
      en: "3-player Hanchan",
      ja: "三人半荘戦",
    },
  },
  P4_TOUPUUSEN: {
    players: 4,
    totalScore: 100000,
    winds: [Wind.EAST, Wind.SOUTH, Wind.WEST, Wind.NORTH],
    starsPerYakuman: YAKUMAN_STARS_DEFAULT,
    uma: (score, rank) => {
      const scoreUma = (score - 25000) / 1000;
      const rankUma = RANK_UMA_HANCHAN_4P[rank - 1] / 2;
      return scoreUma + rankUma;
    },
    displayName: {
      ko: "4인 통풍전",
      en: "4-player Toupusen",
      ja: "四人東風戦",
    },
  },
  P3_TOUPUUSEN: {
    players: 3,
    totalScore: 105000,
    winds: [Wind.EAST, Wind.SOUTH, Wind.WEST],
    starsPerYakuman: YAKUMAN_STARS_DEFAULT,
    uma: (score, rank) => {
      const scoreUma = (score - 35000) / 1000;
      const rankUma = RANK_UMA_HANCHAN_3P[rank - 1] / 2;
      return scoreUma + rankUma;
    },
    displayName: {
      ko: "3인 통풍전",
      en: "3-player Toupusen",
      ja: "三人東風戦",
    },
  },
};
