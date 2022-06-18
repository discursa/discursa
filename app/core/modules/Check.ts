import { ClientSession } from "blitz"
import { DiscussionType, QuestionType, ThreadType } from "../types"

interface changesCheck {
	name: string
	initialName: string
}

export const check = {
	upvote(discussion: DiscussionType, session: ClientSession) {
		return discussion.vouters.some((vouter) => vouter === session.userId)
	},
	subscribe(discussion: DiscussionType, session: ClientSession) {
		return discussion.subscribers.some(
			(subscriber) => subscriber === session.userId
		)
	},
	author(userId: string | null, authorId: string) {
		return Boolean(userId === authorId)
	},
	admin(session: ClientSession) {
		return Boolean(session.role === "ADMIN")
	},
	changes(arrayForCheck: changesCheck[]) {
		return arrayForCheck.some((item) => item.name === item.initialName)
	},
	private(object: any) {
		return Boolean(object.visibility === "Private")
	},
	public(object: any) {
		return Boolean(object.visibility === "Public")
	},
	invitePermitions(object: any, session: ClientSession) {
		if (
			check.private(object) &&
			// @ts-ignore
			check.author(session.userId, object.authorId) &&
			check.admin(session)
		) {
			return true
		} else {
			return false
		}
	},
	editPermitions(
		session: ClientSession,
		object: DiscussionType | ThreadType | QuestionType
	) {
		if (check.admin(session) && check.author(session.userId, object.authorId)) {
			return true
		} else {
			return false
		}
	},
	joined(
		object: DiscussionType | ThreadType | QuestionType,
		session: ClientSession
	) {
		// @ts-ignore
		return Boolean(object.members?.includes(session.userId))
	},
}
