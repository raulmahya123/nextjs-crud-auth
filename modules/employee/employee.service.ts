import { EmployeeRepository } from "./employee.repository";
import { ServiceResponse } from "@/types/service-response";

export interface CreateEmployeeDTO {
  name: string;
  email: string;
  position: string;
  photoUrl?: string;
}

export interface UpdateEmployeeDTO {
  name?: string;
  email?: string;
  position?: string;
  photoUrl?: string;
}

export class EmployeeService {
  static async create(
    data: CreateEmployeeDTO
  ): Promise<ServiceResponse<any>> {
    const { name, email, position } = data;

    if (!name || !email || !position) {
      return {
        success: false,
        status: 400,
        message: "Name, email, and position are required",
      };
    }

    const exists = await EmployeeRepository.findByEmail(email);
    if (exists) {
      return {
        success: false,
        status: 409,
        message: "Employee with this email already exists",
      };
    }

    const employee = await EmployeeRepository.create(data);

    return {
      success: true,
      status: 201,
      data: employee,
    };
  }

  static async getAll(): Promise<ServiceResponse<any>> {
    return {
      success: true,
      status: 200,
      data: await EmployeeRepository.findAll(),
    };
  }

  static async getById(id: string): Promise<ServiceResponse<any>> {
    if (!id) {
      return {
        success: false,
        status: 400,
        message: "Employee id is required",
      };
    }

    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      return {
        success: false,
        status: 404,
        message: "Employee not found",
      };
    }

    return {
      success: true,
      status: 200,
      data: employee,
    };
  }

  static async update(
    id: string,
    data: UpdateEmployeeDTO
  ): Promise<ServiceResponse<any>> {
    if (!id) {
      return {
        success: false,
        status: 400,
        message: "Employee id is required",
      };
    }

    if (Object.keys(data).length === 0) {
      return {
        success: false,
        status: 400,
        message: "No data provided to update",
      };
    }

    return {
      success: true,
      status: 200,
      data: await EmployeeRepository.update(id, data),
    };
  }

static async delete(id: string): Promise<ServiceResponse<any>> {
  if (!id) {
    return {
      success: false,
      status: 400,
      message: "Employee id is required",
    };
  }

  // ✅ CEK DULU ADA ATAU TIDAK
  const exists = await EmployeeRepository.findById(id);
  if (!exists) {
    return {
      success: false,
      status: 404,
      message: "Employee not found",
    };
  }

  await EmployeeRepository.delete(id);

  return {
    success: true,
    status: 200,
    data: { message: "Employee deleted successfully" },
  };
}
static async bulkCreate(
  rows: Array<{
    name?: string;
    email?: string;
    position?: string;
  }>
): Promise<ServiceResponse<any>> {
  let successCount = 0;
  let failedCount = 0;
  const errors: any[] = [];

  for (const [index, row] of rows.entries()) {
    const { name, email, position } = row;

    if (!name || !email || !position) {
      failedCount++;
      errors.push({
        row: index + 2,
        message: "Missing required fields",
      });
      continue;
    }

    const exists = await EmployeeRepository.findByEmail(email);
    if (exists) {
      failedCount++;
      errors.push({
        row: index + 2,
        message: "Email already exists",
      });
      continue;
    }

    await EmployeeRepository.create({
      name,
      email,
      position,
    });

    successCount++;
  }

  return {
    success: true,
    status: 201,
    data: {
      total: rows.length,
      success: successCount,
      failed: failedCount,
      errors,
    },
  };
}

}
