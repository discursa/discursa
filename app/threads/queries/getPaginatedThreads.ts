import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetThreadsInput
	extends Pick<
		Prisma.ThreadFindManyArgs,
		"where" | "orderBy" | "skip" | "take"
	> {}

export default resolver.pipe(
	resolver.authorize(),
	async ({ where, orderBy, skip = 0, take = 100 }: GetThreadsInput) => {
		const {
			items: paginatedThreads,
			hasMore,
			nextPage,
			count,
		} = await paginate({
			skip,
			take,
			count: () => db.thread.count({ where }),
			query: (paginateArgs) =>
				db.thread.findMany({ ...paginateArgs, where, orderBy }),
		})

		return {
			paginatedThreads,
			nextPage,
			hasMore,
			count,
		}
	}
)
