import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const ChangeAuthor = z.object({
	id_: z.number(),
	authorId: z.string(),
})

export default resolver.pipe(
	resolver.zod(ChangeAuthor),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
