type CustomButtonProps = {
  children?: React.ReactNode
  bgColor?: string
  onClick?: () => void
  className?: string
  type?: "button" | "submit" | "reset"
}

const Button = ({
  children,
  bgColor = "#d2783b",
  onClick,
  className = "",
  type = "button",
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-16 w-32 animate-pulseStrong rounded-lg border-4 border-white text-xl font-semibold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </button>
  )
}

export default Button
