import { DiscussionType, QuestionType } from "app/core/types"

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
