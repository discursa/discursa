import { getSearchItems } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import React, { FC, Fragment } from "react"
import { Button } from "../Button/Button"
import { InfoBlock } from "../InfoBlock/InfoBlock"
import { NotificationCard } from "../NotificationCard/NotificationCard"
import styles from "./NotificationList.module.scss"
import {
	NotificationListProps,
	NotificationsSeachListProps,
	NotificationsSimpleListProps,
} from "./NotificationList.types"

export const NotificationList: FC<NotificationListProps> = (props) => {
	const { notifications, query, nestingLevel, search, resetValue } = props

	const foundNotifications = getSearchItems(notifications, query)

	return (
		<section className={styles.NotificationList}>
			{search ? (
				<SearchList
					resetValue={() => resetValue()}
					notifications={foundNotifications}
					nestingLevel={nestingLevel}
				/>
			) : (
				<SimpleList notifications={notifications} nestingLevel={nestingLevel} />
			)}
		</section>
	)
}

const SearchList = (props: NotificationsSeachListProps) => {
	const { notifications, nestingLevel, resetValue } = props

	return (
		<Fragment>
			{notifications.length === 0 ? (
				<InfoBlock
					title="No one notification has been found"
					description="Notification wich you're searching for hasn't been found"
					href={icons.info}
					nestingLevel={nestingLevel}
				>
					<Button
						variant="secondary"
						size="md"
						type="reset"
						onClick={() => resetValue()}
					>
						Reset value
					</Button>
				</InfoBlock>
			) : (
				notifications.map((notification) => (
					<NotificationCard
						key={notification.id_}
						notification={notification}
						nestingLevel={nestingLevel}
					/>
				))
			)}
		</Fragment>
	)
}

const SimpleList: FC<NotificationsSimpleListProps> = (props) => {
	const { notifications, nestingLevel } = props

	return (
		<Fragment>
			{notifications.length === 0 ? (
				<InfoBlock
					title="No one notification has been found"
					description="You haven't recieved any notification yet"
					href={icons.info}
					nestingLevel={nestingLevel}
				/>
			) : (
				notifications.map((notification) => (
					<NotificationCard
						key={notification.id_}
						notification={notification}
						nestingLevel={nestingLevel}
					/>
				))
			)}
		</Fragment>
	)
}
