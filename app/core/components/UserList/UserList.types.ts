import { setQueryData } from "blitz"
import { User } from "@prisma/client"
import { DiscussionType, ThreadType } from "app/core/types"

interface ItemUserListProps {
	users: User[]
	nestingLevel: string
	setQueryData: Function
}

interface DiscussionListProps extends ItemUserListProps {
	discussion: DiscussionType
}

interface ThreadListProps extends ItemUserListProps {
	thread: ThreadType
}

interface UserListProps extends ItemUserListProps {
	type: "thread" | "discussion"
	object: DiscussionType | ThreadType
}

export type {
	ItemUserListProps,
	UserListProps,
	DiscussionListProps,
	ThreadListProps,
}
