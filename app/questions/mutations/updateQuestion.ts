import { resolver } from "blitz"
import db from "db"
import { UpdateQuestionSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(UpdateQuestionSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
