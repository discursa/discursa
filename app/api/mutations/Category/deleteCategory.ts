import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCategory = z.object({
	id_: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteCategory),
	resolver.authorize(),
	async ({ id_ }) => {
		const category = await db.category.deleteMany({ where: { id_ } })

    return category
	}
)
