import { EmployeeService } from "@/modules/employee/employee.service";
import { success, error } from "@/app/lib/response";
import * as XLSX from "xlsx";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return error("Excel file is required", 400);
    }

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls")
    ) {
      return error("Invalid file format. Use .xlsx or .xls", 400);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet);

    if (!rows.length) {
      return error("Excel file is empty", 400);
    }

    const result = await EmployeeService.bulkCreate(rows);

    if (!result.success) {
      return error(result.message!, result.status);
    }

    return success(result.data, 201);
  } catch (e: any) {
    return error(e.message ?? "Failed to upload excel", 500);
  }
}
