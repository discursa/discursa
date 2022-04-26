import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateNotification = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
	type: z.string(),
	recipient: z.string(),
})

export default resolver.pipe(
	resolver.zod(CreateNotification),
	resolver.authorize(),
	async (input) => {
		const notification = await db.notification.create({ data: input })

		return notification
	}
)
