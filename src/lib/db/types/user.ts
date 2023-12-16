import { Generated } from "kysely"

export interface User {
  id: string
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  email: string
  authProvider: string
}
