"use client"

import { useFormContext } from "react-hook-form"

import { useIntegrantesFieldArray } from "@/forms/hooks/useIntegrantesFieldArray"
import { CreateBandFormInput } from "@/types"

import { Button } from "./ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const IntegrantesFieldArray = () => {
  const { control } = useFormContext<CreateBandFormInput>()
  const { fields, append, remove } = useIntegrantesFieldArray(control)

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-cyan-400">Integrantes</div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2">
          <FormField<CreateBandFormInput>
            control={control}
            name={`integrantes.${index}.nome`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`integrantes.${index}.nome`}
                  className="font-bold text-amber-300"
                >
                  Integrante
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`integrantes.${index}.nome`}
                    value={field.value as string}
                    placeholder={"Nome do integrante"}
                    className="bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField<CreateBandFormInput>
            control={control}
            name={`integrantes.${index}.instrumento`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`integrantes.${index}.instrumento`}
                  className="font-bold text-amber-300"
                >
                  Instrumento
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`integrantes.${index}.instrumento`}
                    value={field.value as string}
                    placeholder={"Instrumento do integrante"}
                    className="bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            onClick={() => remove(index)}
            variant="destructive"
            className="w-fit"
          >
            Remover
          </Button>
        </div>
      ))}

      <Button
        type="button"
        onClick={() => append({ nome: "", instrumento: "" })}
        className="mt-2"
      >
        Adicionar Integrante
      </Button>
    </div>
  )
}

export default IntegrantesFieldArray
