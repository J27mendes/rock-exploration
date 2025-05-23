"use client"

import { useRouter } from "next/navigation"

import Button from "@/components/Button"
import ImageComponent from "@/components/ImageComponent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthContext } from "@/context/auth"

const RockExploration = () => {
  const router = useRouter()
  const { user, initializing } = useAuthContext()

  const handleEnter = () => {
    if (initializing) return

    if (user) {
      router.push("/band")
    } else {
      router.push("/")
    }
  }

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
              <ul className="pl-5 text-justify text-xl font-semibold">
                <li>Banda 1</li>
                <li>Banda 2</li>
                <li>Banda 3</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Button
        bgColor="#1695c0"
        type="button"
        onClick={handleEnter}
        children={"Entrar"}
      />
    </ImageComponent>
  )
}

export default RockExploration
