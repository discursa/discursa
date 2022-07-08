import getComments from "app/comments/queries/getComments"
import { Icon, IconCounter } from "app/core/components"
import { check } from "app/core/modules/Check"
import { icons } from "app/core/utils/icons"
import getUserById from "app/users/queries/getUserById"
import { Link, Routes, useQuery } from "blitz"
import { FC } from "react"
import styles from "./DiscussionCard.module.scss"
import { DiscussionCardProps } from "./DiscussionCard.types"

export const DiscussionCard: FC<DiscussionCardProps> = (props) => {
	const { discussion, nestingLevel } = props
	const { name, category, createdAt, authorId, upvotes, unvotes } = discussion
	const [user] = useQuery(getUserById, {
		id: authorId,
	})
	const [comments] = useQuery(getComments, {})
	const date = new Date(createdAt)

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
						counter={upvotes}
						href={icons.thumbsUp}
						nestingLevel={nestingLevel}
					/>
					<IconCounter
						counter={unvotes}
						href={icons.thumbsDown}
						nestingLevel={nestingLevel}
					/>
				</div>
			</li>
		</Link>
	)
}
