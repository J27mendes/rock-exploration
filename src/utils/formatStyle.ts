export function formatStyle(estilo: string) {
  return estilo
    .split(" ")
    .map((word) => word.trim())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}
