import { RequestHandler } from "express";
import db from "src/database/db";
import { gameInputToGameDataCreateInput } from "src/model/game/general";
import { GameInputGuard } from "src/utils/guard";

const Body = GameInputGuard;

const handler: RequestHandler = async (req, res) => {
  const body = Body.check(req.body);

  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  await db.gameRecord.create({
    data: {
      ...gameInputToGameDataCreateInput(body),
      addedByUserId: req.user.userId,
    },
  });

  await db.user.updateMany({
    where: {
      userId: {
        in: body.userScores.map((x) => x.userId),
      },
    },
    data: {
      lastGameAt: new Date(),
    },
  });

  res.sendStatus(200);
};

export default handler;
