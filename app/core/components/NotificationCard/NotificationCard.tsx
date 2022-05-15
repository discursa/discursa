import { icons } from "app/core/utils/icons"
import { Link, Routes } from "blitz"
import React, { FC } from "react"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import styles from "./NotificationCard.module.scss"
import { NotificationCardProps } from "./NotificationCard.types"

export const NotificationCard: FC<NotificationCardProps> = (props) => {
	const { notification, nestingLevel } = props
	const buttons = [
		{
			id: 0,
			href: icons.bookmark,
		},
		{
			id: 1,
			href: icons.check,
		},
	]

	return (
		<Link
			href={Routes.ShowNotificationPage({ notificationId: notification.id })}
		>
			<a className={styles.NotificationCard}>
				<div className="row aic jcfs g2">
					<div className={styles.IconContainer}>
						<Icon
							size="md"
							href={icons.notification}
							nestingLevel={nestingLevel}
						/>
					</div>
					<p className="simple-text">{notification.name}</p>
				</div>
				<div className="row aic jcfe g2">
					{buttons.map((button) => (
						<IconButton
							key={button.id}
							variant="tertiary"
							size="md"
							href={button.href}
							nestinglevel={nestingLevel}
							styles={styles.HiddenButton}
						/>
					))}
				</div>
			</a>
		</Link>
	)
}
