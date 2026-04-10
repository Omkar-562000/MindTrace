import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "mindtrace-demo-secret";

export const signToken = (payload: JwtUserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): JwtUserPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
};
