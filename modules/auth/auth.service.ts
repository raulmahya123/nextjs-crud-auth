import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { ServiceResponse } from "@/types/service-response";
import { signToken } from "@/app/lib/jwt";

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string
  ): Promise<ServiceResponse<any>> {
    if (!name || !email || !password) {
      return {
        success: false,
        status: 400,
        message: "Name, email, and password are required",
      };
    }

    const exists = await AuthRepository.findByEmail(email);
    if (exists) {
      return {
        success: false,
        status: 409,
        message: "Email already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      success: true,
      status: 201,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  static async login(
    email: string,
    password: string
  ): Promise<ServiceResponse<any>> {
    if (!email || !password) {
      return {
        success: false,
        status: 400,
        message: "Email and password are required",
      };
    }

    const user = await AuthRepository.findByEmail(email);
    if (!user) {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials",
      };
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return {
        success: false,
        status: 401,
        message: "Invalid credentials",
      };
    }

    // ✅ JWT PAYLOAD (MINIMAL & AMAN)
    const token = signToken({
      sub: user.id,
      email: user.email,
    });

    return {
      success: true,
      status: 200,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    };
  }
}
