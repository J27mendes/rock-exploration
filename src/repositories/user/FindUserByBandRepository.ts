import { prisma } from "@/lib/prisma"

export class FindUserByBandRepository {
  async execute(banda: string) {
    return await prisma.user.findUnique({ where: { banda } })
  }
}
