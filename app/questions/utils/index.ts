import { DiscussionType } from "app/discussions"
import { QuestionType } from "../types"

const getDiscussionQuestions = (
	discussion: DiscussionType,
	questions: QuestionType[]
) => {
	const discussionQuestions = questions.filter((question) => {
		return question.parent === discussion.id_
	})

	return discussionQuestions
}

export { getDiscussionQuestions }
