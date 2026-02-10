// lib/auth-middleware.ts
import { verifyToken, AppJwtPayload } from "./jwt"
import { failure } from "./response"

type Handler = (
  req: Request,
  context?: any
) => Promise<Response>

export function withAuth(handler: Handler): Handler {
  return async (req, context) => {
    const authHeader = req.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return failure("Unauthorized", 401)
    }

    const token = authHeader.split(" ")[1]

    try {
      const payload = verifyToken(token)

      // inject user ke request (controlled & explicit)
      ;(req as Request & { user: AppJwtPayload }).user = payload

      return handler(req, context)
    } catch {
      return failure("Unauthorized", 401)
    }
  }
}
