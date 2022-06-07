import { User } from "@prisma/client"
import { DiscussionService, ThreadService } from "app/api/services"
import { setQueryData } from "blitz"
import React, { FC, Fragment } from "react"
import { UserCard } from "../UserCard/UserCard"
import styles from "./UserList.module.scss"
import {
	DiscussionListProps,
	ThreadListProps,
	UserListProps,
} from "./UserList.types"

export const UserList: FC<UserListProps> = (props) => {
	const { users, nestingLevel, type, object } = props

	return (
		<ul className={styles.UserList}>
			{type === "thread" ? (
				<ThreadUserList
					// @ts-ignore
					thread={object}
					users={users}
					nestingLevel={nestingLevel}
					setQueryData={setQueryData}
				/>
			) : (
				<DiscussionUserList
					// @ts-ignore
					discussion={object}
					users={users}
					nestingLevel={nestingLevel}
					setQueryData={setQueryData}
				/>
			)}
		</ul>
	)
}

const DiscussionUserList: FC<DiscussionListProps> = (props) => {
	const { users, nestingLevel, discussion, setQueryData } = props

	const discussionService = new DiscussionService()

	const kickUser = async (user: User) => {
		await discussionService.leave(discussion, user.id, setQueryData)
	}

	return (
		<Fragment>
			{users.map((user) => (
				<UserCard
					key={user.id}
					user={user}
					nestingLevel={nestingLevel}
					object={discussion}
					kickUser={() => kickUser(user)}
				/>
			))}
		</Fragment>
	)
}

const ThreadUserList: FC<ThreadListProps> = (props) => {
	const { users, nestingLevel, thread, setQueryData } = props

	const threadService = new ThreadService()

	const kickUser = async (user: User) => {
		const session = {
			userId: user.id,
		}

		// @ts-ignore
		await threadService.leave(thread, session, setQueryData)
	}

	return (
		<Fragment>
			{users.map((user) => (
				<UserCard
					key={user.id}
					user={user}
					nestingLevel={nestingLevel}
					object={thread}
					kickUser={() => kickUser(user)}
				/>
			))}
		</Fragment>
	)
}
