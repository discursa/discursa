import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetThread = z.object({
	id_: z.number().optional(),
})

export default resolver.pipe(
	resolver.zod(GetThread),
	resolver.authorize(),
	async ({ id_ }) => {
		const thread = await db.thread.findFirst({ where: { id_ } })

		if (!thread)
			throw new NotFoundError("Thread not found, double check fun params")

		return thread
	}
)
