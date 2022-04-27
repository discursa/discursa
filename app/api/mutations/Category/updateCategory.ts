import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCategory = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdateCategory),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const category = await db.category.update({ where: { id_ }, data })

		return category
	}
)
