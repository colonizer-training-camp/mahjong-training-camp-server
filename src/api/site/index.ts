import { Router } from "express";
import game_types from "./game_types";
import jyanshis from "./jyanshis";

const router = Router();

router.use("/game_types", game_types);
router.use("/jyanshis", jyanshis);

export default router;
