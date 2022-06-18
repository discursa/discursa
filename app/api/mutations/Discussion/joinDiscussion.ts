import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const JoinDiscussion = z.object({
	id_: z.number(),
	members: z.any().array(),
})

export default resolver.pipe(
	resolver.zod(JoinDiscussion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)
