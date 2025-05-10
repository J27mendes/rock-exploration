"use client"

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

  return (
    <Form {...signupMethods}>
      <form
        onSubmit={signupMethods.handleSubmit((data) => console.log(data))}
        className="space-y-4"
      >
        <FormField<CreateUserInput>
          control={signupMethods.control}
          name="banda"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Banda</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Rock & Exploration" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seuemail@exemplo.com"
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*************" {...field} />
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
              <FormLabel>Confirme a Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="*************" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" bg-color="#1695c0">
          Criar conta
        </Button>
      </form>
    </Form>
  )
}

export default CreateSignup
