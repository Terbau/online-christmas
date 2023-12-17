import { Account, Profile, Session, User } from "next-auth"

import { AdapterUser } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import { db } from "#/src/lib/db"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User | AdapterUser }) {
      if (user.id && user.email) {
        await db
          .insertInto("user")
          .values({
            id: user.id,
            email: user.email,
            name: user.name ?? "",
            authProvider: "google",
          })
          .onConflict((oc) =>
            oc.column("id").doUpdateSet({
              email: (eb) => eb.ref("excluded.email"),
            })
          )
          .execute()
      }

      return true
    },
    async session({ session, token }: any): Promise<Session> {
      session.user.id = token.sub
      return session
    },
  },
}
