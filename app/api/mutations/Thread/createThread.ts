import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateThread = z.object({
	id_: z.number(),
	name: z.string(),
	visibility: z.string(),
	members: z.string().array().optional(),
	parent: z.number(),
	authorId: z.string(),
})

export default resolver.pipe(
	resolver.zod(CreateThread),
	resolver.authorize(),
	async (input) => {
		const thread = await db.thread.create({ data: input })

		return thread
	}
)
