import { prisma } from "@/lib/prisma"
import { BandForm } from "@prisma/client"
import { CreateBandFormDTO } from "@/useCases"
import { generateId } from "@/utils"

export interface CreateBandFormWithPresentationTimeDTO
  extends CreateBandFormDTO {
  tempoApresentacao: number
}
export class CreateBandFormRepository {
  async findByUserId(userId: string): Promise<BandForm | null> {
    try {
      const bandForm = await prisma.bandForm.findUnique({
        where: { userId },
      })
      return bandForm
    } catch (error) {
      console.error(`Erro no banco de dados ao buscar formulário! ${error}`)
      throw new Error("Erro no banco de dados ao buscar formulário!.")
    }
  }

  async findByBandName(banda: string) {
    return prisma.bandForm.findFirst({
      where: {
        banda,
      },
    })
  }

  async create(
    data: CreateBandFormWithPresentationTimeDTO,
    userId: string
  ): Promise<BandForm> {
    try {
      const newBandForm = await prisma.bandForm.create({
        data: {
          id: generateId(),
          idBanda: userId,
          banda: data.banda,
          quantidadeIntegrantes: data.quantidadeIntegrantes,
          integrantes: data.integrantes,
          estilo: data.estilo,
          release: data.release,
          imagem: data.imagem,
          quantidadeMusicas: data.quantidadeMusicas,
          setList: data.setList,
          contato: data.contato,
          tempoApresentacao: data.tempoApresentacao,
          user: {
            connect: { id: userId },
          },
        },
      })
      return newBandForm
    } catch (error) {
      console.error("Erro ao criar formulário no banco:", error)
      throw new Error("Erro ao criar formulário")
    }
  }
}
