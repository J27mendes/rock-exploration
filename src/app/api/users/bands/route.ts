import { GetAllBandsController } from "@/controller"
import { serverError } from "@/helpers"

export async function GET() {
  try {
    const controller = new GetAllBandsController()
    const response = await controller.execute()
    return response
  } catch (error) {
    return serverError(error)
  }
}
