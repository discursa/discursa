import { check } from "app/core/modules/Check"
import { DiscussionType } from "app/core/types"
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

export {
	getPrivateDiscussions,
	getPublicDiscussions,
	getUserPrivateDiscussions,
	getDiscussionById,
}
