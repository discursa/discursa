import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(CreateCategory),
	resolver.authorize(),
	async (input) => {
		const category = await db.category.create({ data: input })

		return category
	}
)
