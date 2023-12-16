import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"

import { Database } from "./types"
import pg from "pg"

export function createKysely() {
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
    plugins: [new CamelCasePlugin()],
  })
}

export const db = createKysely()
