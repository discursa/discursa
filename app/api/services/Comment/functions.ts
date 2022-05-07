import { CommentType, DiscussionType, ThreadType } from "app/core/types"

export const getNoRepliedComments = (comments: CommentType[]) => {
	const noRepliedComments = comments.filter((comment) => {
		return comment.replierId === ""
	})

	return noRepliedComments
}

export const getAllDiscussionsComments = (comments: CommentType[]) => {
	const noRepliedComments = getNoRepliedComments(comments)

	const allDiscussionsComments = noRepliedComments.filter((comment) => {
		return comment.type === "discussion"
	})

	return allDiscussionsComments
}

export const getDiscussionComments = (
	comments: CommentType[],
	discussion: DiscussionType
) => {
	const allDiscussionsComments = getAllDiscussionsComments(comments)

	const discussionComments = allDiscussionsComments.filter((comment) => {
		return comment.parent === discussion.id_
	})

	return discussionComments
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
