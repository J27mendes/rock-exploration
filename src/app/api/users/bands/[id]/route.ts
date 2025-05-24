import { NextRequest } from "next/server"

import { GetBandByIdController } from "@/controller"
import { serverError } from "@/helpers"

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const controller = new GetBandByIdController()
    const response = await controller.execute(id)
    return response
  } catch (error) {
    return serverError(error)
  }
}
