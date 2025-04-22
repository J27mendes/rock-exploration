import { PostgresCreateUserRepository } from "@/repositories/user/userRepository"
import { generateId } from "@/utils/generateId"
import { PasswordHasherAdapter } from "@/adapters/passwordHasherAdapter"
import { FindUserByEmailRepository } from "@/repositories/user/findUserByEmail"

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
    const emailRepository = new FindUserByEmailRepository()
    const userExists = await emailRepository.execute(email)

    if (userExists) {
      throw new Error("E-mail já cadastrado")
    }

    const hasher = new PasswordHasherAdapter()
    const hashedPassword = await hasher.hash(senha)

    const id = generateId()

    const user = await this.createUserRepository.execute({
      id,
      banda,
      email,
      senha: hashedPassword,
    })

    return user
  }
}
