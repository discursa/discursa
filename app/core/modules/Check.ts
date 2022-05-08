import { ClientSession } from "blitz"
import { DiscussionType } from "../types"

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
	author(session: ClientSession, authorId: string) {
		return Boolean(session.userId === authorId)
	},
	admin(session: ClientSession) {
		return Boolean(session.role === "ADMIN")
	},
	changes(arrayForCheck: changesCheck[]) {
		return arrayForCheck.some((item) => item.name === item.inintialName)
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
			check.author(session, session.userId) &&
			check.admin(session)
		) {
			return true
		} else {
			return false
		}
	},
	editPermitions(session: ClientSession) {
		if (check.admin(session) && check.author(session, session.userId)) {
			return true
		} else {
			return false
		}
	},
}
