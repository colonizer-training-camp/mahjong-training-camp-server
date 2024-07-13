import { GameType, Wind, Yakuman } from "@prisma/client";
import {
  Array as ArrayType,
  Number as NumberType,
  Record as RecordType,
  String as StringType,
} from "runtypes";
import { gameTypes } from "src/model/gameType/general";

export const GameTypeGuard = StringType.withConstraint<GameType>((x) =>
  Object.keys(GameType).includes(x)
);

export const WindGuard = StringType.withConstraint<Wind>((x) =>
  Object.keys(Wind).includes(x)
);

export const YakumanGuard = StringType.withConstraint<Yakuman>((x) =>
  Object.keys(Yakuman).includes(x)
);

export const Integer = NumberType.withConstraint((x) => Number.isInteger(x));

export const IntegerString = StringType.withConstraint((x) =>
  Number.isInteger(Number(x))
);

export const GameInputGuard = RecordType({
  gameType: GameTypeGuard,
  userScores: ArrayType(
    RecordType({
      userId: Integer,
      initialSeat: WindGuard,
      score: Integer,
      yakuman: ArrayType(ArrayType(YakumanGuard)),
    })
  ),
}).withConstraint(({ gameType, userScores }) => {
  const { players, totalScore, winds } = gameTypes[gameType];
  if (userScores.length !== players) {
    return false;
  }
  const sum = userScores.reduce((acc, { score }) => acc + score, 0);
  if (sum !== totalScore) {
    return false;
  }
  const playerWinds = new Set<Wind>();
  userScores.forEach(({ initialSeat }) => playerWinds.add(initialSeat));
  if (playerWinds.size !== players) {
    return false;
  }
  if (Array.from(playerWinds).some((wind) => !winds.includes(wind))) {
    return false;
  }
  return true;
});
