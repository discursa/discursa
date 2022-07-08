import { resolver } from "blitz"
import db from "db"
import { DeleteNotificationSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(DeleteNotificationSchema),
	resolver.authorize(),
	async ({ id_ }) => {
		const notification = await db.notification.deleteMany({ where: { id_ } })

		return notification
	}
)
