type CustomButtonProps = {
  label: string
  bgColor?: string
  onClick?: () => void
  className?: string
}

const Button = ({
  label,
  bgColor = "#d2783b",
  onClick,
  className = "",
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`animate-pulseStrong h-16 w-32 rounded-lg border-4 border-white text-xl font-semibold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {label}
    </button>
  )
}

export default Button
