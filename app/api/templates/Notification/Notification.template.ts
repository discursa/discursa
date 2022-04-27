import { NotificationService } from "app/api/services/Notification/Notification"
import { DiscussionType, NotificationType } from "app/core/types"
import { getId } from "app/core/utils/functions"
import { BlitzRouter } from "blitz"

const notificationService = new NotificationService()

export const notificationTemplate = {
	async discussionSubscription(
		discussion: DiscussionType,
		notifications: NotificationType[],
		router: BlitzRouter
	) {
		const { name, subscribers } = discussion

		const template = {
			id_: getId(notifications),
			name: `Thanks for subscription on ${name} discusison`,
			description: `Congrats, now you're subscribing ${name} discussion, you will get activity notifications, if you won't get them? please unsubscribe `,
			type: "inbox",
			// @ts-ignore
			recipients: Array.from(subscribers[subscribers.length - 1]),
		}

		await notificationService.create(template, router)
	},
	newComment() {},
}
