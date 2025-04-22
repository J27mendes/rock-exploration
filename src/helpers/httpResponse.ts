import { NextResponse } from "next/server"

export const ok = (data: any) => {
  return NextResponse.json(data, { status: 200 })
}

export const created = (data: any) => {
  return NextResponse.json(data, { status: 201 })
}

export const badRequest = (message: string | object = "Bad Request") => {
  return NextResponse.json({ error: message }, { status: 400 })
}

export const unauthorized = (message: string = "Unauthorized") => {
  return NextResponse.json({ error: message }, { status: 401 })
}

export const forbidden = (message: string = "Forbidden") => {
  return NextResponse.json({ error: message }, { status: 403 })
}

export const notFound = (message: string = "Not Found") => {
  return NextResponse.json({ error: message }, { status: 404 })
}

export const serverError = (error: unknown) => {
  console.error("Internal Server Error:", error)
  const message =
    error instanceof Error ? error.message : "Internal Server Error"
  return NextResponse.json({ error: message }, { status: 500 })
}
