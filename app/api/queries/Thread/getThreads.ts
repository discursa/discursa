import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.authorize(), async () => {
	const threads = await db.thread.findMany()

	if (!threads) throw new NotFoundError("Threads not found")

	return threads
})
