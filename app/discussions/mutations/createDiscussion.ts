import { resolver } from "blitz"
import db from "db"
import { CreateDiscussionSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(CreateDiscussionSchema),
	resolver.authorize(),
	async (input) => {
		const discussion = await db.discussion.create({ data: input })

		return discussion
	}
)
