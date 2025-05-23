import { prisma } from "@/lib/prisma"

export class FindUserByEmailRepository {
  async execute(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    })
  }
}
