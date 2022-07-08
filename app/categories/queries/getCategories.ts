import { NotFoundError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
	const categories = await db.category.findMany()

	if (!categories) throw new NotFoundError("Categories not found")

	return categories
})
