import { BandForm } from "@prisma/client"

import { prisma } from "@/lib/prisma"
import { UpdateBandFormDTO } from "@/types"

export class UpdateBandFormRepository {
  async findById(id: string): Promise<BandForm | null> {
    if (!id) {
      console.error("ID inválido fornecido para buscar formulário.")
      throw new Error("ID inválido.")
    }
    try {
      return await prisma.bandForm.findUnique({
        where: { id },
      })
    } catch (error) {
      console.error(`Erro ao buscar formulário por ID: ${error}`)
      throw new Error("Erro ao buscar formulário por ID.")
    }
  }

  async findByBandName(banda: string): Promise<BandForm | null> {
    return prisma.bandForm.findFirst({
      where: { banda },
    })
  }

  async update(
    formId: string,
    data: Partial<UpdateBandFormDTO>,
  ): Promise<BandForm> {
    try {
      const updated = await prisma.bandForm.update({
        where: { id: formId },
        data,
      })
      return updated
    } catch (error) {
      console.error(`Erro ao atualizar formulário: ${error}`)
      throw new Error("Erro ao atualizar formulário.")
    }
  }
}
