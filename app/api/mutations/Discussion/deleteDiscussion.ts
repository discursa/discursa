import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteDiscussion = z.object({
	id_: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteDiscussion),
	resolver.authorize(),
	async ({ id_ }) => {
		await db.comment.deleteMany({ where: { parent: id_, type: "discussion" } })
		await db.comment.deleteMany({ where: { grandParent: id_, type: "thread" } })
		await db.thread.deleteMany({ where: { parent: id_ } })
		const discussion = await db.discussion.deleteMany({ where: { id_ } })

		return discussion
	}
)
