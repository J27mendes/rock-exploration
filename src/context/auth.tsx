import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

import { useSignup } from "@/app/api/hooks/user"
import { UserService } from "@/app/api/services/user"
import {
  STORAGE_TOKEN_ACCESS,
  STORAGE_TOKEN_REFRESH,
} from "@/constants/localStorage"
import { CreateUserInput, UserWithTokens } from "@/types"

type AuthContextType = {
  user: UserWithTokens | null
  initializing: boolean
  signup: (data: CreateUserInput) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  signup: async () => {},
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
  localStorage.setItem(STORAGE_TOKEN_ACCESS, tokens.accessToken)
  localStorage.setItem(STORAGE_TOKEN_REFRESH, tokens.refreshToken)
}

const removeTokens = () => {
  localStorage.removeItem(STORAGE_TOKEN_ACCESS)
  localStorage.removeItem(STORAGE_TOKEN_REFRESH)
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [user, setUser] = useState<UserWithTokens | null>(null)
  const [initializing, setInitializing] = useState(true)
  const signupMutation = useSignup((createdUser) => {
    setUser(createdUser)
    setTokens(createdUser.tokens)
    toast.success("Conta criada com sucesso!")
  })

  useEffect(() => {
    const init = async () => {
      try {
        setInitializing(true)
        const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
        const refreshToken = localStorage.getItem(STORAGE_TOKEN_REFRESH)

        if (!accessToken && !refreshToken) return
        const response = await UserService.me()
        setUser(response)
      } catch (error) {
        setUser(null)
        console.error(error)
      } finally {
        setInitializing(false)
      }
    }
    init()
  }, [])

  const signup = async (data: CreateUserInput) => {
    signupMutation.mutate(data)
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }
  return (
    <AuthContext.Provider value={{ user, initializing, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
