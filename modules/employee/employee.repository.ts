import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export class EmployeeRepository {
  static create(data: Prisma.EmployeeCreateInput) {
    return prisma.employee.create({ data });
  }

  static findAll() {
    return prisma.employee.findMany();
  }

  static findById(id: string) {
    return prisma.employee.findUnique({
      where: { id },
    });
  }

  // ✅ INI YANG KAMU PANGGIL DI SERVICE
  static findByEmail(email: string) {
    return prisma.employee.findUnique({
      where: { email },
    });
  }

  static update(id: string, data: Prisma.EmployeeUpdateInput) {
    return prisma.employee.update({
      where: { id },
      data,
    });
  }

  static delete(id: string) {
    return prisma.employee.delete({
      where: { id },
    });
  }
}
