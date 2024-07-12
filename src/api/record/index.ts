import { Router } from "express";
import { wrap } from "src/utils/asyncWrapper";
import append from "./append";

const router = Router();

router.put("/append", wrap(append));

export default router;
