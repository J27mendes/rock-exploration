import { PostUserUseCase } from "@/useCases/user/userUseCases"
export class PostUserController {
  private useCase: PostUserUseCase

  constructor() {
    this.useCase = new PostUserUseCase()
  }

  async execute(body: any) {
    const { banda, email, senha } = body

    if (!banda || !email || !senha) {
      throw new Error("Dados obrigatórios faltando")
    }

    const user = await this.useCase.execute({ banda, email, senha })

    return user
  }
}
