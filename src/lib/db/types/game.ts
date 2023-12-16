import { Generated } from "kysely"

export interface SubmittedPassword {
  createdAt: Generated<Date>
  updatedAt: Generated<Date>
  password: string
  userId: string
}
