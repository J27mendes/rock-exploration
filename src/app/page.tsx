"use client"

import Button from "@/components/Button"
import ScrollText from "@/components/ScrollText"

const Home = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-[#1a1a1a] bg-hero-image">
      <div className="relative z-0 mt-8 h-[300px] w-[90%] max-w-[600px] overflow-hidden rounded-lg p-4 text-center shadow-lg backdrop-blur">
        <ScrollText />
      </div>
      <div className="flex w-full justify-around pb-4">
        <Button label="Login" />
        <Button label="Criar conta" bgColor="#1695c0" className="font-medium" />
      </div>
    </div>
  )
}

export default Home
