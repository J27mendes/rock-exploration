import { prisma } from "@/lib/prisma"

type CreateBandParams = {
  id: string
  banda: string
  email: string
  senha: string
}

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
