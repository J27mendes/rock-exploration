import { readFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src", "swagger", "swagger.json")
    const fileContents = await readFile(filePath, "utf8")
    const swaggerDocument = JSON.parse(fileContents)
    return NextResponse.json(swaggerDocument)
  } catch (error) {
    console.error("Erro ao carregar swagger.json:", error)
    return NextResponse.json(
      { error: "Erro ao carregar swagger.json" },
      { status: 500 },
    )
  }
}
