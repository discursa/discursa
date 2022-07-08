import { resolver } from "blitz"
import db from "db"
import { ChangeNotificationTypeSchema } from "../validation"

export default resolver.pipe(
	resolver.zod(ChangeNotificationTypeSchema),
	resolver.authorize(),
	async ({ id_, ...data }) => {
		const notification = await db.notification.update({ where: { id_ }, data })

		return notification
	}
)
