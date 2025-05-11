"use client"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { UserService } from "@/app/api/services/user"
import Button from "@/components/Button"
import { Form } from "@/components/ui/form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSignupForm } from "@/forms/hooks/signup"
import { CreateUserInput } from "@/types"

const CreateSignup = () => {
  const { signupMethods } = useSignupForm()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (data: CreateUserInput) => {
    try {
      setLoading(true)
      const result = await UserService.signup(data)
      return result
    } catch (error) {
      console.error("Erro ao criar usuário:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...signupMethods}>
      <form
        onSubmit={signupMethods.handleSubmit((data) => {
          handleSubmit(data)
        })}
        className="space-y-4"
      >
        <FormField<CreateUserInput>
          control={signupMethods.control}
          name="banda"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="banda" className="font-semibold text-white">
                Nome da Banda
              </FormLabel>
              <FormControl>
                <Input
                  id="banda"
                  placeholder="Ex: Rock & Exploration"
                  {...field}
                  className="bg-transparent text-xl text-white placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField<CreateUserInput>
          control={signupMethods.control}
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
                  className="bg-transparent text-xl text-white placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField<CreateUserInput>
          control={signupMethods.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="senha" className="font-semibold text-white">
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
                    className="bg-transparent pr-10 text-xl text-white placeholder:text-white"
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
        <FormField<CreateUserInput>
          control={signupMethods.control}
          name="confirmeSenha"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor="confirmeSenha"
                className="font-semibold text-white"
              >
                Confirme a Senha
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmeSenha"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                    autoComplete="confirme a senha"
                    className="bg-transparent text-xl text-white placeholder:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-2.5 border-none bg-transparent text-blue-200 shadow-none outline-none focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" bgColor="#1695c0" disabled={loading}>
          {loading ? "Enviando..." : "Criar conta"}
        </Button>
      </form>
    </Form>
  )
}

export default CreateSignup
