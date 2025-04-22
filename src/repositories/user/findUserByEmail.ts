import { prisma } from "@/lib/prisma"

export class FindUserByEmailRepository {
  async execute(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  }
}
