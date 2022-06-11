import { User } from "@prisma/client"
import { DiscussionType, ThreadType } from "app/core/types"

export interface UserCardProps {
	user: User
	nestingLevel: string
	object: DiscussionType | ThreadType
	kickUser: Function
}
