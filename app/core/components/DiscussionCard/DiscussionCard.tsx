import getComments from "app/api/queries/Comment/getComments"
import getUser from "app/api/queries/User/getUser"
import {
	getDiscussionCommentsLength,
	getDiscussionThreads,
} from "app/api/services/functions"
import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import { Link, Routes, useQuery } from "blitz"
import { FC } from "react"
import { Icon } from "../Icon/Icon"
import { IconCounter } from "../IconCounter/IconCounter"
import styles from "./DiscussionCard.module.scss"
import { DiscussionCardProps } from "./DiscussionCard.types"

const DiscussionCard: FC<DiscussionCardProps> = (props) => {
	const { discussion, nestingLevel } = props
	const { name, category, createdAt, authorId, upvotes } = discussion
	const [user] = useQuery(getUser, {
		id: authorId,
	})
	const [comments] = useQuery(getComments, {})
	const date = new Date(createdAt)

	const discussionCommentsLength = getDiscussionCommentsLength(
		discussion,
		comments
	)

	return (
		<Link href={Routes.ShowDiscussionPage({ discussionId: discussion.id_ })}>
			<li className={styles.DiscussionCard}>
				<div className="row jcfs aic g1">
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
				</div>
				<div className="row jcfe aic g1">
					<IconCounter
						counter={discussionCommentsLength}
						href={icons.comment}
						nestingLevel={nestingLevel}
					/>
					<IconCounter
						counter={upvotes}
						href={icons.arrowUp}
						nestingLevel={nestingLevel}
					/>
				</div>
			</li>
		</Link>
	)
}

export default DiscussionCard
