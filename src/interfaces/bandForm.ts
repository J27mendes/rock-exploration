export interface CreateBandFormDTO {
  banda: string
  quantidadeIntegrantes: number
  integrantes: {
    nome: string
    instrumento: string
  }[]
  estilo: string
  release: string
  imagem: {
    urlImagemBanda: string
    urlImagemLogo: string
    urlMapaPalco: string
  }
  quantidadeMusicas: number
  setList: {
    nomeMusica: string
    tempoMusica: number
    letraMusica: string
  }[]
  contato: {
    email: string
    nomePrimeiroNumero: string
    primeiroNumero: string
    nomeSegundoNumero: string
    segundoNumero: string
  }
}
export interface CreateBandFormWithPresentationTimeDTO
  extends CreateBandFormDTO {
  tempoApresentacao: number
}
export interface UploadFile {
  buffer: Buffer
  originalname: string
  mimetype: string
}
export interface FormWithId {
  id: string
}
export interface Band {
  id: string
  banda: string
  quantidadeIntegrantes: number
  integrantes: { nome: string; instrumento: string }[]
  estilo: string
  release: string
  imagem: {
    urlImagemBanda: string
    urlImagemLogo: string
    urlMapaPalco: string
  }
  quantidadeMusicas: number
  setList: { nomeMusica: string; tempoMusica: number; letraMusica: string }[]
  contato: {
    email: string
    nomePrimeiroNumero: string
    primeiroNumero: string
    nomeSegundoNumero: string
    segundoNumero: string
  }
}
export interface BandProps {
  params: { id: string }
}
export interface IdBand {
  id: string
  banda: string
}
