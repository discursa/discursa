import { resolver, NotFoundError } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
	const comments = await db.comment.findMany()

	if (!comments) throw new NotFoundError("Comment not found")

	return comments
})
