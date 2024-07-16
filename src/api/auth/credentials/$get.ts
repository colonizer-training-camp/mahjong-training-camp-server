import { RequestHandler } from "express";
import { toUserResponse } from "src/model/user/types";

const handler: RequestHandler = (req, res) => {
  if (!req.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  res.send(toUserResponse(req.user));
};

export default handler;
