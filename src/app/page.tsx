"use client"

import { signIn, useSession } from "next-auth/react"

import { Button } from "../components/button/Button"
import { GameContainer } from "../components/game/GameContainer"
import { useState } from "react"

const Page = () => {
  const { status } = useSession()
  const [showTitle, setShowTitle] = useState(true)

  return (
    <div className="flex max-w-[32rem] flex-col items-center gap-y-6 px-8">
      {showTitle && (
        <>
          <h1 className="text-center text-2xl">Velkommen til Hovedstyrets Julekalender!🚀</h1>
          <p className="text-center">
            Dagens oppgave er å finne frem til et gyldig passord. Det vil dukke opp noen regler underveis som skal
            hjelpe deg med å lage det sikreste passordet mulig.
          </p>
        </>
      )}

      {status !== "authenticated" ? (
        <Button onClick={() => signIn("ow4")}>Logg inn for å starte!</Button>
      ) : (
        <GameContainer setShowTitle={setShowTitle} />
      )}
    </div>
  )
}

export default Page
