import { PasswordComparatorAdapter } from "@/adapters"
import { UnauthorizedError, UserNotFoundError } from "@/errors"
import { FindUserByEmailRepository } from "@/repositories"
import { LoginRequest } from "@/types/user"
export class LoginUserUseCase {
  private findUserByEmail = new FindUserByEmailRepository()
  private comparator = new PasswordComparatorAdapter()

  async execute({ email, senha }: LoginRequest) {
    const user = await this.findUserByEmail.execute(email)

    if (!user) {
      throw new UserNotFoundError("Usuário não encontrado")
    }

    const isPasswordCorrect = await this.comparator.execute(senha, user.senha)

    if (!isPasswordCorrect) {
      throw new UnauthorizedError(
        "E-mail ou senha estão incorretos, verifique os dados e tente novamente."
      )
    }

    return {
      id: user.id,
      banda: user.banda,
      email: user.email,
    }
  }
}
