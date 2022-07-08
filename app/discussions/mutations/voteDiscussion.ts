import { resolver } from "blitz"
import db from "db"
import { z } from "zod"
import { VoteDiscussionSchema } from "../validations"

export default resolver.pipe(
	resolver.zod(VoteDiscussionSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const discussion = await db.discussion.update({ where: { id_ }, data })

		return discussion
	}
)
