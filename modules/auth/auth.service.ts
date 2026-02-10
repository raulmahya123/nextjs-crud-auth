import bcrypt from "bcrypt"
import { AuthRepository } from "./auth.repository"
import { ServiceResponse } from "@/types/service-response"
import { signToken } from "@/app/lib/jwt"
import {
  RegisterUserDTO,
  LoginUserDTO,
} from "@/types/auth.dto"

export class AuthService {
  static async register(
    data: RegisterUserDTO
  ): Promise<
    ServiceResponse<{
      id: string
      name: string
      email: string
    }>
  > {
    const { name, email, password } = data

    if (!name || !email || !password) {
      return { ok: false, error: "INVALID_INPUT" }
    }

    const exists = await AuthRepository.findByEmail(email)
    if (exists) {
      return { ok: false, error: "EMAIL_ALREADY_REGISTERED" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
    })

    return {
      ok: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }

  static async login(
    data: LoginUserDTO
  ): Promise<
    ServiceResponse<{
      user: {
        id: string
        name: string
        email: string
      }
      token: string
    }>
  > {
    const { email, password } = data

    if (!email || !password) {
      return { ok: false, error: "INVALID_CREDENTIALS" }
    }

    const user = await AuthRepository.findByEmail(email)
    if (!user) {
      return { ok: false, error: "INVALID_CREDENTIALS" }
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return { ok: false, error: "INVALID_CREDENTIALS" }
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    })

    return {
      ok: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    }
  }
}
