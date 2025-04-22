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
      const validatedData = await createUserSchema.parseAsync(body)
      const { banda, email, senha } = validatedData
      const user = await this.useCase.execute({ banda, email, senha })
      return user
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(
          error.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join("; ")
        )
      }

      throw new Error("Erro ao processar requisição")
    }
  }
}
