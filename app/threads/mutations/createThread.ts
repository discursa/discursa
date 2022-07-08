import { CreateThreadSchema } from "app/threads/validation"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(CreateThreadSchema),
	resolver.authorize(),
	async (input) => {
		const thread = await db.thread.create({ data: input })

		return thread
	}
)
