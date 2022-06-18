import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteQuestion = z.object({
	id_: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteQuestion),
	resolver.authorize(),
	async ({ id_ }) => {
		await db.comment.deleteMany({ where: { type: "question", parent: id_ } })
		const question = await db.question.deleteMany({ where: { id_ } })

		return question
	}
)
