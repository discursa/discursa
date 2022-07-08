import { JoinThreadSchema } from "app/threads/validation"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(JoinThreadSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const thread = await db.thread.update({ where: { id_ }, data })

		return thread
	}
)
