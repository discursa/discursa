import { CommentType, QuestionType, ThreadType } from "app/core/types"

export const getNoRepliedComments = (comments: CommentType[]) => {
	const noRepliedComments = comments.filter((comment) => {
		return comment.replierId === null
	})

	return noRepliedComments
}

export const getAllThreadsComments = (comments: CommentType[]) => {
	const noRepliedComments = getNoRepliedComments(comments)

	const allThreadsComments = noRepliedComments.filter((comment) => {
		return comment.type === "thread"
	})

	return allThreadsComments
}

export const getThreadComments = (
	comments: CommentType[],
	thread: ThreadType
) => {
	const allThredComments = getAllThreadsComments(comments)

	const threadComments = allThredComments.filter((comment) => {
		return comment.parent === thread.id_
	})

	return threadComments
}

const getAllQuestionComments = (comments: CommentType[]) => {
	const noRepliedComments = getNoRepliedComments(comments)

	const allQuestionComments = noRepliedComments.filter((comment) => {
		return comment.type === "question"
	})

	return allQuestionComments
}

export const getQuestionComments = (
	comments: CommentType[],
	question: QuestionType
) => {
	const allQuestionComments = getAllQuestionComments(comments)

	const questionComments = allQuestionComments.filter((comment) => {
		return comment.parent === question.id_
	})

	return questionComments
}
