import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(UpdateCategory),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const category = await db.category.update({ where: { id_ }, data })

		return category
	}
)
