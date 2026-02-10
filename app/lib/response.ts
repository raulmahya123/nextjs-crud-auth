// lib/response.ts
import { NextResponse } from "next/server"
import { corsHeaders } from "./cors"

export type ApiSuccess<T> = {
  success: true
  data: T
}

export type ApiError = {
  success: false
  message: string
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

export function success<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>(
    { success: true, data },
    { status, headers: corsHeaders }
  )
}

export function failure(message: string, status = 400) {
  return NextResponse.json<ApiError>(
    { success: false, message },
    { status, headers: corsHeaders }
  )
}
