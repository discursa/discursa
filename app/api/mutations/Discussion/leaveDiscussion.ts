import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const LeaveDiscussion = z.object({
	id_: z.number(),
	members: z.string().array(),
})

export default resolver.pipe(
	resolver.zod(LeaveDiscussion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)