import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetNotification = z.object({
	id_: z.number().optional(),
})

export default resolver.pipe(
	resolver.zod(GetNotification),
	resolver.authorize(),
	async ({ id_ }) => {
		const notification = await db.notification.findFirst({ where: { id_ } })

		if (!notification) throw new NotFoundError()

		return notification
	}
)
