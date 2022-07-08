import { resolver } from "blitz"
import db from "db"
import { CreateNotificationSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(CreateNotificationSchema),
	resolver.authorize(),
	async (input) => {
		const notification = await db.notification.create({ data: input })

		return notification
	}
)
