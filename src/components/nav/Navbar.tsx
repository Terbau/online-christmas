"use client"

import { signIn, signOut, useSession } from "next-auth/react"

import { BorderedButton } from "../button/BorderedButton"
import { Button } from "../button/Button"

export const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <div className="flex h-16 w-full flex-row items-center justify-between bg-blue-400 px-8 text-white">
      <p className="text-xl">Hovedstyret's Julekalender</p>
      <div className="flex flex-row items-center gap-x-4">
        {!session ? (
          <Button color="white" onClick={() => signIn("google")}>
            Logg inn
          </Button>
        ) : (
          <>
            <p className="hidden sm:block">{session.user?.name}</p>
            <BorderedButton color="white" onClick={() => signOut()}>
              Logg ut
            </BorderedButton>
          </>
        )}
      </div>
    </div>
  )
}
