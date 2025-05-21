"use client"
import { Menu } from "lucide-react"
import Link from "next/link"

import ImageComponent from "@/components/ImageComponent"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthContext } from "@/context/auth"

const BandPage = () => {
  const { user, initializing, signOut } = useAuthContext()

  return (
    <ImageComponent>
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-black/0 p-4">
        <div className="flex flex-col items-center">
          <p className="text-white">bem vindo ao rock exploration,</p>
          <h1 className="text-2xl font-bold text-white">
            {initializing || !user ? "Minha Banda" : user?.banda}
          </h1>
          <p className="text-white">
            {" "}
            preencha o formulario com as informações de sua banda.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="border border-orange-400 text-white"
            >
              <Menu className="h-5 w-5 cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border border-orange-400 bg-slate-700 font-semibold text-white">
            <DropdownMenuLabel className="flex justify-center">
              {initializing ? "Minha Banda" : user?.banda}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-orange-400" />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/rockexploration" className="w-full">
                Bandas da Rock Exploration
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href="#" className="w-full">
                Página da Banda {` ${user?.banda}`}
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href="/band" className="w-full">
                Formulário
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <a onClick={() => signOut()} className="w-full">
                Sair
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </ImageComponent>
  )
}

export default BandPage
