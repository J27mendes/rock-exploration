"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { Form } from "@/components/ui/form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthContext } from "@/context/auth"
import { useLoginForm } from "@/forms/hooks/login"
import { LoginUserDTO } from "@/types"

import FormButton from "./Button"

const UserLogin = ({ onClose }: { onClose: () => void }) => {
  const { loginMethods } = useLoginForm()
  const { login } = useAuthContext()
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (data: LoginUserDTO) => {
    setIsPending(true)
    try {
      await login(data)
      onClose()
    } catch (error) {
      console.error("Erro no login:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...loginMethods}>
      <form
        onSubmit={loginMethods.handleSubmit((data) => {
          handleSubmit(data)
        })}
        className="space-y-4"
      >
        <FormField<LoginUserDTO>
          control={loginMethods.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email" className="font-semibold text-white">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  {...field}
                  className="bg-transparent text-xl text-white placeholder:bg-transparent placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField<LoginUserDTO>
          control={loginMethods.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="senha"
                className="placeholder:bg-transparen font-semibold text-white placeholder:text-white"
              >
                Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    autoComplete="senha"
                    className="bg-transparent pr-10 text-xl text-white placeholder:bg-transparent placeholder:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2.5 border-none bg-transparent text-blue-200 shadow-none outline-none focus:outline-none"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton type="submit" disabled={isPending}>
          {isPending ? "Buscando..." : "Login"}
        </FormButton>
      </form>
    </Form>
  )
}

export default UserLogin
