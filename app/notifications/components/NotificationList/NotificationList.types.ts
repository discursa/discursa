import { NotificationType } from "app/core/types"

interface NotificationsSimpleListProps {
	notifications: NotificationType[]
	nestingLevel: string
}

interface NotificationsSeachListProps extends NotificationsSimpleListProps {
	resetValue: Function
}

interface NotificationListProps extends NotificationsSeachListProps {
	search: boolean
	query: string
}

export type {
	NotificationListProps,
	NotificationsSimpleListProps,
	NotificationsSeachListProps,
}
