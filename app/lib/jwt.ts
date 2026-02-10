import jwt, { JwtPayload } from "jsonwebtoken"

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not defined`)
  }
  return value
}

const JWT_SECRET = requireEnv("JWT_SECRET")

const JWT_EXPIRES_IN: jwt.SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]) ?? "1d"

export type AppJwtPayload = JwtPayload & {
  userId: string
  email?: string
  role?: string
}

export function signToken(payload: AppJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  })
}

export function verifyToken(token: string): AppJwtPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AppJwtPayload
  } catch {
    throw new Error("INVALID_TOKEN")
  }
}
