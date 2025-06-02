"use client"

import { forwardRef } from "react"
import { IMaskInput } from "react-imask"

export const MaskInput = forwardRef<HTMLInputElement, any>((props, ref) => {
  return (
    <IMaskInput {...props} mask="(00) 00000-0000" inputRef={ref} overwrite />
  )
})

MaskInput.displayName = "MaskInput"
