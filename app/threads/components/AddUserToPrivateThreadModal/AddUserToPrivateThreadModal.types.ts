import { NotificationType } from "app/core/types"
import { ThreadType } from "app/threads/types"
import { BlitzRouter } from "blitz"

interface AddUserToUserThreadModalProps {
	notifications: NotificationType[]
	thread: ThreadType
	router: BlitzRouter
}

interface Values {
	username: string
}

export type { AddUserToUserThreadModalProps, Values }
