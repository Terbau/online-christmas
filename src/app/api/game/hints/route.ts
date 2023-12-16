import { NextResponse } from "next/server"
import { authOptions } from "#/src/lib/auth"
import { getHintsWithObfuscatedAnswers } from "#/src/lib/game"
import { getServerSession } from "next-auth"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.redirect("/api/auth/signin")
  }

  return NextResponse.json({
    hints: getHintsWithObfuscatedAnswers(),
  })
}
