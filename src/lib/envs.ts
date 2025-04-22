export const env = {
  JWT_ACCESS_TOKEN_SECRET:
    process.env.JWT_ACCESS_TOKEN_SECRET ??
    (() => {
      throw new Error("JWT_ACCESS_TOKEN_SECRET not set")
    })(),
  JWT_REFRESH_TOKEN_SECRET:
    process.env.JWT_REFRESH_TOKEN_SECRET ??
    (() => {
      throw new Error("JWT_REFRESH_TOKEN_SECRET not set")
    })(),
}
