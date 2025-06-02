"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"

import { useImagemFields } from "@/forms/hooks/useImagemFields"
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

const ImagemUploadFields = () => {
  const { control } = useFormContext<CreateBandFormInputFrontend>()
  const { urlImagemBandaField, urlImagemLogoField, urlMapaPalcoField } =
    useImagemFields(control)

  const [previewBanda, setPreviewBanda] = useState<string | null>(null)
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)
  const [previewMapa, setPreviewMapa] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold text-cyan-400">Imagens</div>

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="imagem.urlImagemBanda"
        render={() => (
          <FormItem>
            <FormLabel
              htmlFor="urlImagemBanda"
              className="font-bold text-amber-300"
            >
              Imagem da Banda
            </FormLabel>
            <FormControl>
              <Input
                id="urlImagemBanda"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    urlImagemBandaField.onChange(file)
                    setPreviewBanda(URL.createObjectURL(file))
                  }
                }}
                className="hidden"
              />
              {previewBanda && (
                <img
                  src={previewBanda}
                  alt="Pré-visualização Imagem da Banda"
                  className="mb-3 h-20 w-auto rounded"
                />
              )}
              <Button
                asChild
                className="transition-none focus:border-none focus:outline-none focus:ring-0"
              >
                <label htmlFor="urlImagemBanda" className="cursor-pointer">
                  Imagem da Banda
                </label>
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="imagem.urlImagemLogo"
        render={() => (
          <FormItem>
            <FormLabel
              htmlFor="urlImagemLogo"
              className="font-bold text-amber-300"
            >
              Logo da Banda
            </FormLabel>
            <FormControl>
              <Input
                id="urlImagemLogo"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    urlImagemLogoField.onChange(file)
                    setPreviewLogo(URL.createObjectURL(file))
                  }
                }}
                className="hidden"
              />
              {previewLogo && (
                <img
                  src={previewLogo}
                  alt="Pré-visualização Logo da Banda"
                  className="mb-3 h-20 w-auto rounded"
                />
              )}
              <Button
                asChild
                className="transition-none focus:border-none focus:outline-none focus:ring-0"
              >
                <label htmlFor="urlImagemLogo" className="cursor-pointer">
                  Logo da Banda
                </label>
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<CreateBandFormInputFrontend>
        control={control}
        name="imagem.urlMapaPalco"
        render={() => (
          <FormItem>
            <FormLabel
              htmlFor="urlMapaPalco"
              className="font-bold text-amber-300"
            >
              Mapa de Palco
            </FormLabel>
            <FormControl>
              <Input
                id="urlMapaPalco"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    urlMapaPalcoField.onChange(file)
                    setPreviewMapa(URL.createObjectURL(file))
                  }
                }}
                className="hidden"
              />
              {previewMapa && (
                <img
                  src={previewMapa}
                  alt="Pré-visualização Mapa de palco da Banda"
                  className="mb-3 h-20 w-auto rounded"
                />
              )}
              <Button
                asChild
                className="transition-none focus:border-none focus:outline-none focus:ring-0"
              >
                <label htmlFor="urlMapaPalco" className="cursor-pointer">
                  Mapa de palco
                </label>
              </Button>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default ImagemUploadFields
