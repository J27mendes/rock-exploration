"use client"

import InputMask from "react-input-mask"

import { MaskedInputProps } from "@/interfaces"

import { Input } from "./ui/input"

export const MaskedInput = ({ mask, ...props }: MaskedInputProps) => {
  return (
    <InputMask mask={mask} {...props}>
      {(inputProps: any) => <Input {...inputProps} />}
    </InputMask>
  )
}
