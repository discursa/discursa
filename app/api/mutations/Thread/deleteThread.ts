import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteThread = z.object({
	id_: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteThread),
	resolver.authorize(),
	async ({ id_ }) => {
		await db.comment.deleteMany({
			where: {
				type: "discussion",
				parent: id_,
			},
		})
		const thread = await db.thread.deleteMany({ where: { id_ } })

		return thread
	}
)
