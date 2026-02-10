import { AuthService } from "@/modules/auth/auth.service"
import { success, failure } from "@/app/lib/response"
import { handleCorsPreflight } from "@/app/lib/cors"
import { LoginUserDTO } from "@/types/auth.dto"

// =========================
// PRE-FLIGHT
// =========================
export async function OPTIONS() {
  return handleCorsPreflight()
}

// =========================
// LOGIN
// =========================
export async function POST(req: Request) {
  const body: LoginUserDTO = await req.json()

  const result = await AuthService.login(body)

  if (!result.ok) {
    return failure(result.error, 401)
  }

  return success(result.data)
}
