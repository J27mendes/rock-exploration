import { PasswordHasherAdapter } from "@/adapters"
import { conflict } from "@/helpers"
import {
  FindUserByEmailRepository,
  PostgresCreateUserRepository,
} from "@/repositories"
import { BandRequest } from "@/types"
import { generateId } from "@/utils"
export class PostUserUseCase {
  private createUserRepository: PostgresCreateUserRepository

  constructor() {
    this.createUserRepository = new PostgresCreateUserRepository()
  }

  async execute({ banda, email, senha }: BandRequest) {
    const emailRepository = new FindUserByEmailRepository()
    const userExists = await emailRepository.execute(email)

    if (userExists) {
      return conflict("E-mail já cadastrado")
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

    return {
      id: user.id,
      banda: user.banda,
      email: user.email,
    }
  }
}
