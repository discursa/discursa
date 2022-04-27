import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateNotification = z.object({
	id_: z.number(),
	type: z.string(),
})

export default resolver.pipe(
	resolver.zod(UpdateNotification),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const notification = await db.notification.update({ where: { id_ }, data })

		return notification
	}
)
