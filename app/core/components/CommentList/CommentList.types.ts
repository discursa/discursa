import { CommentType } from "app/core/types"
import { ClientSession } from "blitz"
export interface CommentListProps {
	comments: CommentType[]
	nestingLevel: string
	editComment: Function
	session: ClientSession
	reply: boolean
	setReply: Function
}
