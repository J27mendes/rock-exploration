"use client"

import { useFormContext } from "react-hook-form"

import { useContatoFields } from "@/forms/hooks/contato"
import { CreateBandFormInputFrontend } from "@/types"

import { MaskInput } from "./MaskedInput"
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
  const { email, nomePrimeiroNumero, nomeSegundoNumero } =
    useContatoFields(control)

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-cyan-400">Contatos</div>
      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.email"
        render={() => (
          <FormItem>
            <FormLabel
              htmlFor="contato.email"
              className="font-bold text-amber-300"
            >
              Email para contato
            </FormLabel>
            <FormControl>
              <Input
                {...email.field}
                id="contato.email"
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
            <FormLabel
              htmlFor="contato.nomePrimeiroNumero"
              className="font-bold text-amber-300"
            >
              Contato primeiro número
            </FormLabel>
            <FormControl>
              <Input
                {...nomePrimeiroNumero.field}
                id="contato.nomePrimeiroNumero"
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
        render={({ field }) => {
          const id = "contato-primeiroNumero"
          return (
            <FormItem>
              <FormLabel htmlFor={id} className="font-bold text-amber-300">
                Primeiro número
              </FormLabel>
              <FormControl>
                <MaskInput
                  {...field}
                  id={id}
                  inputRef={field.ref}
                  placeholder="(81) 99999-9999"
                  mask="(99) 99999-9999"
                  value={String(field.value ?? "")}
                  className="bg-transparent text-xl text-white placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="contato.nomeSegundoNumero"
        render={() => (
          <FormItem>
            <FormLabel
              htmlFor="contato.nomeSegundoNumero"
              className="font-bold text-amber-300"
            >
              Contato segundo número
            </FormLabel>
            <FormControl>
              <Input
                {...nomeSegundoNumero.field}
                id="contato.nomeSegundoNumero"
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
        render={({ field }) => {
          const id = "contato.segundoNumero"
          return (
            <FormItem>
              <FormLabel htmlFor={id} className="font-bold text-amber-300">
                Segundo número
              </FormLabel>
              <FormControl>
                <MaskInput
                  {...field}
                  id={id}
                  placeholder="(99) 99999-9999"
                  mask="(99) 99999-9999"
                  value={String(field.value ?? "")}
                  className="bg-transparent text-xl text-white placeholder:text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )
        }}
      />
    </div>
  )
}

export default ContatoInput
