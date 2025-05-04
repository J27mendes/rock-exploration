declare module "formdata-node" {
  export class File {
    name: string
    type: string
    size: number
    arrayBuffer(): Promise<ArrayBuffer>
  }

  export class FormData {
    append(_: string, value: File | Blob, filename?: string): void // `_` para parâmetros não utilizados

    getAll(name: string): File[]
  }
}
