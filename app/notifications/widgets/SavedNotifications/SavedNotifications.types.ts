import { NotificationType } from "app/notifications/types"

export interface SavedNotificationsWidgetProps {
	notifications: NotificationType[]
	nestingLevel: string
}
