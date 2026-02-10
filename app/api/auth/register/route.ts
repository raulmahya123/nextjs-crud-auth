import { AuthService } from "@/modules/auth/auth.service";
import { corsPreflight, withCors } from "@/app/lib/cors";

export async function OPTIONS() {
  return corsPreflight();
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const user = await AuthService.register(
      name,
      email,
      password
    );

    return withCors(
      { success: true, data: user },
      201
    );
  } catch (e: any) {
    return withCors(
      { message: e.message },
      400
    );
  }
}
