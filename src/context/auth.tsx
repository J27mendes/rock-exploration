"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

import { useLogin, useSignup } from "@/app/api/hooks/user"
import { UserService } from "@/app/api/services/user"
import {
  STORAGE_TOKEN_ACCESS,
  STORAGE_TOKEN_REFRESH,
} from "@/constants/localStorage"
import { CreateUserInput, LoginUserDTO, UserWithTokens } from "@/types"

type AuthContextType = {
  user: UserWithTokens | null
  initializing: boolean
  signup: (data: CreateUserInput) => Promise<void>
  login: (data: LoginUserDTO) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  initializing: true,
  signup: async () => {},
  login: async () => {},
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
  const router = useRouter()

  const signupMutation = useSignup((createdUser) => {
    setTokens(createdUser.tokens)
    setUser(createdUser)
  })

  const loginMutation = useLogin((loginUser) => {
    setTokens(loginUser.tokens)
    setUser(loginUser)
  })
  useEffect(() => {
    const init = async () => {
      setInitializing(true)

      const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
      const refreshToken = localStorage.getItem(STORAGE_TOKEN_REFRESH)

      if (!accessToken && !refreshToken) {
        setInitializing(false)
        return
      }

      try {
        const user = await UserService.me()
        setUser(user)
        if (window.location.pathname !== "/band") {
          router.push("/band")
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        setUser(null)
        removeTokens()
      } finally {
        setInitializing(false)
      }
    }

    init()
  }, [])

  const signup = async (data: CreateUserInput) => {
    await signupMutation.mutateAsync(data)
  }

  const login = async (data: LoginUserDTO) => {
    await loginMutation.mutateAsync(data)
  }

  const signOut = () => {
    removeTokens()
    setUser(null)
    toast.success("Sessão encerrada.")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{ user, initializing, signup, login, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
