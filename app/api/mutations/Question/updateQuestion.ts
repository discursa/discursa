import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateQuestion = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdateQuestion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
