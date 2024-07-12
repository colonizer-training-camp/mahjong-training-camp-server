import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Number, Record, String } from "runtypes";
import db from "src/database/db";
import config from "../config";

const TOKEN_VERSION = 1;

const JWT = Record({
  loginId: String,
  expiresAt: Number,
  tokenVersion: Number.optional(),
});

export class CredentialError extends Error {}

export function UserToJWT(user: User, expiresAt: Date): string {
  return jwt.sign(
    {
      loginId: user.loginId,
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
    const { loginId, tokenVersion, expiresAt } = JWT.check(data);
    if (tokenVersion === undefined || tokenVersion < TOKEN_VERSION) {
      throw new CredentialError("Token version is too old");
    }
    if (expiresAt < Date.now()) {
      throw new CredentialError("Token has expired");
    }

    const user = await db.user.findUnique({
      where: {
        loginId,
      },
    });
    if (!user) throw new CredentialError("Invalid credentials.");

    return user;
  } catch (err) {
    throw new CredentialError("Invalid credentials.");
  }
}
