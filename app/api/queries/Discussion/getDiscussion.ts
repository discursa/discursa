import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetDiscussion = z.object({
	id_: z.number().optional(),
})

export default resolver.pipe(
	resolver.zod(GetDiscussion),
	resolver.authorize(),
	async ({ id_ }) => {
		const discussion = await db.discussion.findFirst({ where: { id_ } })

		if (!discussion)
			throw new NotFoundError(
				"Discussion not found double check function arguments"
			)

		return discussion
	}
)
