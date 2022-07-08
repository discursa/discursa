import { resolver } from "blitz"
import db from "db"
import { DeleteDiscussionSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(DeleteDiscussionSchema),
	resolver.authorize(),
	async ({ id_ }) => {
		await db.comment.deleteMany({ where: { grandParent: id_, type: "thread" } })
		await db.comment.deleteMany({
			where: { grandParent: id_, type: "question" },
		})
		await db.question.deleteMany({ where: { parent: id_ } })
		await db.thread.deleteMany({ where: { parent: id_ } })
		const discussion = await db.discussion.deleteMany({ where: { id_ } })

		return discussion
	}
)
