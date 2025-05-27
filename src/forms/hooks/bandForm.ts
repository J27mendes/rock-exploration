import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createBandFormSchema } from "@/schemas/bandForm/createBandFormSchema"
import { CreateBandFormInput } from "@/types"

export const useBandForm = () => {
  const bandForm = useForm<CreateBandFormInput>({
    resolver: zodResolver(createBandFormSchema),
    defaultValues: {
      banda: "",
      quantidadeIntegrantes: 1,
      integrantes: [{ nome: "", instrumento: "" }],
      estilo: "",
      release: "",
      imagem: {
        urlImagemBanda: "",
        urlImagemLogo: "",
        urlMapaPalco: "",
      },
      quantidadeMusicas: 1,
      setList: [{ nomeMusica: "", tempoMusica: 1, letraMusica: "" }],
      contato: {
        email: "",
        nomePrimeiroNumero: "",
        primeiroNumero: "",
        nomeSegundoNumero: "",
        segundoNumero: "",
      },
    },
  })
  return { bandForm }
}
