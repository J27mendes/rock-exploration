import { PostUserUseCase } from "@/useCases/user/userUseCases"
import { createUserSchema } from "@/schemas/user/userSchema" // ajuste esse caminho se necessário
import { ZodError } from "zod"

export class PostUserController {
  private useCase: PostUserUseCase

  constructor() {
    this.useCase = new PostUserUseCase()
  }

  async execute(body: any) {
    try {
      const validatedData = createUserSchema.parse(body)

      const user = await this.useCase.execute(validatedData)
      return user
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(error.errors.map((e) => e.message).join("; "))
      }

      throw new Error("Erro ao processar requisição")
    }
  }
}
