import { Router } from "express";
import { wrap } from "src/utils/asyncWrapper";
import $post from "./$post";

const router = Router();

router.post("/", wrap($post));

export default router;
