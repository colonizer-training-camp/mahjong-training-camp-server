import db from "src/database/db";

export const findUserByLoginId = async (loginId: string) => {
  const user = await db.user.findUnique({
    where: {
      loginId,
    },
  });
  return user;
};

export const findUserByUserId = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });
  return user;
};
