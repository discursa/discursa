import { User } from "@prisma/client"

export interface PreviewableMessageProps {
  message: string
  user: User
}
