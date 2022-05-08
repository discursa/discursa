import getUsers from "app/api/queries/User/getUsers"
import { NotificationService } from "app/api/services/Notification/Notification"
import { DiscussionType, NotificationType } from "app/core/types"
import { getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { BlitzRouter, useQuery } from "blitz"
import { FC, Fragment, useState } from "react"
import { Alert } from "../../Alert/Alert"
import { AddUserForm } from "../../Form/children/AddUserForm"

interface AddUserToPrivateDiscussionModalProps {
	notifications: NotificationType[]
	discussion: DiscussionType
	router: BlitzRouter
	nestingLevel: string
}

const notificationService = new NotificationService()

export const AddUserToPrivateDiscussionModal: FC<
	AddUserToPrivateDiscussionModalProps
> = (props) => {
	const { notifications, discussion, router, nestingLevel } = props
	const [users] = useQuery(getUsers, {})
	const [error, setError] = useState<boolean>(false)

	return (
		<Fragment>
			<AddUserForm
				className="w100 col g1"
				submitText="Invite"
				initialValues={{ name: "" }}
				onSubmit={async (values) => {
					const invitedUser = users.find((user) => user.name === values.name)
					const notification = {
						id_: getId(notifications),
						name: `You are invited to ${discussion.name} discussion`,
						type: "inbox",
						description: "Greetings",
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
			{!error && (
				<Alert
					variant="warning"
					message="User not found"
					toast={true}
					nestingLevel={nestingLevel}
					iconHref={icons.warning}
				/>
			)}
		</Fragment>
	)
}
