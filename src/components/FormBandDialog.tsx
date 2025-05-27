"use client"

import { useState } from "react"

import FormButton from "@/components/Button"
import { Form } from "@/components/ui/form"
import { useBandForm } from "@/forms/hooks/bandForm"
import { CreateBandFormInput } from "@/types"

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
      ></form>
      <FormButton type="submit" bgColor="#1695c0" disabled={isPending}>
        {isPending ? "Enviando..." : "Criar conta"}
      </FormButton>
    </Form>
  )
}

export default FormBandSignup
