export class UnauthorizedError extends Error {
  constructor(message: string = "UnauthorizedError") {
    super(message)
    this.name = "Usuário não autorizado"
  }
}
