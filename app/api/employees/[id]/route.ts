import { EmployeeService } from "@/modules/employee/employee.service";
import { corsPreflight, withCors } from "@/app/lib/cors";

// =========================
// PRE-FLIGHT (WAJIB)
// =========================
export async function OPTIONS() {
  return corsPreflight();
}

// =========================
// GET BY ID
// =========================
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const employee = await EmployeeService.getById(id);
    if (!employee) {
      return withCors(
        { message: "Employee not found" },
        404
      );
    }

    return withCors(
      { success: true, data: employee },
      200
    );
  } catch (e: any) {
    return withCors(
      { message: e.message ?? "Failed to fetch employee" },
      400
    );
  }
}

// =========================
// UPDATE
// =========================
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const employee = await EmployeeService.update(id, body);

    return withCors(
      { success: true, data: employee },
      200
    );
  } catch (e: any) {
    return withCors(
      { message: e.message ?? "Failed to update employee" },
      400
    );
  }
}

// =========================
// DELETE
// =========================
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const result = await EmployeeService.delete(id);

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
      { message: e.message ?? "Failed to delete employee" },
      400
    );
  }
}
