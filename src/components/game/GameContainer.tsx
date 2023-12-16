import { EnumeratedHint as HintType, validateSpecial } from "#/src/lib/game/index"
import { useEffect, useState } from "react"

import { Hint } from "./Hint"
import { WinScreen } from "./WinScreen"
import { deobfuscate } from "#/src/lib/obfuscation"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

interface Game {
  hints: HintType[]
}

export const GameContainer = () => {
  const { status } = useSession()
  const [password, setPassword] = useState("")
  const [activeHints, setActiveHints] = useState<number[]>([])
  const [hintStates, setHintStates] = useState<Record<number, "correct" | "incorrect">>({})
  const [hasWon, setHasWon] = useState(false)

  const fetchHints = (): Promise<Game> =>
    fetch("/api/game/hints").then(async (res) => {
      const respData: Game = await res.json()

      respData.hints.forEach((hint) => {
        if (!hint.isObfuscated) return

        hint.answers = hint.answers.map((answer) => deobfuscate(answer, hint.obfuscationKey ?? ""))
      })

      setActiveHints([0])

      const newHintStates = { ...hintStates }
      data?.hints.forEach((hint) => {
        newHintStates[hint.num] = "incorrect"
      })

      return respData
    })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["gameHints"],
    queryFn: fetchHints,
    enabled: false,
  })

  useEffect(() => {
    if (status === "authenticated") {
      refetch()
    }
  }, [refetch, status])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const lowerValue = value.toLowerCase()
    setPassword(value)

    if (!data) return

    const newHintStates = { ...hintStates }

    let anyDidGoFromCorrectToIncorrect = false

    data.hints.forEach((hint) => {
      if (!activeHints.includes(hint.num)) {
        newHintStates[hint.num] = "incorrect"
      } else {
        let isCorrect = false

        if (hint.specialFuncName) {
          isCorrect = validateSpecial(hint.specialFuncName, lowerValue)
        } else {
          hint.answers.forEach((answer) => {
            if (lowerValue.includes(answer.toLowerCase())) {
              isCorrect = true
            }
          })
        }

        if (isCorrect) {
          newHintStates[hint.num] = "correct"
        } else {
          if (hintStates[hint.num] === "correct") {
            anyDidGoFromCorrectToIncorrect = true
          }
          newHintStates[hint.num] = "incorrect"
        }
      }
    })

    if (!Object.values(newHintStates).includes("incorrect")) {
      setHasWon(true)
    } else {
      if (!anyDidGoFromCorrectToIncorrect && !activeHints.some((hintNum) => newHintStates[hintNum] === "incorrect")) {
        if (activeHints.length === data.hints.length) {
          return
        }

        setActiveHints([...activeHints, activeHints.length])
      }
    }

    setHintStates(newHintStates)
  }

  if (status !== "authenticated") {
    return <div></div>
  }

  if (!data && isLoading) {
    return <div>Loading...</div>
  }

  if (!data) return <p>Something went wrong...</p>

  if (hasWon) {
    return <WinScreen password={password} />
  }

  activeHints.sort((a, b) => {
    const statusA = hintStates[a]
    const statusB = hintStates[b]

    // Compare "incorrect" values first
    if (statusA === "incorrect" && statusB !== "incorrect") {
      return -1
    } else if (statusA !== "incorrect" && statusB === "incorrect") {
      return 1
    }

    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }

    // For other cases, maintain the original order
    return 0
  })

  return (
    <div className="flex w-full flex-col gap-y-8">
      <h1 className="text-center text-2xl">Velkommen til Luke 3!</h1>
      <p className="text-center">
        Dagens oppgave er å finne frem til riktig passord. Du vil få hint underveis som vil hjelpe deg til svaret.
      </p>

      <div className="relative flex w-full flex-col justify-center">
        <input
          type="text"
          name="customPassword"
          id="customPassword"
          placeholder="Start med å skrive noe tilfeldig"
          className="h-12 rounded-lg border border-gray-500 px-3 py-2"
          onChange={handlePasswordChange}
        />
        {/* <span className="absolute -right-5">{password.length}</span> */}
      </div>

      <div className="flex flex-col gap-y-6">
        {activeHints.map((hintNum) => (
          <Hint key={hintNum} state={hintStates[hintNum] ?? "incorrect"} text={data.hints[hintNum].text} />
        ))}
      </div>
    </div>
  )
}
