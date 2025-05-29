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

const BandaInput = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="banda"
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor="banda"
            className="text-lg font-semibold text-cyan-400"
          >
            Nome da Banda
          </FormLabel>
          <FormControl>
            <Input
              id="banda"
              placeholder="Ex: Rock & Exploration"
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

export default BandaInput
