import getUser from "app/api/queries/User/getUser"
import { icons } from "app/core/utils/icons"
import { Link, Routes, useQuery } from "blitz"
import React, { FC } from "react"
import { Avatar } from "../Avatar/Avatar"
import { Icon } from "../Icon/Icon"
import { IconButton } from "../IconButton/IconButton"
import styles from "./DiscussionCard.module.scss"
import { DiscussionCardProps } from "./DiscussionCard.types"

const DiscussionCard: FC<DiscussionCardProps> = (props) => {
  const { discussion, nestingLevel } = props
  const { name, createdAt, authorId } = discussion
  const [user] = useQuery(getUser, {
    id: authorId,
  })
  const date = new Date(createdAt)
  const shortenName = user.name?.slice(0, 1)

  return (
    <Link href={Routes.ShowDiscussionPage({ discussionId: discussion.id_ })}>
      <li className={styles.DiscussionCard}>
        <div className={styles.IconContainer}>
          <Icon
            size="xl"
            href={icons.commentDiscussion}
            nestingLevel={nestingLevel}
            styles="white"
          />
        </div>
        <div className="col">
          <p className="pre-text">{name}</p>
          <div className="row g1">
            <p className="simple-text">Started by {user.name}</p>
            <p className="sub-text">{date.toLocaleDateString()}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default DiscussionCard
