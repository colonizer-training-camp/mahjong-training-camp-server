import { Router } from "express";
import { wrap } from "src/utils/asyncWrapper";
import $put from "./$put";
import recordId from "./:recordId";

const router = Router();
router.use("/:recordId", recordId);

router.put("/", wrap($put));

export default router;
