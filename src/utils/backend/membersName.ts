export function membersName({
  integrantes,
}: {
  integrantes: { nome: string; instrumento: string }[]
}): string[] {
  return integrantes.map((integrante) => integrante.nome)
}
