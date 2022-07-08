import { ChangeThreadAuthorSchema } from "app/threads/validation"
import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(
	resolver.zod(ChangeThreadAuthorSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const thread = await db.thread.updateMany({ where: { id_ }, data })

		return thread
	}
)
