import { resolver } from "blitz"
import db from "db"
import { JoinDiscussionSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(JoinDiscussionSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)
