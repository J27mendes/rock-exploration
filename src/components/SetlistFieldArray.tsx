"use client"

import { useFormContext } from "react-hook-form"

import { useSetListFieldArray } from "@/forms/hooks/useSetListFieldArray"
import { CreateBandFormInputFrontend } from "@/types"

import { Button } from "./ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const SetListFieldArray = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()
  const { fields, append, remove } = useSetListFieldArray(control)

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-cyan-400">Set List</div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex flex-col gap-2">
          <FormField<CreateBandFormInputFrontend>
            control={control}
            name={`setList.${index}.nomeMusica`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`setList.${index}.nomeMusica`}
                  className="font-bold text-amber-300"
                >
                  Nome da Música
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`setList.${index}.nomeMusica`}
                    value={field.value as string}
                    placeholder="Nome da música"
                    className="bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField<CreateBandFormInputFrontend>
            control={control}
            name={`setList.${index}.tempoMusica`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`setList.${index}.tempoMusica`}
                  className="font-bold text-amber-300"
                >
                  Tempo da Música (em segundos)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`setList.${index}.tempoMusica`}
                    min={1}
                    type="number"
                    value={field.value as number}
                    onChange={(e) => {
                      const val = e.target.value
                      field.onChange(val === "" ? undefined : Number(val))
                    }}
                    placeholder="Tempo da música"
                    className="bg-transparent text-xl text-white placeholder:text-xl placeholder:text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField<CreateBandFormInputFrontend>
            control={control}
            name={`setList.${index}.letraMusica`}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor={`setList.${index}.letraMusica`}
                  className="font-bold text-amber-300"
                >
                  Letra da Música
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={`setList.${index}.letraMusica`}
                    value={field.value as string}
                    placeholder="Letra da música"
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
        onClick={() =>
          append({
            nomeMusica: "",
            tempoMusica: 0,
            letraMusica: "",
          })
        }
        className="mt-2"
      >
        Adicionar Música
      </Button>
    </div>
  )
}

export default SetListFieldArray
