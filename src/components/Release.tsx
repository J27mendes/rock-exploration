"use client"

import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Textarea } from "./ui/textarea"

const ReleaseTextarea = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="release"
      render={({ field }) => (
        <FormItem>
          <FormLabel
            htmlFor="release"
            className="text-lg font-semibold text-cyan-400"
          >
            Release
          </FormLabel>
          <FormControl>
            <Textarea
              id="release"
              placeholder="Conte um pouco sobre a banda..."
              {...field}
              className="bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white"
              rows={5}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default ReleaseTextarea
