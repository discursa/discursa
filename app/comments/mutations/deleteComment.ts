import { resolver } from "blitz"
import db from "db"
import { DeleteCommentSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(DeleteCommentSchema),
	resolver.authorize(),
	async ({ id_ }) => {
		await db.comment.deleteMany({ where: { replierId: id_ } })
		const comment = await db.comment.deleteMany({ where: { id_ } })

		return comment
	}
)
