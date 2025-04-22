import { PasswordComparatorAdapter } from "@/adapters/passwordComparatorAdapter"
import { TokensGenerator } from "@/adapters/tokensGeneratorAdapter"
import { FindUserByEmailRepository } from "@/repositories/user/findUserByEmail"

type LoginRequest = {
  email: string
  senha: string
}

export class LoginUserUseCase {
  private findUserByEmail = new FindUserByEmailRepository()
  private comparator = new PasswordComparatorAdapter()
  private tokensGenerator = new TokensGenerator()

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

    const { accessToken, refreshToken } = this.tokensGenerator.execute(user.id)

    return {
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        banda: user.banda,
        email: user.email,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    }
  }
}
