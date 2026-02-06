import { EmployeeService } from "@/modules/employee/employee.service";
import { success, error } from "@/app/lib/response";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const formData = await req.formData();
    const file = formData.get("photo") as File | null;

    if (!file) {
      return error("Photo is required", 400);
    }

    // ✅ VALIDASI FILE
    if (!file.type.startsWith("image/")) {
      return error("Only image files are allowed", 400);
    }

    // ✅ NAMA FILE UNIK
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${id}-${Date.now()}-${file.name}`;
    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/employees"
    );
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    // ✅ SIMPAN URL KE DB
    const photoUrl = `/uploads/employees/${fileName}`;
    const result = await EmployeeService.update(id, { photoUrl });

    if (!result.success) {
      return error(result.message!, result.status);
    }

    return success(
      {
        message: "Photo uploaded successfully",
        photoUrl,
      },
      200
    );
  } catch (e: any) {
    return error(e.message ?? "Failed to upload photo", 500);
  }
}
