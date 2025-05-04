import { NextResponse } from "next/server"

import swaggerDocument from "@/../public/swagger.json"

export function GET() {
  return NextResponse.json(swaggerDocument)
}
