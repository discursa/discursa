import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateQuestion = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
	visibility: z.string(),
	authorId: z.string(),
	parent: z.number(),
})

export default resolver.pipe(
	resolver.zod(CreateQuestion),
	resolver.authorize(),
	async (input) => {
		const question = await db.question.create({ data: input })

		return question
	}
)
