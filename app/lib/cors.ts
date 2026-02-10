// lib/cors.ts
import { NextResponse } from "next/server"

const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS ?? ""
)
  .split(",")
  .map(o => o.trim())
  .filter(Boolean)

export const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGINS.length
    ? ALLOWED_ORIGINS.join(",")
    : "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
}

export function handleCorsPreflight() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}
