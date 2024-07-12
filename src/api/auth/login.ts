import { RequestHandler } from "express";
import { Record, String } from "runtypes";
import { findUserByLoginId } from "src/model/user/general";
import { safeHash } from "src/utils/hash";
import { UserToJWT } from "src/utils/jwt";

const Body = Record({
  loginId: String,
  password: String,
});

const login: RequestHandler = async (req, res) => {
  const { loginId, password } = Body.check(req.body);

  const user = await findUserByLoginId(loginId);

  if (!user) {
    res.status(401).send({
      message: "Invalid loginId or password",
    });
    return;
  }

  const hashedPassword = safeHash(password);
  if (user.hashedPassword !== hashedPassword) {
    res.status(401).send({
      message: "Invalid loginId or password",
    });
    return;
  }

  const jwt = UserToJWT(user, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)); // 7 days
  res.header("Authorization", `Bearer ${jwt}`).sendStatus(200);
};

export default login;
