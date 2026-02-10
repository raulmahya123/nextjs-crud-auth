import { prisma } from "@/app/lib/prisma"
import { Prisma, User } from "@prisma/client"

export class AuthRepository {
  static async findByEmail(
    email: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  static async createUser(
    data: Prisma.UserCreateInput
  ): Promise<User> {
    return prisma.user.create({
      data,
    })
  }
}
