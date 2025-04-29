export interface UpdateUserInput {
  userId: string
  data: {
    email?: string
    senha?: string
  }
}
