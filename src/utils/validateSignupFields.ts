export const validateSignupFields = (input: any) => {
  const allowedKeys = ["banda", "email", "senha", "confirmeSenha"]

  const extraKeys = Object.keys(input).filter(
    (key) => !allowedKeys.includes(key)
  )

  if (extraKeys.length > 0) {
    throw new Error(`Campos extras encontrados: ${extraKeys.join(", ")}`)
  }

  return true
}
