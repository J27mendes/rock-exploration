import bcrypt from "bcrypt"

export class PasswordHasherAdapter {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
