export const validateLoginFields = (input: any) => {
  const allowedKeys = ["email", "senha"]

  const extraKeys = Object.keys(input).filter(
    (key) => !allowedKeys.includes(key)
  )

  if (extraKeys.length > 0) {
    throw new Error(`Campos extras encontrados: ${extraKeys.join(", ")}`)
  }

  return true
}
