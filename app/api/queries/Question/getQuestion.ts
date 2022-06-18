import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetQuestion = z.object({
	id_: z.number().optional(),
})

export default resolver.pipe(
	resolver.zod(GetQuestion),
	resolver.authorize(),
	async ({ id_ }) => {
		const question = await db.question.findFirst({ where: { id_ } })

		if (!question)
			throw new NotFoundError("Question not found double check params")

		return question
	}
)
