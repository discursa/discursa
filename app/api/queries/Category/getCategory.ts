import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCategory = z.object({
	id_: z.number().optional(),
})

export default resolver.pipe(
	resolver.zod(GetCategory),
	resolver.authorize(),
	async ({ id_ }) => {
		const comment = await db.category.findFirst({ where: { id_ } })

		if (!comment)
			throw new NotFoundError("Category not found double check func arguments")

		return comment
	}
)
