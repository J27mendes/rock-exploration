export function membersName(
  integrantes: { nome: string; instrumento: string }[]
): string[] {
  return integrantes.map((integrante) => integrante.nome)
}
