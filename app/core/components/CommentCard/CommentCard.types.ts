import {
	CommentType,
	DiscussionType,
	QuestionType,
	ThreadType,
} from "app/core/types"
import { ClientSession } from "blitz"

export interface CommentCardProps {
	comment: CommentType
	nestingLevel: string
	session: ClientSession
	editComment: Function
	reply: boolean
	setReply: Function
	type: "question" | "discussion" | "thread"
	parentObj: DiscussionType | ThreadType | QuestionType
	setQueryData?: Function
}
