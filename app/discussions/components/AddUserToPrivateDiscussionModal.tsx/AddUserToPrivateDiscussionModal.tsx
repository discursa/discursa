import { NotificationService } from "app/notifications/services"
import { getId } from "app/core/utils/functions"
import { useQuery } from "blitz"
import { FC, Fragment, useState } from "react"
import { AddUserForm } from "app/core/components"
import { AddUserToPrivateDiscussionModalProps } from "./AddUserToPrivateDiscussionModal.types"
import getUsers from "app/users/queries/getUsers"

interface Values {
	username: string
}

const notificationService = new NotificationService()

export const AddUserToPrivateDiscussionModal: FC<
	AddUserToPrivateDiscussionModalProps
> = (props) => {
	const { notifications, discussion, router } = props
	const [users] = useQuery(getUsers, {})
	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: Values) => {
		const invitedUser = users.find((user) => user.name === values.username)
		const notification = {
			id_: getId(notifications),
			name: `You are invited to ${discussion.name} discussion`,
			type: "inbox",
			description: `Greetings, your code is: ${discussion.id}`,
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
					User not found or user has already joined discussion
				</p>
			)}
		</Fragment>
	)
}
