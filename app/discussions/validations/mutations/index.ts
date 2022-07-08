import { z } from "zod"

const BanDiscussionUserSchema = z.object({
	id_: z.number(),
	banned: z.string().array(),
})

const ChangeDiscussionAuthorSchema = z.object({
	id_: z.number(),
	authorId: z.string(),
})

const CreateDiscussionSchema = z.object({
	id_: z.number(),
	name: z.string(),
	message: z.string(),
	category: z.string(),
	upvotes: z.number(),
	unvotes: z.number(),
	upvoters: z.string().array(),
	unvoters: z.string().array(),
	voting: z.boolean(),
	visibility: z.string(),
	members: z.string().array(),
	authorId: z.string(),
	banned: z.string().array(),
})

const DeleteDiscussionSchema = z.object({
	id_: z.number(),
})

const JoinDiscussionSchema = z.object({
	id_: z.number(),
	members: z.string().array(),
})

const SubscribeDiscussionSchema = z.object({
	id_: z.number(),
	subscribers: z.string().array(),
})

const UpdateDiscussionSchema = z.object({
	id_: z.number(),
	name: z.string(),
	message: z.string(),
	category: z.string(),
	visibility: z.string(),
})

const VoteDiscussionSchema = z.object({
	id_: z.number(),
	upvotes: z.number(),
	unvotes: z.number(),
	upvoters: z.string().array(),
	unvoters: z.string().array(),
})

export {
	BanDiscussionUserSchema,
	ChangeDiscussionAuthorSchema,
	CreateDiscussionSchema,
	DeleteDiscussionSchema,
	JoinDiscussionSchema,
	SubscribeDiscussionSchema,
	UpdateDiscussionSchema,
	VoteDiscussionSchema,
}
