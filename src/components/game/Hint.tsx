import { FC, useEffect, useState } from "react"

import { Transition } from "@headlessui/react"

interface HintProps {
  state: "correct" | "incorrect"
  text: string
}

export const Hint: FC<HintProps> = ({ state, text }) => {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setIsShowing(true)
  }, [])

  const stateStyles = {
    correct: "bg-green-400",
    incorrect: "bg-red-400",
  }

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl shadow-lg transition ease-out">
        <div className={`flex h-10 w-full flex-col justify-center px-4 font-bold text-white ${stateStyles[state]}`}>
          {state.charAt(0).toUpperCase() + state.slice(1)}
        </div>
        <div className="px-4 py-6">
          <p>{text}</p>
        </div>
      </div>
    </Transition>
  )
}
