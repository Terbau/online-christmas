import { SubmittedPassword } from "./game"
import { User } from "./user"

export interface Database {
  user: User
  submittedPassword: SubmittedPassword
}
