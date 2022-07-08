import { resolver } from "blitz"
import db from "db"
import { BanDiscussionUserSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(BanDiscussionUserSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		await db.thread.updateMany({ where: { parent: id_ }, data })
		await db.question.updateMany({ where: { parent: id_ }, data })
		const discussion = await db.discussion.updateMany({ where: { id_ }, data })

		return discussion
	}
)
