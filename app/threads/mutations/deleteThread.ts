import { DeleteThreadSchema } from "app/threads/validation"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(DeleteThreadSchema),
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
