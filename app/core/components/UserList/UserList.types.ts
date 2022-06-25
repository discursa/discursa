import { setQueryData } from "blitz"
import { User } from "@prisma/client"
import { DiscussionType, QuestionType, ThreadType } from "app/core/types"

interface ItemUserListProps {
	members: string[]
	nestingLevel: string
	setQueryData: Function
}

interface DiscussionListUserProps extends ItemUserListProps {
	discussion: DiscussionType
}

interface ThreadListUserProps extends ItemUserListProps {
	thread: ThreadType
}

interface QuestionUserListProps extends ItemUserListProps {
	question: QuestionType
}

interface UserListProps extends ItemUserListProps {
	type: "thread" | "discussion" | "question"
	object: DiscussionType | ThreadType | QuestionType
}

export type {
	ItemUserListProps,
	UserListProps,
	DiscussionListUserProps,
	ThreadListUserProps,
	QuestionUserListProps,
}
