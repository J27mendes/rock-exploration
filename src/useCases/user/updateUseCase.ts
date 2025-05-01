import { PasswordHasherAdapter } from "@/adapters"
import { conflict, notFound } from "@/helpers"
import { UpdateUserInput } from "@/interfaces"
import { prisma } from "@/lib/prisma"
export class UpdateUserUseCase {
  async execute({ userId, data }: UpdateUserInput) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, senha: true },
    })

    if (!user) {
      return notFound("Usuário não encontrado.")
    }

    const hasher = new PasswordHasherAdapter()
    const emailIgual = data.email ? data.email === user.email : true
    const senhaIgual = data.senha
      ? await hasher.compare(data.senha, user.senha)
      : true

    if (emailIgual && senhaIgual) {
      return conflict(
        "Você precisa alterar ao menos um dos campos para atualizar."
      )
    }

    if (data.email && !emailIgual) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: { id: userId },
        },
      })

      if (emailExists) {
        return conflict("E-mail já está em uso por outro usuário.")
      }
    }

    if (data.senha && !senhaIgual) {
      data.senha = await hasher.hash(data.senha)
    } else {
      delete data.senha
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        banda: true,
      },
    })

    return updated
  }
}
