import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const AnswerQuestion = z.object({
	id_: z.number(),
	answered: z.boolean(),
	answerId: z.string(),
})

export default resolver.pipe(
	resolver.zod(AnswerQuestion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
