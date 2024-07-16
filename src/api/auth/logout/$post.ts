import { RequestHandler } from "express";

const logout: RequestHandler = (req, res) => {
  res.clearCookie("Authorization");
  res.sendStatus(200);
};

export default logout;
