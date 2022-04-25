import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteComment = z.object({
	id_: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteComment),
	resolver.authorize(),
	async ({ id_ }) => {
		const comment = await db.comment.deleteMany({ where: { id_ } })

		return comment
	}
)
