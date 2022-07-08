import { UpdateThreadSchema } from "app/threads/validation"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(UpdateThreadSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const thread = await db.thread.update({ where: { id_ }, data })

		return thread
	}
)
