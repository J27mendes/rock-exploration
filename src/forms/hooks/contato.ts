import { Control, useController } from "react-hook-form"

import { CreateBandFormInputFrontend } from "@/types"

export const useContatoFields = (
  control: Control<CreateBandFormInputFrontend>,
) => {
  const email = useController({
    name: "contato.email",
    control,
  })

  const nomePrimeiroNumero = useController({
    name: "contato.nomePrimeiroNumero",
    control,
  })

  const primeiroNumero = useController({
    name: "contato.primeiroNumero",
    control,
  })

  const nomeSegundoNumero = useController({
    name: "contato.nomeSegundoNumero",
    control,
  })

  const segundoNumero = useController({
    name: "contato.segundoNumero",
    control,
  })

  return {
    email,
    nomePrimeiroNumero,
    primeiroNumero,
    nomeSegundoNumero,
    segundoNumero,
  }
}
