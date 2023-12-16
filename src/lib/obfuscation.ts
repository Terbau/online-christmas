function fixNumber(inputNumber: number): string {
  let numberString = inputNumber.toString()

  while (numberString.length < 5) {
    numberString = "0" + numberString
  }

  return numberString
}

export function generateRandomKey(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let key = ""
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return key
}

export function obfuscate(text: string, key: string): string {
  let obfuscatedText = text.split("").reverse().join("")
  obfuscatedText = obfuscatedText
    .split("")
    .map((char) => fixNumber(char.charCodeAt(0)))
    .join("")
  const randomChars = generateRandomKey(5)
  obfuscatedText += randomChars
  obfuscatedText = obfuscatedText
    .split("")
    .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length)))
    .join("")
  obfuscatedText = Buffer.from(obfuscatedText).toString("base64")
  return obfuscatedText
}

export function deobfuscate(obfuscatedText: string, key: string): string {
  obfuscatedText = Buffer.from(obfuscatedText, "base64").toString("ascii")
  obfuscatedText = obfuscatedText
    .split("")
    .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length)))
    .join("")
  obfuscatedText = obfuscatedText.slice(0, -5)
  obfuscatedText =
    obfuscatedText
      .match(/.{1,5}/g)
      ?.map((code) => String.fromCharCode(parseInt(code, 10)))
      .join("") || ""
  obfuscatedText = obfuscatedText.split("").reverse().join("")
  return obfuscatedText
}
