import { getUserSavedNotifications } from "app/api/services/functions"
import { NotificationList } from "app/core/components/NotificationList/NotificationList"
import { NotificationType } from "app/core/types"
import { changeValue, resetValue } from "app/core/utils/functions"
import { useSession } from "blitz"
import { FC, Fragment, useState } from "react"

interface SavedNotificationsWidgetProps {
	notifications: NotificationType[]
	nestingLevel: string
}

export const SavedNotificationsWidget: FC<SavedNotificationsWidgetProps> = (
	props
) => {
	const { notifications, nestingLevel } = props
	const session = useSession()
	const [query, setQuery] = useState<string>("")
	const savedUserNotifications = getUserSavedNotifications(
		notifications,
		session
	)

	return (
		<Fragment>
			<div className="w100 row jcfs aic">
				<input
					className="input-md w25"
					type="text"
					placeholder="Find saved notification"
					value={query}
					onChange={(e: any) => changeValue(e, setQuery)}
				/>
			</div>
			<NotificationList
				search={savedUserNotifications.length !== 0}
				query={query}
				resetValue={() => resetValue(setQuery)}
				notifications={savedUserNotifications}
				nestingLevel={nestingLevel}
			/>
		</Fragment>
	)
}
