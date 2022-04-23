import { NotFoundError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
  const discussions = await db.discussion.findMany()

  if (!discussions) throw new NotFoundError("Discussions not found")

  return discussions
})
