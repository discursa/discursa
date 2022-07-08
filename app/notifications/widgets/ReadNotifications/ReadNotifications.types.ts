import { NotificationType } from "app/notifications/types"

export interface ReadNotificationsProps {
	notifications: NotificationType[]
	nestingLevel: string
}
