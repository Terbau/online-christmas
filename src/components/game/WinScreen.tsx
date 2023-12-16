import { FC, useState } from "react"

import { Button } from "../button/Button"
import { useMutation } from "@tanstack/react-query"

interface WinScreenProps {
  password: string
}

export const WinScreen: FC<WinScreenProps> = ({ password }) => {
  const [hasSentInAnswer, setHasSentInAnswer] = useState(false)
  const [answerWasRegistered, setAnswerWasRegistered] = useState(false)

  const submitPassword = async () => {
    await fetch("/api/game/submit", {
      method: "POST",
      body: JSON.stringify({ password }),
    })
  }

  const { mutate, error, isPending } = useMutation({
    mutationFn: submitPassword,
    onSuccess: () => {
      setAnswerWasRegistered(true)
    },
  })

  return (
    <div className="flex flex-col items-center gap-y-6 text-center">
      <div>
        <h1 className="text-2xl">Gratulerer!🎉</h1>
        <p className="text-lg">Du har funnet frem til riktig passord!</p>
      </div>

      <div className="flex flex-col">
        <span>Ditt passord:</span>
        <span className="rounded-sm bg-gray-200 p-2">{password}</span>
      </div>

      {!error && !answerWasRegistered && (
        <Button
          onClick={() => {
            setHasSentInAnswer(true)
            mutate()
          }}
        >
          Trykk her for å sende inn ditt svar
        </Button>
      )}

      {!error && hasSentInAnswer && !answerWasRegistered && <p>Sender...</p>}

      {!error && answerWasRegistered && <p>Svaret ditt er registrert!</p>}

      {error && <p>Noe gikk galt...</p>}
    </div>
  )
}
