import { Hint } from ".."

export function buildHint(): Hint {
  const subjects = [
    "examen philosophicum for naturvitenskap og teknologi",
    "exphil",
    "exph0300",
    "webteknologi",
    "webtek",
    "it2805",
    "brukerkurs i matematikk a",
    "matematikk a",
    "matte a",
    "ma0001",
    "informasjonsteknologi, grunnkurs",
    "informasjonsteknologi grunnkurs",
    "itgk",
    "tdt4109",
  ]

  return {
    text: "Passordet må inneholde navnet eller fagkoden til et fag informatikere har i sitt første semester.",
    answers: subjects,
    specialFuncName: undefined,
    isObfuscated: true,
    obfuscationKey: undefined,
  }
}
