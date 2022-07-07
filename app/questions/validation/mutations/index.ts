import { z } from "zod"

const AnswerQuestionSchema = z.object({
	id_: z.number(),
	answered: z.boolean(),
	answerId: z.string(),
})

const ChangeQuestionAuthorSchema = z.object({
	id_: z.number(),
	authorId: z.string(),
})

const CreateQuestionSchema = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: z.string(),
	members: z.string().array(),
	authorId: z.string(),
	parent: z.number(),
})

const DeleteQuestionSchema = z.object({
	id_: z.number(),
})

const JoinQuestionSchema = z.object({
	id_: z.number(),
	members: z.string().array(),
})

const UpdateQuestionSchema = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: z.string(),
})

export {
	AnswerQuestionSchema,
	ChangeQuestionAuthorSchema,
	CreateQuestionSchema,
	DeleteQuestionSchema,
	JoinQuestionSchema,
	UpdateQuestionSchema,
}
