import { RequestHandler } from "express";
import { gameTypes } from "src/model/gameType/general";
import { toGameTypeDetailsResponse } from "src/model/gameType/types";

const handler: RequestHandler = (req, res) => {
  res.send(
    Object.entries(gameTypes)
      .sort((a, b) => {
        return a[1].index - b[1].index;
      })
      .map(([k, v]) => toGameTypeDetailsResponse(k, v))
  );
};

export default handler;
