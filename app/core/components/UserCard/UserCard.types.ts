import { User } from "@prisma/client"
import { DiscussionType, ThreadType } from "app/core/types"

export interface UserCardProps {
	userId: string
	nestingLevel: string
	object: DiscussionType | ThreadType
	kickUser: Function
}
