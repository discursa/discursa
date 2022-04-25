import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateComment = z.object({
	id_: z.number(),
	name: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdateComment),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const comment = await db.comment.update({ where: { id_ }, data })

		return comment
	}
)
