import { NextResponse } from "next/server";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // ganti domain kalau production
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function corsPreflight() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export function withCors(
  body: any,
  status = 200
) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders,
  });
}
