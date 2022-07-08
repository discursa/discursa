import { message, name } from "app/core/utils/validation"
import { z } from "zod"
import {
	BanDiscussionUserSchema,
	ChangeDiscussionAuthorSchema,
	CreateDiscussionSchema,
	DeleteDiscussionSchema,
	JoinDiscussionSchema,
	SubscribeDiscussionSchema,
	UpdateDiscussionSchema,
	VoteDiscussionSchema,
} from "./mutations"
import { GetDiscussionSchema } from "./queries"

const DiscussionSchema = z.object({
	name,
	category: z.string(),
	message,
	visibility: z.string(),
	voting: z.boolean(),
})

export {
	GetDiscussionSchema,
	DiscussionSchema,
	BanDiscussionUserSchema,
	ChangeDiscussionAuthorSchema,
	CreateDiscussionSchema,
	DeleteDiscussionSchema,
	JoinDiscussionSchema,
	SubscribeDiscussionSchema,
	UpdateDiscussionSchema,
	VoteDiscussionSchema,
}
