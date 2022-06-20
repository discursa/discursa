import getUserById from "app/api/queries/User/getUserById"
import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import { useQuery, useSession } from "blitz"
import { FC } from "react"
import { Button } from "../Button/Button"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import styles from "./UserCard.module.scss"
import { UserCardProps } from "./UserCard.types"

export const UserCard: FC<UserCardProps> = (props) => {
	const { userId, nestingLevel, kickUser, object, banUser, type } = props

	const session = useSession()

	const [user] = useQuery(getUserById, {
		id: userId,
	})

	return (
		<li className={styles.UserCard}>
			<div className="jcfs aic g1">
				<div className={styles.IconContainer} aria-hidden="true">
					<Icon size="sm" href={icons.user} nestingLevel={nestingLevel} />
				</div>
				<p className="simple-text">{user.name}</p>
			</div>
			{check.author(session.userId, object.authorId) && (
				<div className="jcfe aic g1">
					{type === "discussion" && (
						<Button
							variant="secondary"
							size="sm"
							type="submit"
							//@ts-ignore
							onClick={() => banUser()}
							disabled={session.userId === userId}
						>
							{object.banned.includes(userId) ? "Unban user" : "Ban user"}
						</Button>
					)}
					<Button
						variant="secondary"
						size="sm"
						type="submit"
						onClick={() => kickUser()}
						disabled={session.userId === userId}
					>
						Kick user
					</Button>
				</div>
			)}
		</li>
	)
}
