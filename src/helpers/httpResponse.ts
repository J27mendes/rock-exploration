import { ErrorResponse, JsonResponse } from "@/types"
import { NextResponse } from "next/server"
import { ZodError, ZodIssue } from "zod"

export function ok<T>(data: T): Response {
  const body: JsonResponse<T> = { data }
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}

export function responses(result: unknown): Response {
  if (result instanceof Response) return result
  return ok(result)
}

export function created<T>(data: T): Response {
  const body: JsonResponse<T> = { data }
  return NextResponse.json(body, { status: 201 })
}

export function badRequest(message: string | object): Response {
  const responseMessage =
    typeof message === "string" ? message : "Algo está errado"
  const body: ErrorResponse = { error: responseMessage }
  return NextResponse.json(body, { status: 400 })
}

export function unauthorized(message: string = "Unauthorized"): Response {
  const responseMessage =
    typeof message === "string" ? message : "Não autorizado"
  const body: ErrorResponse = { error: responseMessage }
  return NextResponse.json(body, { status: 401 })
}

export function forbidden(message: string = "Forbidden"): Response {
  const responseMessage = typeof message === "string" ? message : "Proibido"
  const body: ErrorResponse = { error: responseMessage }
  return NextResponse.json(body, { status: 403 })
}

export function notFound(message: string = "Not Found"): Response {
  const body: ErrorResponse = { error: message }
  return new Response(JSON.stringify(body), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  })
}

export const conflict = (message: string | object = "conflict") => {
  const responseMessage = typeof message === "string" ? message : "Conflito"
  const body: ErrorResponse = { error: responseMessage }
  return NextResponse.json(body, { status: 409 })
}

export const serverError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : "Internal Server Error"
  const body: ErrorResponse = { error: message }
  return NextResponse.json(body, { status: 500 })
}

export function handleZodError(error: ZodError): Response {
  const unrecognized = error.errors.find(
    (e): e is ZodIssue & { keys: string[] } =>
      e.code === "unrecognized_keys" && "keys" in e
  )

  if (unrecognized) {
    const message = `Campos extras não permitidos: ${unrecognized.keys.join(", ")}`
    return badRequest(message)
  }

  const message = error.errors
    .map((e) => `${e.path.join(".") || "campo"}: ${e.message}`)
    .join("; ")

  return badRequest(message)
}
