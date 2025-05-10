"use client"

import { useState } from "react"

import Button from "@/components/Button"
import ScrollText from "@/components/ScrollText"
import CreateSignup from "@/components/SignupDialog"

const Home = () => {
  const [showSignup, setShowSignup] = useState(false)
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-end overflow-hidden bg-[#1a1a1a] bg-hero-image">
      <div className="relative z-0 mt-8 h-[300px] w-[90%] max-w-[600px] overflow-hidden rounded-lg p-4 text-center shadow-lg backdrop-blur">
        <ScrollText />
      </div>
      <div className="flex w-full justify-around pb-4">
        <Button>Login</Button>
        <Button bgColor="#1695c0" onClick={() => setShowSignup(true)}>
          Criar conta
        </Button>
      </div>

      {showSignup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <CreateSignup />
            <div className="mt-4 text-center">
              <Button onClick={() => setShowSignup(false)} bgColor="#999">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
