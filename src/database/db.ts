import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: process.env.SUPPRESS_LOGS
    ? []
    : process.env.NODE_ENV !== "production"
    ? ["query", "info", "warn", "error"]
    : ["warn"],
});

export default db;
