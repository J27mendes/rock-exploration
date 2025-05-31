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

const QuantidadeMusicasInput = () => {
  const { control } = useFormContext()

  return (
    <FormField
      name="quantidadeMusicas"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor="quantidadeMusicas"
            className="text-lg font-semibold text-cyan-400"
          >
            Quantidade de Músicas
          </FormLabel>
          <FormControl>
            <Input
              id="quantidadeMusicas"
              min={1}
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

export default QuantidadeMusicasInput
