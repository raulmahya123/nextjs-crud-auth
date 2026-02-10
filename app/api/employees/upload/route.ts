import { EmployeeService } from "@/modules/employee/employee.service";
import { corsPreflight, withCors } from "@/app/lib/cors";
import { writeFile } from "fs/promises";
import path from "path";

// =========================
// PRE-FLIGHT (WAJIB)
// =========================
export async function OPTIONS() {
  return corsPreflight();
}

// =========================
// UPLOAD PHOTO
// =========================
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const formData = await req.formData();
    const file = formData.get("photo") as File | null;

    if (!file) {
      return withCors(
        { message: "Photo is required" },
        400
      );
    }

    // ✅ VALIDASI FILE
    if (!file.type.startsWith("image/")) {
      return withCors(
        { message: "Only image files are allowed" },
        400
      );
    }

    // ✅ BUFFER FILE
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ NAMA FILE UNIK
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
      return withCors(
        { message: result.message },
        result.status
      );
    }

    return withCors(
      {
        message: "Photo uploaded successfully",
        photoUrl,
      },
      200
    );
  } catch (e: any) {
    return withCors(
      { message: e.message ?? "Failed to upload photo" },
      500
    );
  }
}
