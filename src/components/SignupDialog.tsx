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
              <FormLabel htmlFor="banda">Nome da Banda</FormLabel>
              <FormControl>
                <Input
                  id="banda"
                  placeholder="Ex: Rock & Exploration"
                  {...field}
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  {...field}
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
              <FormLabel htmlFor="senha">Senha</FormLabel>
              <FormControl>
                <Input
                  id="senha"
                  type="password"
                  placeholder="*************"
                  {...field}
                  autoComplete="senha"
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
              <FormLabel htmlFor="confirmeSenha">Confirme a Senha</FormLabel>
              <FormControl>
                <Input
                  id="confirmeSenha"
                  type="password"
                  placeholder="*************"
                  {...field}
                  autoComplete="confirme a senha"
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
