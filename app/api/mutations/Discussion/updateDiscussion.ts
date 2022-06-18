import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateDiscussion = z.object({
	id_: z.number(),
	name: z.string(),
	message: z.string(),
	category: z.string(),
	visibility: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdateDiscussion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)
