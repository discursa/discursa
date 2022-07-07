import { NotFoundError, resolver } from "blitz"
import db from "db"
import { GetQuestionSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(GetQuestionSchema),
	resolver.authorize(),
	async ({ id_ }) => {
		const question = await db.question.findFirst({ where: { id_ } })

		if (!question)
			throw new NotFoundError("Question not found double check params")

		return question
	}
)
