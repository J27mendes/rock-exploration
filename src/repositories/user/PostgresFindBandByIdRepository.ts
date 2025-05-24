import { prisma } from "@/lib/prisma"

export class PostgresFindBandByIdRepository {
  async execute(id: string) {
    const band = await prisma.bandForm.findUnique({
      where: { id },
    })
    return band
  }
}
