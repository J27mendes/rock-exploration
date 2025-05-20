import { RefreshTokenController } from "@/controller"

const controller = new RefreshTokenController()

export const POST = controller.handle.bind(controller)
