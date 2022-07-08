import { GetThreadSchema } from "app/threads/validation"
import { NotFoundError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(GetThreadSchema),
	resolver.authorize(),
	async ({ id_ }) => {
		const thread = await db.thread.findFirst({ where: { id_ } })

		if (!thread)
			throw new NotFoundError("Thread not found, double check fun params")

		return thread
	}
)
