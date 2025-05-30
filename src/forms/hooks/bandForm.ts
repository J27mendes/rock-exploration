import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createBandFormSchemaFrontend } from "@/schemas/bandForm/formBandFrontend"
import { CreateBandFormInputFrontend } from "@/types"

export const useBandForm = () => {
  const bandForm = useForm<CreateBandFormInputFrontend>({
    resolver: zodResolver(createBandFormSchemaFrontend),
    mode: "onSubmit",
    defaultValues: {
      banda: "",
      quantidadeIntegrantes: 1,
      integrantes: [{ nome: "", instrumento: "" }],
      estilo: "",
      release: "",
      imagem: {
        urlImagemBanda: new File([], ""),
        urlImagemLogo: new File([], ""),
        urlMapaPalco: new File([], ""),
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
