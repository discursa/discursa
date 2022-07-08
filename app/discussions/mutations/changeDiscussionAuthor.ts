import { resolver } from "blitz"
import db from "db"
import { ChangeDiscussionAuthorSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(ChangeDiscussionAuthorSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)
