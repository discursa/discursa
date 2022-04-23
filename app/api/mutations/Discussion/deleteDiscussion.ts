import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteDiscussion = z.object({
  id_: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteDiscussion),
  resolver.authorize(),
  async ({ id_ }) => {
    const discussion = await db.discussion.deleteMany({ where: { id_ } })

    return discussion
  }
)
