import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateComment = z.object({
	id_: z.number(),
	message: z.string(),
	parent: z.number(),
	replierId: z.string(),
	authorId: z.string(),
})

export default resolver.pipe(
	resolver.zod(CreateComment),
	resolver.authorize(),
	async (input) => {
		const comment = await db.comment.create({ data: input })

		return comment
	}
)
