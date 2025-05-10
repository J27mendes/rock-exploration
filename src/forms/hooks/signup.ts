import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createUserSchema } from "@/schemas"
import { CreateUserInput } from "@/types"

export const useSignupForm = () => {
  const signupMethods = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      banda: "",
      email: "",
      senha: "",
      confirmeSenha: "",
    },
  })
  return { signupMethods }
}
