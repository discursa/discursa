import { resolver } from "blitz"
import db from "db"
import { UpdateCommentSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(UpdateCommentSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const comment = await db.comment.update({ where: { id_ }, data })

		return comment
	}
)
