import crypto from "crypto";
import config from "src/config";

export const safeHash = (str: string): string => {
  return crypto
    .createHash("sha256")
    .update(`${str}::${config.PASSWORD_SALT}`)
    .digest("hex");
};
