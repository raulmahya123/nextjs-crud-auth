import { AuthService } from "@/modules/auth/auth.service"
import { success, failure } from "@/app/lib/response"
import { handleCorsPreflight } from "@/app/lib/cors"
import { RegisterUserDTO } from "@/types/auth.dto"

// =========================
// PRE-FLIGHT
// =========================
export async function OPTIONS() {
  return handleCorsPreflight()
}

// =========================
// REGISTER
// =========================
export async function POST(req: Request) {
  const body: RegisterUserDTO = await req.json()

  const result = await AuthService.register(body)

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(result.data, 201)
}
