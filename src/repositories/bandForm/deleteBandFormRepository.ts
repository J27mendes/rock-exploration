import { prisma } from "@/lib/prisma"
import { UserNotFoundError } from "@/errors"
import { Prisma } from "@prisma/client"

export class DeleteBandFormRepository {
  async execute(userId: string) {
    try {
      const bandForm = await prisma.bandForm.findFirst({
        where: {
          userId,
        },
      })

      if (!bandForm) {
        throw new UserNotFoundError(
          "Formulário da banda não encontrado ou já deletado"
        )
      }

      const deletedForm = await prisma.bandForm.delete({
        where: {
          id: bandForm.id,
        },
      })

      return deletedForm
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new UserNotFoundError(
          "Formulário da banda não encontrado ou já deletado"
        )
      }
      throw error
    }
  }
}
