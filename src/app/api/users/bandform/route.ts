import { NextRequest } from "next/server"
import { ZodError } from "zod"

import {
  CreateBandFormController,
  DeleteBandFormController,
  GetBandFormController,
  UpdateBandFormController,
} from "@/controller"
import { handleZodError, ok, serverError } from "@/helpers"
import { prisma } from "@/lib/prisma"
import { authorization } from "@/middleware"
import { createBandFormSchema, updateBandFormSchema } from "@/schemas"
import { parseBandFormRequest } from "@/utils"

export async function POST(req: NextRequest) {
  try {
    const tokenValidate = authorization(req)
    if (tokenValidate instanceof Response) {
      return tokenValidate
    }

    const idBandForm = tokenValidate

    const fullBbody = await parseBandFormRequest(req)

    const validatedBody = await createBandFormSchema.parseAsync(fullBbody)
    const controller = new CreateBandFormController()
    const response = await controller.execute(validatedBody, idBandForm)

    if (response instanceof Response) {
      return response
    }

    return ok(response)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }
    console.error("Erro:", error)
    return serverError(error)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userId = authorization(request)

    if (userId instanceof Response) {
      return userId
    }

    const bandForm = await prisma.bandForm.findUnique({
      where: { userId },
    })

    if (!bandForm) {
      return new Response(
        JSON.stringify({ message: "Formulário da banda não encontrado." }),
        { status: 404 },
      )
    }

    const fullBody = await parseBandFormRequest(request)
    const validatedBody = await updateBandFormSchema.parseAsync(fullBody)

    const controller = new UpdateBandFormController()
    const response = await controller.execute(validatedBody, bandForm.id)

    if (response instanceof Response) {
      return response
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }

    console.error("Erro:", error)
    return serverError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = authorization(req)
    if (userId instanceof Response) {
      return userId
    }

    const controller = new GetBandFormController()
    const response = await controller.execute(userId)

    if (response instanceof Response) {
      return response
    }

    return ok(response)
  } catch (error) {
    console.error("Erro:", error)
    return serverError(error)
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const tokenValidate = authorization(req)
    if (tokenValidate instanceof Response) {
      return tokenValidate
    }

    const idBandForm = tokenValidate
    const controller = new DeleteBandFormController()
    const response = await controller.execute(idBandForm)

    if (response instanceof Response) {
      return response
    }

    return ok(response)
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError(error)
    }
    console.error("Erro:", error)
    return serverError(error)
  }
}
