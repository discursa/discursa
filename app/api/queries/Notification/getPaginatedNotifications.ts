import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetNotificationsInput
	extends Pick<
		Prisma.NotificationFindManyArgs,
		"where" | "orderBy" | "skip" | "take"
	> {}

export default resolver.pipe(
	resolver.authorize(),
	async ({ where, orderBy, skip = 0, take = 100 }: GetNotificationsInput) => {
		const {
			items: paginatedNotifications,
			hasMore,
			nextPage,
			count,
		} = await paginate({
			skip,
			take,
			count: () => db.notification.count({ where }),
			query: (paginateArgs) =>
				db.notification.findMany({ ...paginateArgs, where, orderBy }),
		})

		return {
			paginatedNotifications,
			nextPage,
			hasMore,
			count,
		}
	}
)
