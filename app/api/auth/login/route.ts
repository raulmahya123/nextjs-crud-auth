import { AuthService } from "@/modules/auth/auth.service";
import { error, success } from "@/app/lib/response";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return error("Email and password required", 400);
  }

  const user = await AuthService.login(email, password);
  if (!user) {
    return error("Invalid credentials", 401);
  }

  return success(user);
}
