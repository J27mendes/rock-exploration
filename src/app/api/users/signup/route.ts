import { NextRequest, NextResponse } from "next/server"
import { PostUserController } from "@/controller/user/userController"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const controller = new PostUserController()
    const user = await controller.execute(body)

    return NextResponse.json(user, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Erro ao criar usuário" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Erro desconhecido ao criar usuário" },
      { status: 500 }
    )
  }
}
