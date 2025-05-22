"use client"

import { useRouter } from "next/navigation"

import ImageComponent from "@/components/ImageComponent"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  const router = useRouter()

  const handleGoToRockExploration = () => {
    router.push("/rockexploration")
  }

  return (
    <ImageComponent notFound>
      <div className="absolute left-4 top-4">
        <Button variant={"destructive"} onClick={handleGoToRockExploration}>
          Ir para Rock Exploration
        </Button>
      </div>
    </ImageComponent>
  )
}

export default NotFound
