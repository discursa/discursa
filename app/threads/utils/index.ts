import { typeGuard } from "app/core/modules/TypeGuard"
import { DiscussionType } from "app/discussions"
import { ClientSession } from "blitz"
import { ThreadType } from "../types"

const getDiscussionThreads = (
	threads: ThreadType[],
	discussion: DiscussionType
) => {
	const discussionThreads = threads.filter((thread) => {
		return thread.parent === discussion.id_
	})

	return discussionThreads
}

const getPrivateDisccussionThreads = (
	threads: ThreadType[],
	discussion: DiscussionType
) => {
	const discusionThreads = getDiscussionThreads(threads, discussion)

	const privateDiscussionThreads = discusionThreads.filter((thread) => {
		return thread.visibility === "private"
	})

	return privateDiscussionThreads
}

const getUserPrivateThreads = (
	threads: ThreadType[],
	discussion: DiscussionType,
	session: ClientSession
) => {
	const privateDiscussionThreads = getPrivateDisccussionThreads(
		threads,
		discussion
	)

	const userPrivateThreads = privateDiscussionThreads.filter((thread) => {
		if (typeGuard.isString(session.userId)) {
			return thread.members.includes(session.userId)
		}
	})

	return userPrivateThreads
}

const getThreadById = (threads: ThreadType[], id: string) => {
	const thread = threads.find((thread) => {
		return thread.id === id
	})

	return thread
}

export {
	getDiscussionThreads,
	getPrivateDisccussionThreads,
	getUserPrivateThreads,
	getThreadById,
}
