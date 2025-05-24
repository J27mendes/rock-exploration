"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

import Button from "@/components/Button"
import ImageComponent from "@/components/ImageComponent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthContext } from "@/context/auth"
import { IdBand } from "@/interfaces"

const RockExploration = () => {
  const { user, initializing } = useAuthContext()

  const destination = initializing ? "#" : user ? "/band" : "/"
  const [bands, setBands] = useState<IdBand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const res = await axios.get<IdBand[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/bands`,
        )
        setBands(res.data)
      } catch (error) {
        console.error("Erro ao buscar bandas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBands()
  }, [])

  return (
    <ImageComponent>
      <div className="flex w-full flex-1 items-center justify-center p-2">
        <div className="flex min-h-[250px] w-full max-w-6xl gap-4 md:min-h-[400px]">
          <Card className="flex-[1.5] rounded-lg border border-orange-400 bg-transparent text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-center text-2xl font-semibold">
                O que é o Rock Exploration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-justify indent-8 text-xl font-semibold">
                O Rock Exploration é um movimento que reafirma o poder
                transformador da arte, da tecnologia e da inclusão como motores
                de desenvolvimento cultural e social. Ao promover um encontro
                entre o som das ruas e os recursos digitais, o projeto cria
                novas pontes entre artistas e públicos, entre tradição e futuro,
                entre o Recife de Chico Science e a cidade criativa que pulsa
                nos becos, palcos e redes de hoje. A cidade do Recife, com sua
                história marcada pela diversidade, pelo pensamento crítico e
                pela potência criativa, merece um espaço que valorize não apenas
                o que já foi, mas o que está sendo construído por novas vozes,
                novos ritmos e novas linguagens. O Rock Exploration se apresenta
                como esse espaço: inovador, acessível, plural e profundamente
                conectado com a alma recifense. Trata-se de uma iniciativa que
                contribui diretamente para o fortalecimento da economia
                criativa, para o reconhecimento da música autoral alternativa
                como expressão legítima e rica da cultura local, e para a
                construção de uma cidade mais justa, onde a arte é celebrada
                como direito de todos — sem distinções, sem barreiras e sem
                estigmas.
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1 rounded-lg border border-blue-400 bg-transparent text-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-center text-2xl font-semibold">
                Bandas Parceiras
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="bg-zinc-600 text-white">Carregando bandas...</p>
              ) : (
                <ul className="space-y-2 pl-5 text-justify text-xl font-semibold">
                  {bands
                    .slice()
                    .sort((a, b) => a.banda.localeCompare(b.banda))
                    .map((band) => (
                      <li className="p-[2px]" key={band.id}>
                        <Link
                          href={`/rockexploration/${band.id}`}
                          className="rounded-md border border-orange-300 bg-transparent px-3 py-1 font-semibold text-orange-300 shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:border-blue-400 hover:bg-blue-300/20 hover:text-cyan-400 hover:underline hover:decoration-blue-400 hover:shadow-md"
                        >
                          {band.banda}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Link href={destination}>
        <Button bgColor="#1695c0" type="button" children={"Entrar"} />
      </Link>
    </ImageComponent>
  )
}

export default RockExploration
