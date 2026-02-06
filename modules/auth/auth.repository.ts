import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class AuthRepository {
  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }
}
