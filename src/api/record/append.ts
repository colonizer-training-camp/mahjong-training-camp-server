import { RequestHandler } from "express";
import db from "src/database/db";
import { gameInputToGameDataCreateInput } from "src/model/game/general";
import { GameInputGuard } from "src/utils/guard";

const Body = GameInputGuard;

const append: RequestHandler = async (req, res) => {
  const body = Body.check(req.body);

  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  await db.gameRecord.create({
    data: gameInputToGameDataCreateInput(body),
  });

  res.sendStatus(200);
};

export default append;
