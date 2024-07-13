import { RequestHandler } from "express";
import { Record } from "runtypes";
import db from "src/database/db";
import { IntegerString } from "src/utils/guard";

const Params = Record({
  recordId: IntegerString,
});

const handler: RequestHandler = async (req, res) => {
  const { recordId } = Params.check(req.params);

  if (!req.user) {
    res.sendStatus(401);
    return;
  }

  await db.gameRecord.delete({
    where: { gameId: +recordId },
  });

  res.sendStatus(200);
};

export default handler;
