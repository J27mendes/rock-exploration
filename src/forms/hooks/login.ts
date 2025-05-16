import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { loginUserSchema } from "@/schemas"
import { LoginUserDTO } from "@/types"

export const useLoginForm = () => {
  const loginMethods = useForm<LoginUserDTO>({
    resolver: zodResolver(loginUserSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      senha: "",
    },
  })
  return { loginMethods }
}
