import { Kysely } from "kysely"
import { createTableWithDefaults } from "../utils"

export async function up(db: Kysely<any>): Promise<void> {
  await createTableWithDefaults("submitted_password", { id: false, createdAt: true, updatedAt: true }, db.schema)
    .addColumn("user_id", "text", (col) => col.references("user.id").onDelete("cascade"))
    .addColumn("password", "text", (col) => col.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("submitted_password").execute()
}
