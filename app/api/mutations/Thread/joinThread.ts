import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const JoinThread = z.object({
	id_: z.number(),
	members: z.string().array(),
})

export default resolver.pipe(
	resolver.zod(JoinThread),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const thread = await db.thread.update({ where: { id_ }, data })

		return thread
	}
)
