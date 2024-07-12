import { Router } from "express";
import authMiddleware from "src/middlewares/auth";
import auth from "./auth";

const router = Router();
router.use(authMiddleware);

router.get("/hello", (req, res) =>
  res.send({ hello: "https://www.acmicpc.net/problem/2557" })
);

router.use("/auth", auth);

export default router;
