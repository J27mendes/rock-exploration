declare module "formdata-node" {
  export class File {
    name: string
    type: string
    size: number
    arrayBuffer(): Promise<ArrayBuffer>
  }

  export class FormData {
    // eslint-disable-next-line no-unused-vars
    append(_: string, value: File | Blob, filename?: string): void // `_` para parâmetros não utilizados
    // eslint-disable-next-line no-unused-vars
    getAll(name: string): File[]
  }
}
