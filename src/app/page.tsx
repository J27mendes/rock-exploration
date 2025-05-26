"use client"

import { useState } from "react"

import Button from "@/components/Button"
import ImageComponent from "@/components/ImageComponent"
import UserLogin from "@/components/LoginDialog"
import RockExplorationModalWrapper from "@/components/RockExplorationModalWrapper"
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
        <RockExplorationModalWrapper>
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
        </RockExplorationModalWrapper>
      )}

      {showSignup && (
        <RockExplorationModalWrapper>
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
        </RockExplorationModalWrapper>
      )}
    </ImageComponent>
  )
}

export default Home
