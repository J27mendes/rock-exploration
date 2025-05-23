import { PasswordHasherAdapter } from "@/adapters"
import { ConflictError } from "@/errors"
import {
  FindUserByBandRepository,
  FindUserByEmailRepository,
  PostgresCreateUserRepository,
} from "@/repositories"
import { BandRequest } from "@/types"
import { formatStyle, generateId } from "@/utils"
export class PostUserUseCase {
  private createUserRepository: PostgresCreateUserRepository

  constructor() {
    this.createUserRepository = new PostgresCreateUserRepository()
  }

  async execute({ banda, email, senha }: BandRequest) {
    const bandNameFormated = formatStyle(banda)
    const emailRepository = new FindUserByEmailRepository()
    const userExists = await emailRepository.execute(email)

    if (userExists) {
      throw new ConflictError("Este email já foi cadastrado")
    }

    const bandRepository = new FindUserByBandRepository()

    const bandExists = await bandRepository.execute(bandNameFormated)

    if (bandExists) {
      throw new ConflictError("Esta banda já foi cadastrada")
    }

    const hasher = new PasswordHasherAdapter()
    const hashedPassword = await hasher.hash(senha)

    const id = generateId()

    const user = await this.createUserRepository.execute({
      id,
      banda: bandNameFormated,
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
