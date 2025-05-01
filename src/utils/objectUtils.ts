import deepEqual from "fast-deep-equal"

//Adiciona o valor ao objeto de updates apenas se for diferente do valor existente.

export function addIfChanged<T extends object, K extends keyof T>(
  updates: Partial<T>,
  key: K,
  newValue: T[K],
  existingValue: T[K]
) {
  if (!deepEqual(newValue, existingValue)) {
    updates[key] = newValue
  }
}

// Mescla dois objetos JSON, tratando undefined e null com segurança.

export function mergeJsonObject<T extends object>(
  existing: unknown,
  incoming?: T
): T | undefined {
  if (!incoming) return undefined
  const existingObject =
    typeof existing === "object" && existing !== null ? existing : {}
  return { ...existingObject, ...incoming }
}
