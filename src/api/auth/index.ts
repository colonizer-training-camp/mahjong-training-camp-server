import { Router } from "express";
import login from "./login";
import logout from "./logout";
import credentials from "./credentials";

const router = Router();

router.use("/credentials", credentials);
router.use("/login", login);
router.use("/logout", logout);

export default router;
