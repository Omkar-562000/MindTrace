import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LENGTH = 64;

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, originalHash] = storedHash.split(":");

  if (!salt || !originalHash) {
    return false;
  }

  const currentHash = scryptSync(password, salt, KEY_LENGTH);
  const originalHashBuffer = Buffer.from(originalHash, "hex");

  if (currentHash.length !== originalHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(currentHash, originalHashBuffer);
};
