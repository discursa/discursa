import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import { useSession } from "blitz"
import React, { FC } from "react"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import styles from "./UserCard.module.scss"
import { UserCardProps } from "./UserCard.types"

export const UserCard: FC<UserCardProps> = (props) => {
	const { user, nestingLevel, kickUser, object } = props

	const session = useSession()

	return (
		<li className={styles.UserCard}>
			<div className="jcfs aic g1">
				<div className={styles.IconContainer} aria-hidden="true">
					<Icon size="sm" href={icons.user} nestingLevel={nestingLevel} />
				</div>
				<p className="simple-text">{user.name}</p>
			</div>
			{check.editPermitions(session, object) && (
				<div className="jcfe aic g1">
					<IconButton
						variant="tertiary"
						size="md"
						href={icons.signOut}
						nestinglevel={nestingLevel}
						onClick={() => kickUser()}
					/>
				</div>
			)}
		</li>
	)
}
