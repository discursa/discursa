import getUsers from "app/api/queries/User/getUsers"
import { NotificationService } from "app/api/services/Notification/Notification"
import { NotificationType, ThreadType } from "app/core/types"
import { getId } from "app/core/utils/functions"
import { BlitzRouter, useQuery } from "blitz"
import { FC, Fragment, useState } from "react"
import { AddUserForm } from "../../Form/children/AddUserForm"

interface AddUserToUSerThreadModalProps {
	notifications: NotificationType[]
	thread: ThreadType
	router: BlitzRouter
}

interface Values {
	username: string
}

const notificationService = new NotificationService()

export const AddUserToUSerThreadModal: FC<AddUserToUSerThreadModalProps> = (
	props
) => {
	const { notifications, thread, router } = props
	const [users] = useQuery(getUsers, {})
	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: Values) => {
		const invitedUser = users.find((user) => {
			return user.name === values.username
		})

		const notification = {
			id_: getId(notifications),
			name: `You are invited to ${thread.name} discussion`,
			type: "inbox",
			description: `Greetings, your code is: ${thread.id}`,
			recipient: invitedUser?.id,
		}

		if (invitedUser !== undefined) {
			setError(false)
			await notificationService.create(notification, router)
		} else {
			setError(true)
		}
	}

	return (
		<Fragment>
			<AddUserForm
				className="w100 col g1"
				submitText="Invite"
				initialValues={{ username: "" }}
				onSubmit={async (values) => {
					await submitRequest(values)
				}}
			/>
			{error && (
				<p className="red top-space-sm">
					User not found or user has already joined thread
				</p>
			)}
		</Fragment>
	)
}
