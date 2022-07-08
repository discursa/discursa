import { NotificationService } from "app/notifications/services"
import { AddUserForm } from "app/core/components"
import { getId } from "app/core/utils/functions"
import { useQuery } from "blitz"
import { FC, Fragment, useState } from "react"
import {
	AddUserToUserThreadModalProps,
	Values,
} from "./AddUserToPrivateThreadModal.types"
import getUsers from "app/users/queries/getUsers"

const notificationService = new NotificationService()

export const AddUserToUserThreadModal: FC<AddUserToUserThreadModalProps> = (
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
