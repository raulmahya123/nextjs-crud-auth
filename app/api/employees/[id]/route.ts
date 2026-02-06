import { EmployeeService } from "@/modules/employee/employee.service";
import { success, error } from "@/app/lib/response";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const employee = await EmployeeService.getById(id);
    if (!employee) {
      return error("Employee not found", 404);
    }

    return success(employee, 200);
  } catch (e: any) {
    return error(e.message ?? "Failed to fetch employee", 400);
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const employee = await EmployeeService.update(id, body);
    return success(employee, 200);
  } catch (e: any) {
    return error(e.message ?? "Failed to update employee", 400);
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const result = await EmployeeService.delete(id);

    if (!result.success) {
      return error(result.message!, result.status);
    }

    return success(result.data, result.status);
  } catch (e: any) {
    return error(e.message ?? "Failed to delete employee", 400);
  }
}