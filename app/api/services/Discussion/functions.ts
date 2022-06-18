import { check } from "app/core/modules/Check"
import { CommentType, DiscussionType } from "app/core/types"
import { ClientSession } from "blitz"

const getPrivateDiscussions = (discussions: DiscussionType[]) => {
	const privateDiscussions = discussions.filter((discussion) => {
		return check.private(discussion)
	})

	return privateDiscussions
}

const getPublicDiscussions = (discussions: DiscussionType[]) => {
	const publicDiscussions = discussions.filter((discussion) => {
		return check.public(discussion)
	})

	return publicDiscussions
}

const getUserPrivateDiscussions = (
	discussions: DiscussionType[],
	session: ClientSession
) => {
	const privateDiscussions = getPrivateDiscussions(discussions)

	const userPrivateDiscussions = privateDiscussions.filter((discussions) => {
		// @ts-ignore
		return discussions.members.includes(session.userId)
	})

	return userPrivateDiscussions
}

const getDiscussionById = (discussions: DiscussionType[], id: string) => {
	const discussion = discussions.find((discussion) => {
		return discussion.id === id
	})

	return discussion
}

const getDiscussionCommentsLength = (
	discussion: DiscussionType,
	comments: CommentType[]
) => {
	const discussionGeneralComments = comments.filter((comment) => {
		return comment.parent === discussion.id_ && comment.type === "discussion"
	})

	const discussionThreadsComments = comments.filter((comment) => {
		return comment.grandParent === discussion.id_ && comment.type === "thread"
	})

	const discussionComments = [
		...discussionGeneralComments,
		...discussionThreadsComments,
	]

	return discussionComments.length
}

export {
	getPrivateDiscussions,
	getPublicDiscussions,
	getUserPrivateDiscussions,
	getDiscussionById,
	getDiscussionCommentsLength,
}
