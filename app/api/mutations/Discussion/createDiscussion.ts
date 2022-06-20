import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDiscussion = z.object({
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

export default resolver.pipe(
	resolver.zod(CreateDiscussion),
	resolver.authorize(),
	async (input) => {
		const discussion = await db.discussion.create({ data: input })

		return discussion
	}
)
