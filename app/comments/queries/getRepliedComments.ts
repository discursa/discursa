import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetRepliedComments = z.object({
	replierId: z.number(),
})

export default resolver.pipe(
	resolver.zod(GetRepliedComments),
	resolver.authorize(),
	async ({ replierId }) => {
		const repliedComments = await db.comment.findMany({
			where: {
				replierId,
			},
		})

		if (!repliedComments) throw new NotFoundError("Comments not found")

		return repliedComments
	}
)
