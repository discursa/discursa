import { resolver } from "blitz"
import db from "db"

export default resolver.pipe(resolver.authorize(), async () => {
	const questions = await db.question.findMany()

	return questions
})
