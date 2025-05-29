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

const EstiloInput = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="estilo"
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor="estilo"
            className="text-lg font-semibold text-cyan-400"
          >
            Estilo da Banda
          </FormLabel>
          <FormControl>
            <Input
              id="estilo"
              placeholder="Ex: Rock n' Roll"
              {...field}
              className="bg-transparent text-xl text-white placeholder:text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default EstiloInput
