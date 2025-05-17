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
