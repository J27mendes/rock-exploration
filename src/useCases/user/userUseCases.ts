import bcrypt from "bcrypt"
import { PostgresCreateUserRepository } from "@/repositories/user/userRepository"
import { prisma } from "@/lib/prisma"

type BandRequest = {
  banda: string
  email: string
  senha: string
}

export class PostUserUseCase {
  private createUserRepository: PostgresCreateUserRepository

  constructor() {
    this.createUserRepository = new PostgresCreateUserRepository()
  }

  async execute({ banda, email, senha }: BandRequest) {
    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      throw new Error("E-mail já cadastrado")
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    const user = await this.createUserRepository.execute({
      banda,
      email,
      senha: hashedPassword,
    })

    return user
  }
}
