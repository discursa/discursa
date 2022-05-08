import getUser from "app/api/queries/User/getUser"
import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import { Link, Routes, useQuery } from "blitz"
import React, { FC } from "react"
import { Icon } from "../Icon/Icon"
import styles from "./DiscussionCard.module.scss"
import { DiscussionCardProps } from "./DiscussionCard.types"

const DiscussionCard: FC<DiscussionCardProps> = (props) => {
	const { discussion, nestingLevel } = props
	const { name, category, createdAt, authorId, type } = discussion
	const [user] = useQuery(getUser, {
		id: authorId,
	})
	const date = new Date(createdAt)

	return (
		<Link href={Routes.ShowDiscussionPage({ discussionId: discussion.id_ })}>
			<li className={styles.DiscussionCard}>
				<div className={styles.IconContainer}>
					<Icon
						size="xl"
						href={
							check.private(discussion) ? icons.lock : icons.commentDiscussion
						}
						nestingLevel={nestingLevel}
						styles="white"
					/>
				</div>
				<div className="col">
					<p className="pre-text">{name}</p>
					<div className="row g1">
						<p className="simple-text">
							{user.name} started in {category}
						</p>
						<p className="sub-text">{date.toLocaleDateString()}</p>
					</div>
				</div>
			</li>
		</Link>
	)
}

export default DiscussionCard
