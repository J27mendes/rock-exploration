"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "sonner"

import { AuthContextProvider } from "@/context/auth"
import { ProvidersProps } from "@/interfaces"

const queryClient = new QueryClient()

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="bottom-right" richColors closeButton />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}
