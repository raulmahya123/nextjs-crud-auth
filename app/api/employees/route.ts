import { EmployeeService } from "@/modules/employee/employee.service";
import { corsPreflight, withCors } from "@/app/lib/cors";

/**
 * PRE-FLIGHT (WAJIB)
 */
export async function OPTIONS() {
  return corsPreflight();
}

/**
 * GET ALL EMPLOYEES
 */
export async function GET() {
  try {
    const result = await EmployeeService.getAll();

    if (!result.success) {
      return withCors(
        { message: result.message },
        result.status
      );
    }

    return withCors(
      { success: true, data: result.data },
      result.status
    );
  } catch (e: any) {
    return withCors(
      { message: e.message ?? "Failed to fetch employees" },
      400
    );
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
      return withCors(
        { message: result.message },
        result.status
      );
    }

    return withCors(
      { success: true, data: result.data },
      result.status
    );
  } catch (e: any) {
    return withCors(
      { message: e.message ?? "Failed to create employee" },
      400
    );
  }
}
