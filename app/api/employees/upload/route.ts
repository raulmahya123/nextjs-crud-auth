import { writeFile } from "fs/promises";
import path from "path";
import { withAuth } from "@/app/lib/auth-middleware";
import { success, error } from "@/app/lib/response";

async function handlePOST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("photo") as File;

  if (!file) return error("No file uploaded", 400);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(filePath, buffer);

  return success({
    url: `/uploads/${fileName}`,
  });
}

export const POST = withAuth(handlePOST);
