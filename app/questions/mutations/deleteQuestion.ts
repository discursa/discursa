import { resolver } from "blitz"
import db from "db"
import { DeleteQuestionSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(DeleteQuestionSchema),
	resolver.authorize(),
	async ({ id_ }) => {
		await db.comment.deleteMany({ where: { type: "question", parent: id_ } })
		const question = await db.question.deleteMany({ where: { id_ } })

		return question
	}
)
