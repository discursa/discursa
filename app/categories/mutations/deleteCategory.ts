import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(DeleteCategory),
	resolver.authorize(),
	async ({ id_ }) => {
		const category = await db.category.deleteMany({ where: { id_ } })

		return category
	}
)
