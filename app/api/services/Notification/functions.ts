import { NotificationType } from "app/core/types"
import { ClientSession } from "blitz"

const getUserNotifications = (
	notifications: NotificationType[],
	session: ClientSession
) => {
	const userNotifications = notifications.filter((notification) => {
		return notification.recipient === session.userId
	})

	return userNotifications
}

const getUserInboxNotifications = (
	notifications: NotificationType[],
	session: ClientSession
) => {
	const userNotifications = getUserNotifications(notifications, session)

	const userInboxNotifications = userNotifications.filter((notification) => {
		return notification.type === "inbox"
	})

	return userInboxNotifications
}

const getUserSavedNotifications = (
	notifications: NotificationType[],
	session: ClientSession
) => {
	const userNotifications = getUserNotifications(notifications, session)

	const userSavedNotifications = userNotifications.filter((notification) => {
		return notification.type === "saved"
	})

	return userSavedNotifications
}

const getUserReadNotifications = (
	notifications: NotificationType[],
	session: ClientSession
) => {
	const userNotifications = getUserInboxNotifications(notifications, session)

	const userReadNotifcations = userNotifications.filter((notification) => {
		return notification.type === "read"
	})

	return userReadNotifcations
}

export {
	getUserNotifications,
	getUserInboxNotifications,
	getUserSavedNotifications,
	getUserReadNotifications,
}
