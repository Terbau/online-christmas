import { Session, User } from "next-auth"

import { AdapterUser } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import { db } from "#/src/lib/db"

const OW4Config = {
  id: "ow4",
  name: "online.ntnu.no",
  wellKnown: "https://old.online.ntnu.no/openid/.well-known/openid-configuration",
  type: "oauth",
  clientId: process.env.OW4_CLIENT_ID as string,
  clientSecret: process.env.OW4_CLIENT_SECRET as string,
  authorization: {
    params: {
      scope: "openid email profile onlineweb4",
    },
  },
  client: {
    authorization_signed_response_alg: "HS256",
    id_token_signed_response_alg: "HS256",
  },
  checks: ["pkce", "state"],
  profile: (profile: any) => {
    return {
      id: profile.sub,
      name: "",
      email: "",
    }
  },
}

export const upsertUser = async (id: string, name: string, email: string, authProvider: string) => {
  if (id && email) {
    // needed for ow4
    await db
      .insertInto("user")
      .values({
        id,
        name,
        email,
        authProvider,
      })
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          name: (eb) => eb.ref("excluded.name"),
          email: (eb) => eb.ref("excluded.email"),
        })
      )
      .execute()
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    OW4Config,
  ],
  callbacks: {
    async signIn({ user, profile, account }: { user: User | AdapterUser; profile: any; account: any }) {
      await upsertUser(user.id, profile.name, profile.email, account.provider)

      return true
    },
    async jwt({ token, account }: any): Promise<any> {
      if (account && account.provider === "ow4") {
        const resp = await fetch("https://old.online.ntnu.no/openid/userinfo", {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        })

        const data = await resp.json()
        await upsertUser(data.sub, data.name, data.email, account.provider)
        return data
      }

      return token
    },
    async session({ session, token }: any): Promise<Session> {
      session.user.id = token.sub
      return session
    },
  },
}
