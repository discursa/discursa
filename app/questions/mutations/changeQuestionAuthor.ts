import { resolver } from "blitz"
import db from "db"
import { ChangeQuestionAuthorSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(ChangeQuestionAuthorSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
