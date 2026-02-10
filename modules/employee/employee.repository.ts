import { prisma } from "@/app/lib/prisma"
import { Prisma, Employee } from "@prisma/client"

export class EmployeeRepository {
  static async create(
    data: Prisma.EmployeeCreateInput
  ): Promise<Employee> {
    return prisma.employee.create({ data })
  }

  static async findAll(): Promise<Employee[]> {
    return prisma.employee.findMany()
  }

  static async findById(id: string): Promise<Employee | null> {
    return prisma.employee.findUnique({
      where: { id },
    })
  }

  static async findByEmail(
    email: string
  ): Promise<Employee | null> {
    return prisma.employee.findUnique({
      where: { email },
    })
  }

  static async update(
    id: string,
    data: Prisma.EmployeeUpdateInput
  ): Promise<Employee> {
    return prisma.employee.update({
      where: { id },
      data,
    })
  }

  static async delete(id: string): Promise<Employee> {
    return prisma.employee.delete({
      where: { id },
    })
  }
}
