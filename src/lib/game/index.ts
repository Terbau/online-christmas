import { buildHint as buildDigitsMustSumHint, validate as validateDigitsMustSum } from "./specialHints/digitsMustSum"
import {
  buildHint as buildMustIncludeDigit,
  validate as validateMustIncludeDigit,
} from "./specialHints/mustIncludeDigit"
import { generateRandomKey, obfuscate } from "../obfuscation"

import { buildHint as buildA4RoomsHint } from "./hints/a4Rooms"
import { buildHint as buildArrkomEventsHint } from "./hints/arrkomEvents"
import { buildHint as buildFirstSemesterSubjectHint } from "./hints/firstSemesterSubject"
import { buildHint as buildGloshaugenBusesHint } from "./hints/gloshaugenBuses"
import { buildHint as buildLast5LeadersHint } from "./hints/last5Leaders"
import { buildHint as buildOnlineAgeHint } from "./hints/onlineAge"
import { buildHint as buildTrikomMemberHint } from "./hints/trikomMemberHint"

export interface Hint {
  text: string
  answers: string[]
  specialFuncName: string | undefined
  isObfuscated: boolean
  obfuscationKey: string | undefined
}

export interface EnumeratedHint extends Hint {
  num: number
}

export const getHintsWithObfuscatedAnswers = (): EnumeratedHint[] => {
  const hints = buildHints()

  const newHints = hints.map((hint, index) => {
    if (hint.isObfuscated) {
      const obfuscationKey = generateRandomKey(32)

      const obfuscatedAnswers = hint.answers.map((answer) => obfuscate(answer, obfuscationKey))
      return {
        ...hint,
        obfuscationKey: obfuscationKey,
        answers: obfuscatedAnswers,
        num: index,
      }
    }

    return {
      ...hint,
      num: index,
    }
  })

  return newHints
}

const buildHints = (): Hint[] => {
  const hints = [
    buildMustIncludeDigit(),
    buildFirstSemesterSubjectHint(),
    buildArrkomEventsHint(),
    buildDigitsMustSumHint(),
    buildA4RoomsHint(),
    buildGloshaugenBusesHint(),
    buildLast5LeadersHint(),
    buildOnlineAgeHint(),
    buildTrikomMemberHint(),
  ]

  return hints
}

export const validateAll = (password: string) => {
  const hints = buildHints()

  for (const hint of hints) {
    if (hint.specialFuncName) {
      if (!validateSpecial(hint.specialFuncName, password)) {
        return false
      }
    } else {
      if (!validate(hint.answers, password)) {
        return false
      }
    }
  }

  return true
}

export const validate = (answers: string[], password: string) => {
  for (const answer of answers) {
    if (password.toLowerCase().includes(answer.toLowerCase())) {
      return true
    }
  }
  return false
}

export const validateSpecial = (specialFuncName: string, password: string): boolean => {
  switch (specialFuncName) {
    case "mustIncludeDigit":
      return validateMustIncludeDigit(password)
    case "digitsMustSum":
      return validateDigitsMustSum(password)
    default:
      return false
  }
}
