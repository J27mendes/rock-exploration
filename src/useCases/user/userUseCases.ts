import { PostgresCreateUserRepository } from "@/repositories/user/userRepository"
import { generateId } from "@/utils/generateId"
import { PasswordHasherAdapter } from "@/adapters/passwordHasherAdapter"
import { FindUserByEmailRepository } from "@/repositories/user/findUserByEmail"
import { TokensGenerator } from "@/adapters/tokensGeneratorAdapter"

type BandRequest = {
  banda: string
  email: string
  senha: string
}

export class PostUserUseCase {
  private createUserRepository: PostgresCreateUserRepository
  private tokensGenerator: TokensGenerator

  constructor() {
    this.createUserRepository = new PostgresCreateUserRepository()
    this.tokensGenerator = new TokensGenerator()
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

    const { accessToken, refreshToken } = this.tokensGenerator.execute(user.id)

    return { user, accessToken, refreshToken }
  }
}
