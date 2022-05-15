import { NotFoundError, resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
	const users = await db.user.findMany()

	if (!users) throw new NotFoundError("Users not found, check your db model")

	return users
})
