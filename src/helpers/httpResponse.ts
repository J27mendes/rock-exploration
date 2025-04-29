import { NextResponse } from "next/server"
import { ZodError } from "zod"

export function ok(data: any) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export function responses(result: unknown): Response {
  if (result instanceof Response) return result
  return ok(result)
}

export const created = (data: any) => {
  return NextResponse.json(data, { status: 201 })
}

export function badRequest(message: string | object) {
  const responseMessage =
    typeof message === "string" ? message : "Algo está errado"
  return NextResponse.json({ error: responseMessage }, { status: 400 })
}

export const unauthorized = (message: string = "Unauthorized") => {
  return NextResponse.json({ error: message }, { status: 401 })
}

export const forbidden = (message: string = "Forbidden") => {
  return NextResponse.json({ error: message }, { status: 403 })
}

export function notFound(message: string = "Not Found") {
  return new Response(JSON.stringify({ error: message }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  })
}

export const conflict = (message: string | object = "conflict") => {
  return NextResponse.json({ error: message }, { status: 409 })
}

export const serverError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Internal Server Error"
  return NextResponse.json({ error: message }, { status: 500 })
}

export function handleZodError(error: ZodError) {
  const unrecognized = error.errors.find((e) => e.code === "unrecognized_keys")

  if (unrecognized && "keys" in unrecognized) {
    const keys = (unrecognized as any).keys as string[]
    const message = `Campos extras não permitidos: ${keys.join(", ")}`
    return badRequest(message)
  }

  const message = error.errors
    .map((e) => `${e.path.join(".") || "campo"}: ${e.message}`)
    .join("; ")

  return badRequest(message)
}
