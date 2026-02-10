import { EmployeeService } from "@/modules/employee/employee.service"
import { success, failure } from "@/app/lib/response"
import { handleCorsPreflight } from "@/app/lib/cors"
import { CreateEmployeeDTO } from "@/types/employee.dto"

/**
 * PRE-FLIGHT
 */
export async function OPTIONS() {
  return handleCorsPreflight()
}

/**
 * GET ALL EMPLOYEES
 */
export async function GET() {
  const result = await EmployeeService.getAll()

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(result.data)
}

/**
 * CREATE EMPLOYEE
 */
export async function POST(req: Request) {
  const body: CreateEmployeeDTO = await req.json()

  const result = await EmployeeService.create(body)

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(result.data, 201)
}
