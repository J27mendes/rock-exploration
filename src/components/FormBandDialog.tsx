"use client"

import { useForm } from "react-hook-form"

import { Form } from "./ui/form"

const FormBandSignup = () => {
  const form = useForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <div>olá mundo</div>
      </form>
    </Form>
  )
}

export default FormBandSignup
