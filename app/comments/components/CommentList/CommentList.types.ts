import {
	CommentType,
	DiscussionType,
	QuestionType,
	ThreadType,
} from "app/core/types"
import { ClientSession } from "blitz"
export interface CommentListProps {
	comments: CommentType[]
	nestingLevel: string
	editComment: Function
	session: ClientSession
	reply: boolean
	setReply: Function
	type: "question" | "thread"
	parent: DiscussionType | ThreadType | QuestionType
	setQueryData?: Function
	page?: number
	isPreviousData?: boolean
	hasMore?: any
}
