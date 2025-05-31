"use client"

import { useFormContext } from "react-hook-form"

import { useContatoFields } from "@/forms/hooks/contato"
import { CreateBandFormInputFrontend } from "@/types"

import { MaskedInput } from "./MaskedInput"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const ContatoInput = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()
  const {
    email,
    nomePrimeiroNumero,
    primeiroNumero,
    nomeSegundoNumero,
    segundoNumero,
  } = useContatoFields(control)

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-cyan-400">Contatos</div>
      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.email"
        render={() => (
          <FormItem>
            <FormLabel className="font-bold text-amber-300">
              Email para contato
            </FormLabel>
            <FormControl>
              <Input
                {...email.field}
                placeholder="exemplo@banda.com"
                className="bg-transparent text-xl text-white placeholder:text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.nomePrimeiroNumero"
        render={() => (
          <FormItem>
            <FormLabel className="font-bold text-amber-300">
              Contato primeiro número
            </FormLabel>
            <FormControl>
              <Input
                {...nomePrimeiroNumero.field}
                placeholder="Ex: João"
                className="bg-transparent text-xl text-white placeholder:text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.primeiroNumero"
        render={() => (
          <FormItem>
            <FormLabel className="font-bold text-amber-300">
              Primeiro número
            </FormLabel>
            <FormControl>
              <MaskedInput
                {...primeiroNumero.field}
                placeholder="(81) 91234-5678"
                mask="(99) 99999-9999"
                className="bg-transparent text-xl text-white placeholder:text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.nomeSegundoNumero"
        render={() => (
          <FormItem>
            <FormLabel className="font-bold text-amber-300">
              Contato segundo número
            </FormLabel>
            <FormControl>
              <Input
                {...nomeSegundoNumero.field}
                placeholder="Ex: Maria"
                className="bg-transparent text-xl text-white placeholder:text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.segundoNumero"
        render={() => (
          <FormItem>
            <FormLabel className="font-bold text-amber-300">
              Segundo número
            </FormLabel>
            <FormControl>
              <MaskedInput
                {...segundoNumero.field}
                placeholder="(81) 99876-5432"
                mask="(99) 99999-9999"
                className="bg-transparent text-xl text-white placeholder:text-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ContatoInput
