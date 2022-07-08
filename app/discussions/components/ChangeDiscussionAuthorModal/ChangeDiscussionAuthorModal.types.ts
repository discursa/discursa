import { User } from "@prisma/client"
import { DiscussionType } from "app/discussions/types"

export interface ChangeAuthorModalProps {
	users: User[]
	discussion: DiscussionType
	setQueryData: Function
}
