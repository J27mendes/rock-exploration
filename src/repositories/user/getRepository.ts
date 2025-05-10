import { prisma } from "@/lib/prisma"

export class PostgresFindUserByIdRepository {
  async execute(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }
}
