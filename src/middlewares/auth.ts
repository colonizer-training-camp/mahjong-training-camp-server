import { RequestHandler } from "express";
import { Record, String } from "runtypes";
import { JWTToUser } from "../utils/jwt";

const Cookie = Record({
  Authorization: String,
});

const Auth: RequestHandler = async (req, res, next) => {
  let token: string | null = null;
  if (req.headers.authorization) {
    const auth = req.headers.authorization;
    if (auth.startsWith("Bearer ")) {
      token = auth.substring(7);
    }
  }
  if (Cookie.guard(req.signedCookies)) {
    token = req.signedCookies.Authorization;
  }

  if (token !== null) {
    try {
      const user = await JWTToUser(token);
      req.user = user;
    } catch (err) {
      // no-op
    }
  }
  next();
};

export default Auth;
