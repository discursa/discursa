import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteNotification = z.object({
	id_: z.number(),
})

export default resolver.pipe(
	resolver.zod(DeleteNotification),
	resolver.authorize(),
	async ({ id_ }) => {
		const notification = await db.notification.deleteMany({ where: { id_ } })

		return notification
	}
)
