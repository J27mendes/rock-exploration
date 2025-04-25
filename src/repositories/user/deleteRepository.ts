import { prisma } from "@/lib/prisma"

export class DeleteUserRepository {
  async delete(userId: string) {
    return await prisma.user.delete({
      where: { id: userId },
    })
  }
}
