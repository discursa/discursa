import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetDiscussionsInput
  extends Pick<
    Prisma.DiscussionFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDiscussionsInput) => {
    const {
      items: paginatedDiscussions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.discussion.count({ where }),
      query: (paginateArgs) =>
        db.discussion.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      paginatedDiscussions,
      nextPage,
      hasMore,
      count,
    }
  }
)
