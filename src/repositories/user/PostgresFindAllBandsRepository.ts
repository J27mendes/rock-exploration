import { prisma } from "@/lib/prisma"

export class PostgresFindAllBandsRepository {
  async execute() {
    const bands = await prisma.bandForm.findMany()
    return bands
  }
}
