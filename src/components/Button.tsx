"use client"

import React from "react"

type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
  bgColor?: string
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const FormButton = ({
  children,
  bgColor = "#d2783b",
  onClick,
  className = "",
  type = "button",
  disabled,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-16 w-32 animate-pulseStrong cursor-pointer rounded-lg border-4 border-white text-xl font-semibold text-white hover:font-bold hover:text-black ${className}`}
      style={{ backgroundColor: bgColor }}
      {...props}
    >
      {children}
    </button>
  )
}

export default FormButton
