import db from "db"
import { resolver } from "blitz"
import { z } from "zod"

const BanUser = z.object({
	id_: z.number(),
	banned: z.string().array(),
})

export default resolver.pipe(
	resolver.zod(BanUser),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		await db.thread.updateMany({ where: { parent: id_ }, data })
		await db.question.updateMany({ where: { parent: id_ }, data })
		const discussion = await db.discussion.updateMany({ where: { id_ }, data })

		return discussion
	}
)
