import getUsers from "app/api/queries/User/getUsers"
import { NotificationService } from "app/api/services/Notification/Notification"
import { check } from "app/core/modules/Check"
import { DiscussionType, NotificationType } from "app/core/types"
import { getId } from "app/core/utils/functions"
import { BlitzRouter, ClientSession, useQuery } from "blitz"
import { FC, Fragment, useState } from "react"
import { AddUserForm } from "../../Form/children/AddUserForm"

interface AddUserToPrivateDiscussionModalProps {
	notifications: NotificationType[]
	discussion: DiscussionType
	router: BlitzRouter
	session: ClientSession
	nestingLevel: string
}

const notificationService = new NotificationService()

export const AddUserToPrivateDiscussionModal: FC<
	AddUserToPrivateDiscussionModalProps
> = (props) => {
	const { notifications, discussion, router, session, nestingLevel } = props
	const [users] = useQuery(getUsers, {})
	const [error, setError] = useState<boolean>(false)

	return (
		<Fragment>
			<AddUserForm
				className="w100 col g1"
				submitText="Invite"
				initialValues={{ name: "" }}
				onSubmit={async (values) => {
					const invitedUser = users.find(
						(user) => user.name === values.username
					)
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
