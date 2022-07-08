import { NotFoundError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
	const notifications = await db.notification.findMany()

	if (!notifications) throw new NotFoundError("Notifications not found")

	return notifications
})
