import { DiscussionType, ThreadType } from "app/core/types"
import { ClientSession } from "blitz"

export const getDiscussionThreads = (
	threads: ThreadType[],
	discussion: DiscussionType
) => {
	const discussionThreads = threads.filter((thread) => {
		return thread.parent === discussion.id_
	})

	return discussionThreads
}

export const getPrivateDisccussionThreads = (
	threads: ThreadType[],
	discussion: DiscussionType
) => {
	const discusionThreads = getDiscussionThreads(threads, discussion)

	const privateDiscussionThreads = discusionThreads.filter((thread) => {
		return thread.visibility === "private"
	})

	return privateDiscussionThreads
}

export const getUserPrivateThreads = (
	threads: ThreadType[],
	discussion: DiscussionType,
	session: ClientSession
) => {
	const privateDiscussionThreads = getPrivateDisccussionThreads(
		threads,
		discussion
	)

	const userPrivateThreads = privateDiscussionThreads.filter((thread) => {
		// @ts-ignore
		return thread.members?.includes(session.userId)
	})

	return userPrivateThreads
}

export const getThreadById = (threads: ThreadType[], id: string) => {
	const thread = threads.find((thread) => {
		return thread.id === id
	})

	return thread
}
