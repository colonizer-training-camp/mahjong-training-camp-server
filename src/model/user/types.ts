import { User } from "@prisma/client";

export const toUserResponse = ({
  userId,
  loginId,
  displayName,
  isHost,
  lastGameAt,
}: User) => {
  return {
    userId,
    loginId,
    displayName,
    isHost,
    lastGameAt: lastGameAt?.toISOString() || null,
  };
};
