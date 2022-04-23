import { NotFoundError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const GetUser = z.object({
  id: z.string(),
})

export default resolver.pipe(
  resolver.zod(GetUser),
  resolver.authorize(),
  async ({ id }) => {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    })

    if (!user)
      throw new NotFoundError(
        "User not found, please check zod shema and func params"
      )

    return user
  }
)
