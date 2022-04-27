import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCategory = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
})

export default resolver.pipe(
	resolver.zod(CreateCategory),
	resolver.authorize(),
	async (input) => {
		const category = await db.category.create({ data: input })

		return category
	}
)
