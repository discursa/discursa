import { NotificationType } from "app/notifications/types"

export interface InboxProps {
	notifications: NotificationType[]
	nestingLevel: string
}
