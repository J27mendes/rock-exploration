import { NextRequest, NextResponse } from "next/server"
import { LoginUserController } from "@/controller/user/loginUserController"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const controller = new LoginUserController()
    const result = await controller.execute(body)

    return NextResponse.json(result, { status: 200 })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Erro ao logar usuário" },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Erro desconhecido ao logar usuário" },
      { status: 500 }
    )
  }
}
