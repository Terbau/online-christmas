"use client"

import "../styles/globals.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { Footer } from "../components/footer"
import { Navbar } from "../components/nav"
import { SessionProvider } from "next-auth/react"

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="[color-scheme:light]">
      <head>
        <title>Hovedstyrets Julekalender</title>
      </head>
      <body className="flex min-h-screen flex-col items-center">
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main className="mb-16 mt-16 max-w-screen-lg">{children}</main>
            <Footer />
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
