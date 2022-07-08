import { CommentType } from "app/comments/types"
import { DiscussionType } from "app/discussions"
import { QuestionType } from "app/questions"
import { ThreadType } from "app/threads"
import { ClientSession } from "blitz"

export interface CommentCardProps {
	comment: CommentType
	nestingLevel: string
	session: ClientSession
	editComment: Function
	reply: boolean
	setReply: Function
	type: "question" | "thread"
	parentObj: DiscussionType | ThreadType | QuestionType
	setQueryData?: Function
}
