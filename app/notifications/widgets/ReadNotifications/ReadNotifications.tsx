import { getUserReadNotifications } from "app/api/services/functions"
import { NotificationList } from "app/notifications/components"
import { changeValue, resetValue } from "app/core/utils/functions"
import { useSession } from "blitz"
import { FC, Fragment, useState } from "react"
import { ReadNotificationsProps } from "./ReadNotifications.types"

export const ReadNotificationsWidget: FC<ReadNotificationsProps> = (props) => {
	const { notifications, nestingLevel } = props
	const session = useSession()
	const [query, setQuery] = useState<string>("")
	const readUserNotifications = getUserReadNotifications(notifications, session)

	return (
		<Fragment>
			<div className="w100 row jcfs aic">
				<input
					className="input-md w25"
					type="text"
					placeholder="Find read notification"
					value={query}
					onChange={(e: any) => changeValue(e, setQuery)}
				/>
			</div>
			<NotificationList
				search={readUserNotifications.length !== 0}
				query={query}
				resetValue={() => resetValue(setQuery)}
				notifications={readUserNotifications}
				nestingLevel={nestingLevel}
			/>
		</Fragment>
	)
}
