import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateDiscussion = z.object({
  id_: z.number(),
  name: z.string(),
  message: z.string(),
  upvotes: z.number(),
  authorId: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateDiscussion),
  resolver.authorize(),
  async (input) => {
    const discussion = await db.discussion.create({ data: input })

    return discussion
  }
)
