import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
