import { NextResponse } from "next/server"
import { authOptions } from "#/src/lib/auth"
import { db } from "#/src/lib/db"
import { getServerSession } from "next-auth"
import { validateAll } from "#/src/lib/game"

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.redirect("/api/auth/signin")
  }

  const body = await request.json()
  const password: string | undefined = body.password

  if (!password) {
    return new NextResponse("Invalid password", {
      status: 400,
    })
  }

  if (!validateAll(password)) {
    return new NextResponse("Incorrect password", {
      status: 400,
    })
  }

  await db.insertInto("submittedPassword").values({ password, userId: session?.user?.id }).execute()

  return new NextResponse("Password successfully submitted", {
    status: 200,
  })
}
