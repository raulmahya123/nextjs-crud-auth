import { AuthService } from "@/modules/auth/auth.service";
import { success, error } from "@/app/lib/response";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const user = await AuthService.register(
      name,
      email,
      password
    );

    return success(user, 201);
  } catch (e: any) {
    return error(e.message, 400);
  }
}
