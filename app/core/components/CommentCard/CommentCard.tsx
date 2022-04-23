import React, { FC } from "react"
import styles from "./CommentCard.module.scss"
import { CommentCardProps } from "./CommentCard.types"

// TODO: Write CommentCard component UI and API

export const CommentCard: FC<CommentCardProps> = () => (
  <div className={styles.CommentCard}>CommentCard Component</div>
)
