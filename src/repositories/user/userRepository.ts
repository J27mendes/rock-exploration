import { prisma } from "@/lib/prisma"
import { CreateBandParams } from "@/types/user"
export class PostgresCreateUserRepository {
  async execute({ id, banda, email, senha }: CreateBandParams) {
    const user = await prisma.user.create({
      data: {
        id,
        banda,
        email,
        senha,
      },
    })

    return user
  }
}
