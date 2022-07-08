import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
	name: z.string().optional(),
})

export default resolver.pipe(
	resolver.zod(GetUser),
	resolver.authorize(),
	async ({ name }) => {
		const user = await db.user.findFirst({
			where: {
				name,
			},
		})

		if (!user)
			throw new NotFoundError(
				"User not found, please check zod shema and func params"
			)

		return user
	}
)
