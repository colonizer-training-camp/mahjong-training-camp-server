import { Router } from "express";

const router = Router();

router.get("/hello", (req, res) =>
  res.send({ hello: "https://www.acmicpc.net/problem/2557" })
);

export default router;
