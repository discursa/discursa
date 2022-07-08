import { z } from "zod"

const ChangeThreadAuthorSchema = z.object({
	id_: z.number(),
	authorId: z.string(),
})

const CreateThreadSchema = z.object({
	id_: z.number(),
	name: z.string(),
	message: z.string(),
	visibility: z.string(),
	members: z.string().array().optional(),
	parent: z.number(),
	authorId: z.string(),
})

const DeleteThreadSchema = z.object({
	id_: z.number(),
})

const JoinThreadSchema = z.object({
	id_: z.number(),
	members: z.string().array(),
})

const UpdateThreadSchema = z.object({
	id_: z.number(),
	name: z.string(),
	visibility: z.string(),
})

export {
	ChangeThreadAuthorSchema,
	CreateThreadSchema,
	DeleteThreadSchema,
	JoinThreadSchema,
	UpdateThreadSchema,
}
