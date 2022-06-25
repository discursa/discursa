import { ClientSession } from "blitz"
import { DiscussionType, QuestionType, ThreadType } from "../types"
import { typeGuard } from "./TypeGuard"

interface changesCheck {
	name: string
	initialName: string
}

export const check = {
	upvote(discussion: DiscussionType, session: ClientSession): boolean {
		return discussion.upvoters.some((vouter) => vouter === session.userId)
	},
	unvote(discussion: DiscussionType, session: ClientSession): boolean {
		return discussion.unvoters.some((vouter) => vouter === session.userId)
	},
	subscribe(discussion: DiscussionType, session: ClientSession): boolean {
		return discussion.subscribers.some(
			(subscriber) => subscriber === session.userId
		)
	},
	author(userId: string | null, authorId: string): boolean {
		return Boolean(userId === authorId)
	},
	admin(session: ClientSession): boolean {
		return Boolean(session.role === "ADMIN")
	},
	changes(arrayForCheck: changesCheck[]): boolean {
		return arrayForCheck.some((item) => item.name === item.initialName)
	},
	private(object: any): boolean {
		return Boolean(object.visibility === "Private")
	},
	public(object: any): boolean {
		return Boolean(object.visibility === "Public")
	},
	invitePermitions(object: any, session: ClientSession): boolean {
		if (
			check.private(object) &&
			typeGuard.isString(session.userId) &&
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
	): boolean {
		if (check.admin(session) && check.author(session.userId, object.authorId)) {
			return true
		} else {
			return false
		}
	},
	joined(
		object: DiscussionType | ThreadType | QuestionType,
		session: ClientSession
	): boolean {
		if (typeGuard.isString(session.userId)) {
			return Boolean(object.members?.includes(session.userId))
		} else {
			return false
		}
	},
}
