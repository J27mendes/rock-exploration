export class AppError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, 400)
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "UnauthorizedError") {
    super(message, 401)
  }
}

export class UserNotFoundError extends AppError {
  constructor(message: string = "UserNotFoundError") {
    super(message, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(message, 409)
  }
}
