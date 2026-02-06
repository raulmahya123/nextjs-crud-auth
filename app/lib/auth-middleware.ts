import { NextResponse } from "next/server";
import { verifyToken } from "./jwt";

export function withAuth(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    try {
      const authHeader = req.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];
      const payload = verifyToken(token);

      // inject user ke request (opsional)
      (req as any).user = payload;

      return handler(req, ...args);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  };
}
