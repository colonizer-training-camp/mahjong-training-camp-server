import { Router } from "express";
import authMiddleware from "src/middlewares/auth";
import auth from "./auth";
import record from "./record";
import site from "./site";

const router = Router();
router.use(authMiddleware);

router.get("/hello", (req, res) =>
  res.send({ hello: "https://www.acmicpc.net/problem/2557" })
);

router.use("/auth", auth);
router.use("/record", record);
router.use("/site", site);

export default router;
