import { EmployeeService } from "@/modules/employee/employee.service"
import { success, failure } from "@/app/lib/response"
import { handleCorsPreflight } from "@/app/lib/cors"
import * as XLSX from "xlsx"

// =========================
// PRE-FLIGHT
// =========================
export async function OPTIONS() {
  return handleCorsPreflight()
}

// =========================
// UPLOAD EXCEL
// =========================
export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return failure("Excel file is required", 400)
  }

  if (
    !file.name.endsWith(".xlsx") &&
    !file.name.endsWith(".xls")
  ) {
    return failure(
      "Invalid file format. Use .xlsx or .xls",
      400
    )
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const workbook = XLSX.read(buffer, { type: "buffer" })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json<{
    name?: string
    email?: string
    position?: string
  }>(sheet)

  if (!rows.length) {
    return failure("Excel file is empty", 400)
  }

  const result = await EmployeeService.bulkCreate(rows)

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(result.data, 201)
}
