import { PasswordComparatorAdapter } from "@/adapters/passwordComparatorAdapter"
import { FindUserByEmailRepository } from "@/repositories/user/findUserByEmail"

type LoginRequest = {
  email: string
  senha: string
}

export class LoginUserUseCase {
  private findUserByEmail = new FindUserByEmailRepository()
  private comparator = new PasswordComparatorAdapter()

  async execute({ email, senha }: LoginRequest) {
    const user = await this.findUserByEmail.execute(email)

    if (!user) {
      throw new Error(
        "E-mail ou senha estão incorretos, verifique os dados e tente novamente"
      )
    }

    const isPasswordCorrect = await this.comparator.execute(senha, user.senha)

    if (!isPasswordCorrect) {
      throw new Error(
        "E-mail ou senha estão incorretos, verifique os dados e tente novamente"
      )
    }

    return {
      id: user.id,
      banda: user.banda,
      email: user.email,
    }
  }
}
