import React, { FC } from "react"
import styles from "./CommentList.module.scss"
import { CommentListProps } from "./CommentList.types"

// TODO: Write CommentList component UI and API

const CommentList: FC<CommentListProps> = () => (
  <div className={styles.CommentList}>CommentList Component</div>
)

export default CommentList
