import { Employee } from "@prisma/client"
import { EmployeeRepository } from "./employee.repository"
import { ServiceResponse } from "@/types/service-response"
import {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
} from "@/types/employee.dto"

export class EmployeeService {
  static async create(
    data: CreateEmployeeDTO
  ): Promise<ServiceResponse<Employee>> {
    const { name, email, position } = data

    if (!name || !email || !position) {
      return { ok: false, error: "INVALID_INPUT" }
    }

    const exists = await EmployeeRepository.findByEmail(email)
    if (exists) {
      return { ok: false, error: "EMPLOYEE_ALREADY_EXISTS" }
    }

    const employee = await EmployeeRepository.create(data)
    return { ok: true, data: employee }
  }

  static async getAll(): Promise<ServiceResponse<Employee[]>> {
    const employees = await EmployeeRepository.findAll()
    return { ok: true, data: employees }
  }

  static async getById(
    id: string
  ): Promise<ServiceResponse<Employee>> {
    if (!id) {
      return { ok: false, error: "INVALID_ID" }
    }

    const employee = await EmployeeRepository.findById(id)
    if (!employee) {
      return { ok: false, error: "EMPLOYEE_NOT_FOUND" }
    }

    return { ok: true, data: employee }
  }

  static async update(
    id: string,
    data: UpdateEmployeeDTO
  ): Promise<ServiceResponse<Employee>> {
    if (!id) {
      return { ok: false, error: "INVALID_ID" }
    }

    if (Object.keys(data).length === 0) {
      return { ok: false, error: "NO_UPDATE_DATA" }
    }

    const employee = await EmployeeRepository.update(id, data)
    return { ok: true, data: employee }
  }

  static async delete(
    id: string
  ): Promise<ServiceResponse<{ message: string }>> {
    if (!id) {
      return { ok: false, error: "INVALID_ID" }
    }

    const exists = await EmployeeRepository.findById(id)
    if (!exists) {
      return { ok: false, error: "EMPLOYEE_NOT_FOUND" }
    }

    await EmployeeRepository.delete(id)

    return {
      ok: true,
      data: { message: "Employee deleted successfully" },
    }
  }

  static async bulkCreate(
    rows: Array<{
      name?: string
      email?: string
      position?: string
    }>
  ): Promise<
    ServiceResponse<{
      total: number
      success: number
      failed: number
      errors: Array<{ row: number; error: string }>
    }>
  > {
    let successCount = 0
    let failedCount = 0
    const errors: Array<{ row: number; error: string }> = []

    for (const [index, row] of rows.entries()) {
      const { name, email, position } = row

      if (!name || !email || !position) {
        failedCount++
        errors.push({
          row: index + 2,
          error: "INVALID_ROW_DATA",
        })
        continue
      }

      const exists = await EmployeeRepository.findByEmail(email)
      if (exists) {
        failedCount++
        errors.push({
          row: index + 2,
          error: "EMAIL_ALREADY_EXISTS",
        })
        continue
      }

      await EmployeeRepository.create({ name, email, position })
      successCount++
    }

    return {
      ok: true,
      data: {
        total: rows.length,
        success: successCount,
        failed: failedCount,
        errors,
      },
    }
  }
}
