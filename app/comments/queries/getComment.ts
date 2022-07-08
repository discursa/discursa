import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetComment = z.object({
	id_: z.number().optional(),
})

export default resolver.pipe(
	resolver.zod(GetComment),
	resolver.authorize(),
	async ({ id_ }) => {
		const comment = await db.comment.findFirst({ where: { id_ } })

		if (!comment)
			throw new NotFoundError("Comment not found double check func arguments")

		return comment
	}
)
