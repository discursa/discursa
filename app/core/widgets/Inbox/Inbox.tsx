import { getUserInboxNotifications } from "app/api/services/functions"
import { Button, ButtonGroup } from "app/core/components"
import { NotificationList } from "app/core/components/NotificationList/NotificationList"
import { NotificationType } from "app/core/types"
import { changeValue, resetValue } from "app/core/utils/functions"
import { useSession } from "blitz"
import { FC, Fragment, useState } from "react"

interface InboxProps {
	notifications: NotificationType[]
	nestingLevel: string
}

export const InboxWidget: FC<InboxProps> = (props) => {
	const { notifications, nestingLevel } = props
	const session = useSession()
	const [query, setQuery] = useState("")

	const groupedButtons = [
		{
			id: 0,
			name: "All",
		},
		{
			id: 1,
			name: "Unread",
		},
	]

	const inboxUsernotifications = getUserInboxNotifications(
		notifications,
		session
	)

	return (
		<Fragment>
			<div className="row w100 jcfa aic g2">
				<ButtonGroup
					variant="secondary"
					size="md"
					buttons={groupedButtons}
					dropdown={false}
					nestingLevel=""
				/>
				<input
					className="input-md w25"
					type="text"
					placeholder="Find notification"
					value={query}
					onChange={(event: any) => changeValue(event, setQuery)}
				/>
				<Button variant="primary" size="md">
					Read all
				</Button>
			</div>
			<NotificationList
				search={notifications.length !== 0}
				query={query}
				resetValue={() => resetValue(setQuery)}
				notifications={inboxUsernotifications}
				nestingLevel={nestingLevel}
			/>
		</Fragment>
	)
}
