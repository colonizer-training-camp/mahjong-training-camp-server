import { User } from "@prisma/client";

export const toUserResponse = ({
  userId,
  loginId,
  displayName,
  isHost,
}: User) => {
  return {
    userId,
    loginId,
    displayName,
    isHost,
  };
};
