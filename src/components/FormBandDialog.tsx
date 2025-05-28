"use client"

import { useState } from "react"

import FormButton from "@/components/Button"
import { Form } from "@/components/ui/form"
import { useBandForm } from "@/forms/hooks/bandForm"
import { CreateBandFormInput } from "@/types"

import BandaInput from "./BandaInput"
import EstiloInput from "./Estilo"
import QuantidadeIntegrantesInput from "./QuantidadeIntegrantes"
import ReleaseTextarea from "./Release"

const FormBandSignup = ({ onClose }: { onClose: () => void }) => {
  const { bandForm } = useBandForm()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (data: CreateBandFormInput) => {
    setIsPending(true)
    try {
      console.log("Dados enviados:", data)
      onClose()
    } catch (error) {
      console.error("Erro no envio do formulário:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...bandForm}>
      <form
        onSubmit={bandForm.handleSubmit((data) => {
          handleSubmit(data)
        })}
        className="space-y-4"
      >
        <BandaInput />
        <QuantidadeIntegrantesInput />
        <EstiloInput />
        <ReleaseTextarea />
        <FormButton type="submit" bgColor="#1695c0" disabled={isPending}>
          {isPending ? "Enviando..." : "Enviar"}
        </FormButton>
      </form>
    </Form>
  )
}

export default FormBandSignup
