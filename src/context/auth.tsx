"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

import { useLogin, useMe, useSignup } from "@/app/api/hooks/user"
import {
  STORAGE_TOKEN_ACCESS,
  STORAGE_TOKEN_REFRESH,
} from "@/constants/localStorage"
import {
  AuthContextType,
  CreateUserInput,
  LoginUserDTO,
  UserWithTokens,
} from "@/types"

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

export const removeTokens = () => {
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
  const { data: me, isLoading, isError } = useMe()

  useEffect(() => {
    const accessToken = localStorage.getItem(STORAGE_TOKEN_ACCESS)
    const refreshToken = localStorage.getItem(STORAGE_TOKEN_REFRESH)

    if (!accessToken || !refreshToken || isError) {
      setInitializing(false)
      return
    }

    if (!isLoading) {
      if (me) {
        setUser({
          ...me,
          tokens: {
            accessToken,
            refreshToken,
          },
        })
        if (window.location.pathname !== "/band") {
          router.push("/band")
        }
      } else if (isError) {
        removeTokens()
        setUser(null)
      }
      setInitializing(false)
    }
  }, [me, isLoading, isError])

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
