import { message } from "app/core/utils/validation"
import { z } from "zod"
import {
	CreateCommentSchema,
	DeleteCommentSchema,
	ReplyCommentSchema,
	UpdateCommentSchema,
} from "./mutations"
import { GetCommentSchema } from "./queries"

const CommentSchema = z.object({
	message,
})

export {
	CreateCommentSchema,
	DeleteCommentSchema,
	ReplyCommentSchema,
	UpdateCommentSchema,
	GetCommentSchema,
	CommentSchema,
}
