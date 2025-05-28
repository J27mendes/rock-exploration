"use client"

import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const QuantidadeIntegrantesInput = () => {
  const { control } = useFormContext()

  return (
    <FormField
      name="quantidadeIntegrantes"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor="quantidadeIntegrantes"
            className="font-semibold text-white"
          >
            Quantidade de Integrantes
          </FormLabel>
          <FormControl>
            <Input
              id="quantidadeIntegrantes"
              type="number"
              {...field}
              value={field.value ?? ""}
              onChange={(e) => {
                const val = e.target.value
                field.onChange(val === "" ? undefined : Number(val))
              }}
              className="bg-transparent text-xl text-white placeholder:text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default QuantidadeIntegrantesInput
