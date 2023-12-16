import { promises as fs } from "fs"
import * as path from "path"
import { FileMigrationProvider, type Kysely, Migrator } from "kysely"
import { Database } from "./types"
import { fileURLToPath } from "url"

const BASE_DIR = __dirname

// Your migrationFolder assignment
const migrationFolder = path.join(__dirname, "migrations")

export const createMigrator = (db: Kysely<Database>) =>
  new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(BASE_DIR, "migrations"),
    }),
  })
