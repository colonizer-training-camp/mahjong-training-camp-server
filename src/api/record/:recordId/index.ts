import { Router } from "express";
import { wrap } from "src/utils/asyncWrapper";
import $delete from "./$delete";

const router = Router();

router.delete("/", wrap($delete));

export default router;
