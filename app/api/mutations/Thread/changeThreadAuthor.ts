import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const ChangeAuthor = z.object({
	id_: z.number(),
	authorId: z.string(),
})

export default resolver.pipe(
	resolver.zod(ChangeAuthor),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const thread = await db.thread.updateMany({ where: { id_ }, data })

		return thread
	}
)
