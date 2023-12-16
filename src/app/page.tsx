"use client"

import { signIn, useSession } from "next-auth/react"

import { BorderedButton } from "../components/button/BorderedButton"
import { Button } from "../components/button/Button"
import { GameContainer } from "../components/game/GameContainer"

const Page = () => {
  const { data: session, status } = useSession()

  return (
    <div className="flex max-w-[32rem] flex-col items-center gap-y-6 px-8">
      {status !== "authenticated" ? (
        <Button onClick={() => signIn("google")}>Logg inn for å starte!</Button>
      ) : (
        <GameContainer />
      )}
    </div>
  )
}

export default Page
