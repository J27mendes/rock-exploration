"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Band, BandProps } from "@/interfaces"

export default function BandPageDetails({ params }: BandProps) {
  const { id } = params
  const router = useRouter()

  const [band, setBand] = useState<Band | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBand = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/bands/${id}`,
        )
        const data = res.data
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
    <div className="p-4">
      <h1 className="text-3xl font-bold">{band.banda}</h1>
      <p className="mt-2 text-lg">{band.release}</p>

      <h2 className="mt-4 text-2xl">Integrantes:</h2>
      <ul>
        {band.integrantes.map((i, idx) => (
          <li key={idx}>
            {i.nome} - {i.instrumento}
          </li>
        ))}
      </ul>

      <h2 className="mt-4 text-2xl">Setlist:</h2>
      <ul>
        {band.setList.map((m, idx) => (
          <li key={idx}>
            {m.nomeMusica} ({m.tempoMusica} min)
            <br />
            <small>{m.letraMusica}</small>
          </li>
        ))}
      </ul>

      <h2 className="mt-4 text-2xl">Contato:</h2>
      <p>Email: {band.contato.email}</p>
      <p>
        {band.contato.nomePrimeiroNumero}: {band.contato.primeiroNumero}
      </p>
      <p>
        {band.contato.nomeSegundoNumero}: {band.contato.segundoNumero}
      </p>

      <h2 className="mt-4 text-2xl">Imagens:</h2>
      <img src={band.imagem.urlImagemBanda} alt="Banda" className="w-64" />
      <img src={band.imagem.urlImagemLogo} alt="Logo" className="w-32" />
      <img
        src={band.imagem.urlMapaPalco}
        alt="Mapa de Palco"
        className="w-64"
      />
    </div>
  )
}
