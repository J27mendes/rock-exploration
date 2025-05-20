export interface RootLayoutProps {
  children: React.ReactNode
}
export interface UpdateUserInput {
  userId: string
  data: {
    email?: string
    senha?: string
  }
}
export interface RefreshTokenUseCaseRequest {
  refreshToken: string
}

export interface RefreshTokenUseCaseResponse {
  accessToken: string
  refreshToken: string
}
