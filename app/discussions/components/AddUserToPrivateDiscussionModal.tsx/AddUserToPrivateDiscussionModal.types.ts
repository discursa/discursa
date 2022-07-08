import { NotificationType } from "app/core/types"
import { DiscussionType } from "app/discussions/types"
import { BlitzRouter } from "blitz"

export interface AddUserToPrivateDiscussionModalProps {
	notifications: NotificationType[]
	discussion: DiscussionType
	router: BlitzRouter
}
