import { boolean } from "zod"
import { CommentType, DiscussionType, QuestionType, ThreadType } from "../types"

export const typeGuard = {
	isString(item: any): item is string {
		return typeof item === "string"
	},
	isNumber(item: any): item is number {
		return typeof item === "number"
	},
	isThread(item: any): item is ThreadType {
		const thread = item as ThreadType

		return Boolean(thread)
	},
	isQuestion(item: any): item is QuestionType {
		const question = item as QuestionType

		return Boolean(question)
	},
	isDiscussion(item: any): item is DiscussionType {
		const discussion = item as DiscussionType

		return Boolean(discussion)
	},
	isComment(item: any): item is CommentType {
		const comment = item as CommentType

		return Boolean(comment)
	},
}
