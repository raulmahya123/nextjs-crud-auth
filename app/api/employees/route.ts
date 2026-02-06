import { EmployeeService } from "@/modules/employee/employee.service";
import { success, error } from "@/app/lib/response";

/**
 * GET ALL EMPLOYEES
 */
export async function GET() {
  try {
    const result = await EmployeeService.getAll();

    if (!result.success) {
      return error(result.message!, result.status);
    }

    return success(result.data, result.status);
  } catch (e: any) {
    return error(e.message ?? "Failed to fetch employees", 400);
  }
}

/**
 * CREATE EMPLOYEE
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await EmployeeService.create(body);

    if (!result.success) {
      return error(result.message!, result.status);
    }

    return success(result.data, result.status);
  } catch (e: any) {
    return error(e.message ?? "Failed to create employee", 400);
  }
}
