"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Band, BandProps } from "@/interfaces"
import { fetchBandByFormId } from "@/utils/frontend/fetchBandByFormId"

export default function BandPageDetails({ params }: BandProps) {
  const { id } = params
  const router = useRouter()

  const [band, setBand] = useState<Band | null>(null)
  const [loading, setLoading] = useState(true)
  const [musicaAberta, setMusicaAberta] = useState<number | null>(null)

  const toggleLetra = (index: number) => {
    setMusicaAberta(musicaAberta === index ? null : index)
  }

  useEffect(() => {
    const fetchBand = async () => {
      try {
        const data = await fetchBandByFormId(id)
        setBand(data)
      } catch (error: any) {
        console.error("Erro ao buscar banda:", error)

        if (error.response && error.response.status === 404) {
          router.push("/not-found")
        } else {
          setBand(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBand()
  }, [id, router])

  if (loading) return <p>Carregando...</p>
  if (!band) return <p>Banda não encontrada.</p>

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-white hover:opacity-90"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar
        </Button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-amber-400">{band.banda}</h1>

        <Card className="mx-auto mt-2 flex max-w-xl rounded-lg border-cyan-600">
          <CardContent className="opacity-90">{band.release}</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="rounded-lg border-cyan-600">
          <CardHeader>
            <CardTitle>Estilo Musical:</CardTitle>
          </CardHeader>
          <CardContent className="font-semibold text-amber-400">
            {band.estilo}
          </CardContent>

          <CardHeader>
            <CardTitle>Integrantes:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1">
              {band.integrantes.map((i, idx) => (
                <li key={idx}>
                  <span className="font-semibold text-amber-400">{i.nome}</span>
                  {" - "}
                  <span className="font-medium text-cyan-600">
                    {i.instrumento}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-cyan-600">
          <CardHeader>
            <CardTitle>Imagens:</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <p className="font-semibold text-amber-400">{`Logo ${band.banda}`}</p>
            {/* <img
              src={band.imagem.urlImagemLogo}
              alt="Logo"
              className="w-full rounded-lg border-4 border-amber-400"
            /> */}
            <p className="font-semibold text-cyan-600">{`Integrantes ${band.banda}`}</p>
            {/* <img
              src={band.imagem.urlImagemBanda}
              alt="Banda"
              className="w-full rounded-lg border-4 border-cyan-400"
            /> */}
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center rounded-lg border-cyan-600">
          <CardHeader>
            <CardTitle>Músicas:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {band.setList.map((m, idx) => {
                const minutos = Math.floor(m.tempoMusica / 60)
                const segundos = m.tempoMusica % 60
                const tempoFormatado = `${minutos}:${segundos.toString().padStart(2, "0")}`

                return (
                  <li key={idx}>
                    <button
                      onClick={() => toggleLetra(idx)}
                      className="w-full text-left font-semibold text-amber-400 hover:underline"
                    >
                      {m.nomeMusica}
                      <span className="font-medium text-violet-400">{` - ${tempoFormatado} min`}</span>
                    </button>
                    {musicaAberta === idx && (
                      <div className="mt-1">
                        <small className="text-muted-foreground">
                          {m.letraMusica}
                        </small>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="mx-auto mt-10 flex max-w-xl items-center justify-center rounded-lg border-cyan-600">
        <CardHeader>
          <CardTitle className="flex justify-center">Contato:</CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="font-semibold text-amber-400">
            Email:{" "}
            <span className="font-medium text-cyan-600">
              {band.contato.email}
            </span>
          </p>
          <p className="font-semibold text-amber-400">
            {band.contato.nomePrimeiroNumero}:{" "}
            <span className="font-medium text-cyan-600">
              {band.contato.primeiroNumero}
            </span>
          </p>
          <p className="font-semibold text-amber-400">
            {band.contato.nomeSegundoNumero}:{" "}
            <span className="font-medium text-cyan-600">
              {band.contato.segundoNumero}
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
