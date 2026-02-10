import { EmployeeService } from "@/modules/employee/employee.service"
import { success, failure } from "@/app/lib/response"
import { handleCorsPreflight } from "@/app/lib/cors"
import { writeFile } from "fs/promises"
import path from "path"

// =========================
// PRE-FLIGHT
// =========================
export async function OPTIONS() {
  return handleCorsPreflight()
}

// =========================
// UPLOAD PHOTO
// =========================
export async function POST(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params

  // ambil form data
  const formData = await req.formData()
  const file = formData.get("photo") as File | null

  // validasi file ada
  if (!file) {
    return failure("Photo is required", 400)
  }

  // validasi tipe file
  if (!file.type.startsWith("image/")) {
    return failure("Only image files are allowed", 400)
  }

  // convert file ke buffer
  const buffer = Buffer.from(await file.arrayBuffer())

  // generate nama file unik
  const fileName = `${id}-${Date.now()}-${file.name}`
  const uploadDir = path.join(
    process.cwd(),
    "public/uploads/employees"
  )
  const filePath = path.join(uploadDir, fileName)

  // simpan file
  await writeFile(filePath, buffer)

  // simpan URL ke database
  const photoUrl = `/uploads/employees/${fileName}`
  const result = await EmployeeService.update(id, { photoUrl })

  if (!result.ok) {
    return failure(result.error, 400)
  }

  return success(
    {
      message: "Photo uploaded successfully",
      photoUrl,
    },
    200
  )
}
