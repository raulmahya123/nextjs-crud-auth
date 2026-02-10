import { EmployeeService } from "@/modules/employee/employee.service"
import { success, failure } from "@/app/lib/response"
import { handleCorsPreflight } from "@/app/lib/cors"

// =========================
// PRE-FLIGHT
// =========================
export async function OPTIONS() {
  return handleCorsPreflight()
}

// =========================
// GET BY ID
// =========================
export async function GET(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params

  const result = await EmployeeService.getById(id)

  if (!result.ok) {
    return failure(result.error, 404)
  }

  return success(result.data)
}

// =========================
// UPDATE
// =========================
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params
  const body = await req.json()

  const result = await EmployeeService.update(id, body)

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(result.data)
}

// =========================
// DELETE
// =========================
export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params

  const result = await EmployeeService.delete(id)

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(result.data)
}
