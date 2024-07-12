import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Number, Record } from "runtypes";
import { findUserByUserId } from "src/model/user/general";
import config from "../config";
import { Integer } from "./guard";

const TOKEN_VERSION = 1;

const JWT = Record({
  userId: Integer,
  expiresAt: Number,
  tokenVersion: Number.optional(),
});

export class CredentialError extends Error {}

export function UserToJWT(user: User, expiresAt: Date): string {
  return jwt.sign(
    {
      userId: user.userId,
      tokenVersion: TOKEN_VERSION,
      expiresAt: expiresAt.getTime(),
    },
    config.JWT_SECRET
  );
}

export async function JWTToUser(token: string): Promise<User> {
  const data = await new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded: unknown) =>
      err ? reject(new CredentialError(err.message)) : resolve(decoded)
    );
  });

  try {
    const { userId, tokenVersion, expiresAt } = JWT.check(data);
    if (tokenVersion === undefined || tokenVersion < TOKEN_VERSION) {
      throw new CredentialError("Token version is too old");
    }
    if (expiresAt < Date.now()) {
      throw new CredentialError("Token has expired");
    }

    const user = await findUserByUserId(userId);
    if (!user) throw new CredentialError("Invalid credentials.");

    return user;
  } catch (err) {
    throw new CredentialError("Invalid credentials.");
  }
}
