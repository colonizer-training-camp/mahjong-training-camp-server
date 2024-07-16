import { RequestHandler } from "express";
import db from "src/database/db";
import { toUserResponse } from "src/model/user/types";

const handler: RequestHandler = async (req, res) => {
  const users = await db.user.findMany({
    orderBy: {
      lastGameAt: {
        sort: "desc",
        nulls: "last",
      },
    },
  });

  res.send(users.map((u) => toUserResponse(u)));
};

export default handler;
