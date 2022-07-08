import { z } from "zod"

const CreateCommentSchema = z.object({
	id_: z.number(),
	message: z.string(),
	parent: z.number(),
	grandParent: z.number(),
	replierId: z.number().nullable(),
	authorId: z.string(),
	type: z.string(),
})

const DeleteCommentSchema = z.object({
	id_: z.number(),
})

const ReplyCommentSchema = z.object({
	id_: z.number(),
	replies: z.string().array(),
})

const UpdateCommentSchema = z.object({
	id_: z.number(),
	name: z.string(),
})

export {
	CreateCommentSchema,
	DeleteCommentSchema,
	ReplyCommentSchema,
	UpdateCommentSchema,
}
