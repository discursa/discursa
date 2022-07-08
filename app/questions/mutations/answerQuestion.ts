import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { AnswerQuestionSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(AnswerQuestionSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
