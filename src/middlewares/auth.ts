import { RequestHandler } from "express";
import { JWTToUser } from "../utils/jwt";

const Auth: RequestHandler = async (req, res, next) => {
  let token: string | null = null;
  if (req.headers.authorization) {
    const auth = req.headers.authorization;
    if (auth.startsWith("Bearer ")) {
      token = auth.substring(7);
    }
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
