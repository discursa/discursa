import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const VoteDiscussion = z.object({
	id_: z.number(),
	upvotes: z.number(),
	unvotes: z.number(),
	upvoters: z.string().array(),
	unvoters: z.string().array(),
})

export default resolver.pipe(
	resolver.zod(VoteDiscussion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)
