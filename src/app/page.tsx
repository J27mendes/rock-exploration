"use client"

import { useState } from "react"

import Button from "@/components/Button"
import ImageComponent from "@/components/ImageComponent"
import UserLogin from "@/components/LoginDialog"
import ScrollText from "@/components/ScrollText"
import CreateSignup from "@/components/SignupDialog"

const Home = () => {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleClose = () => {
    setShowSignup(false)
  }
  return (
    <ImageComponent>
      <div className="relative z-0 mt-8 h-[300px] w-[90%] max-w-[600px] overflow-hidden rounded-lg bg-black/0 p-4 text-center shadow-lg backdrop-blur-none">
        <ScrollText />
      </div>
      <div className="flex w-full justify-around pb-4">
        <Button
          onClick={() => {
            setShowLogin(true)
          }}
        >
          {showLogin ? "Aguardando" : "Login"}
        </Button>
        <Button
          bgColor="#1695c0"
          onClick={() => {
            setShowSignup(true)
          }}
          type="button"
        >
          {showSignup ? "Aguardando" : "Criar conta"}
        </Button>
      </div>
      {showLogin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-black bg-opacity-50 p-6">
            <p className="flex justify-center font-semibold text-white">
              Rock Exploration
            </p>
            <UserLogin onClose={handleClose} />

            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setShowLogin(false)}
                bgColor="#999"
                type="button"
                className="h-12"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSignup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-black bg-opacity-50 p-6">
            <p className="flex justify-center font-semibold text-white">
              Rock Exploration
            </p>
            <CreateSignup onClose={handleClose} />
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setShowSignup(false)}
                bgColor="#999"
                type="button"
                className="h-12"
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </ImageComponent>
  )
}

export default Home
