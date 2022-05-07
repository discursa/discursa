import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateThread = z.object({
	id_: z.number(),
	name: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdateThread),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const thread = await db.thread.update({ where: { id_ }, data })

		return thread
	}
)
