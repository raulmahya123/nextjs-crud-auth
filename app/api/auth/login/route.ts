import { AuthService } from "@/modules/auth/auth.service";
import { corsPreflight, withCors } from "@/app/lib/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return withCors(
      { message: "Email and password required" },
      400
    );
  }

  const user = await AuthService.login(email, password);
  if (!user) {
    return withCors(
      { message: "Invalid credentials" },
      401
    );
  }

  return withCors(
    { success: true, data: user }
  );
}
