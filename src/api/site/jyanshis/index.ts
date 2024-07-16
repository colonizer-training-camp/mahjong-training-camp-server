import { Router } from "express";
import { wrap } from "src/utils/asyncWrapper";
import $get from "./$get";

const router = Router();

router.get("/", wrap($get));

export default router;
