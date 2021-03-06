import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCommentsInput
	extends Pick<
		Prisma.CommentFindManyArgs,
		"where" | "orderBy" | "skip" | "take"
	> {}

export default resolver.pipe(
	resolver.authorize(),
	async ({ where, orderBy, skip = 0, take = 100 }: GetCommentsInput) => {
		const {
			items: paginatedComments,
			hasMore,
			nextPage,
			count,
		} = await paginate({
			skip,
			take,
			count: () => db.comment.count({ where }),
			query: (paginateArgs) =>
				db.comment.findMany({ ...paginateArgs, where, orderBy }),
		})

		return {
			paginatedComments,
			nextPage,
			hasMore,
			count,
		}
	}
)
