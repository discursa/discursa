import { resolver } from "blitz"
import db from "db"
import { CreateQuestionSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(CreateQuestionSchema),
	resolver.authorize(),
	async (input) => {
		const question = await db.question.create({ data: input })

		return question
	}
)
