import { resolver } from "blitz"
import db from "db"
import { CreateCommentSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(CreateCommentSchema),
	resolver.authorize(),
	async (input) => {
		const comment = await db.comment.create({ data: input })

		return comment
	}
)
