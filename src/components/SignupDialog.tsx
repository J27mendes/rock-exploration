"use client"

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
                <Input
                  id="senha"
                  type="password"
                  placeholder="********"
                  {...field}
                  autoComplete="senha"
                  className="bg-transparent text-xl text-white placeholder:text-white"
                />
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
                <Input
                  id="confirmeSenha"
                  type="password"
                  placeholder="********"
                  {...field}
                  autoComplete="confirme a senha"
                  className="bg-transparent text-xl text-white placeholder:text-white"
                />
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
