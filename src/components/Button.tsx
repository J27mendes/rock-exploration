type CustomButtonProps = {
  children?: React.ReactNode
  bgColor?: string
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

const Button = ({
  children,
  bgColor = "#d2783b",
  onClick,
  className = "",
  type = "button",
  disabled,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`h-16 w-32 animate-pulseStrong rounded-lg border-4 border-white text-xl font-semibold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  )
}

export default Button
