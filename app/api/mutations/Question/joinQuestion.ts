import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const JoinQuestion = z.object({
	id_: z.number(),
	members: z.string().array(),
})

export default resolver.pipe(
	resolver.zod(JoinQuestion),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const question = await db.question.updateMany({ where: { id_ }, data })

		return question
	}
)
