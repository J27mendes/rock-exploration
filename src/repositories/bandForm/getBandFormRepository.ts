import { prisma } from "@/lib/prisma"
import { BandForm } from "@prisma/client"

export class GetBandFormRepository {
  async findByUserId(userId: string): Promise<BandForm | null> {
    try {
      const bandForm = await prisma.bandForm.findUnique({
        where: { userId },
      })
      return bandForm
    } catch (error) {
      console.error(`Erro no banco de dados ao buscar formulário! ${error}`)
      throw new Error("Erro no banco de dados ao buscar formulário!")
    }
  }
}
