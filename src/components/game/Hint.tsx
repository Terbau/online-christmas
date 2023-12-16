import { FC, useEffect, useState } from "react"

import { Icon } from "@iconify/react"
import { Transition } from "@headlessui/react"

interface HintProps {
  state: "correct" | "incorrect"
  text: string
  num: number
}

export const Hint: FC<HintProps> = ({ state, text, num }) => {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setIsShowing(true)
  }, [])

  const stateStyles = {
    correct: "bg-green-400",
    incorrect: "bg-red-400",
  }

  const icons = {
    correct: "carbon:checkmark",
    incorrect: "carbon:close",
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
        <div
          className={`flex h-10 w-full flex-row items-center gap-x-1 px-4 font-bold text-white ${stateStyles[state]}`}
        >
          <Icon className="h-6 w-6" icon={icons[state]} />
          <span>Regel {num + 1}</span>
        </div>
        <div className="px-4 py-6">
          <p>{text}</p>
        </div>
      </div>
    </Transition>
  )
}
