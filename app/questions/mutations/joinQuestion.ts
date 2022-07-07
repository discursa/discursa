import { resolver } from "blitz"
import db from "db"
import { JoinQuestionSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(JoinQuestionSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
