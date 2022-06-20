import {
	DiscussionService,
	QuestionService,
	ThreadService,
} from "app/api/services"
import { getSearchItems } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { setQueryData } from "blitz"
import { FC, Fragment } from "react"
import { InfoBlock } from "../InfoBlock/InfoBlock"
import { UserCard } from "../UserCard/UserCard"
import styles from "./UserList.module.scss"
import {
	DiscussionListUserProps,
	ThreadListUserProps,
	QuestionUserListProps,
	UserListProps,
} from "./UserList.types"

export const UserList: FC<UserListProps> = (props) => {
	const { members, nestingLevel, type, object } = props

	return (
		<ul className={styles.UserList}>
			{type === "thread" && (
				<ThreadUserList
					// @ts-ignore
					thread={object}
					members={members}
					nestingLevel={nestingLevel}
					setQueryData={setQueryData}
				/>
			)}
			{type === "discussion" && (
				<DiscussionUserList
					// @ts-ignore
					discussion={object}
					members={members}
					nestingLevel={nestingLevel}
					setQueryData={setQueryData}
				/>
			)}
			{type === "question" && (
				<QuestionUserList
					// @ts-ignore
					question={object}
					members={members}
					nestingLevel={nestingLevel}
					setQueryData={setQueryData}
				/>
			)}
		</ul>
	)
}

const DiscussionUserList: FC<DiscussionListUserProps> = (props) => {
	const { members, nestingLevel, discussion, setQueryData } = props

	const kickUser = async (userId: string) => {
		const discussionService = new DiscussionService()

		await discussionService.leave(discussion, userId, setQueryData)
	}

	const banUser = async (userId: string) => {
		const discussionService = new DiscussionService()

		if (discussion.members.includes(userId)) {
			await discussionService.ban(discussion, userId, setQueryData)
		} else {
			await discussionService.unban(discussion, userId, setQueryData)
		}
	}

	return (
		<Fragment>
			{members.length === 0 ? (
				<InfoBlock
					title="There are no users"
					description="There are no users has been found"
					href={icons.info}
					nestingLevel={nestingLevel}
				/>
			) : (
				members.map((member) => (
					<UserCard
						key={member}
						userId={member}
						nestingLevel={nestingLevel}
						object={discussion}
						kickUser={() => kickUser(member)}
						banUser={() => banUser(member)}
						type="discussion"
					/>
				))
			)}
		</Fragment>
	)
}

const ThreadUserList: FC<ThreadListUserProps> = (props) => {
	const { members, nestingLevel, thread, setQueryData } = props

	const kickUser = async (userId: string) => {
		const threadService = new ThreadService()

		await threadService.leave(thread, userId, setQueryData)
	}

	return (
		<Fragment>
			{members.length === 0 ? (
				<InfoBlock
					title="There are no users"
					description="There are no users has been found"
					href={icons.info}
					nestingLevel={nestingLevel}
				/>
			) : (
				members.map((member) => (
					<UserCard
						key={member}
						userId={member}
						nestingLevel={nestingLevel}
						object={thread}
						kickUser={() => kickUser(member)}
						type="thread"
					/>
				))
			)}
		</Fragment>
	)
}

const QuestionUserList: FC<QuestionUserListProps> = (props) => {
	const { members, nestingLevel, question, setQueryData } = props

	const kickUser = async (userId: string) => {
		const questionService = new QuestionService()

		await questionService.leave(question, userId, setQueryData)
	}

	return (
		<Fragment>
			{members.length === 0 ? (
				<InfoBlock
					title="There are no users"
					description="There are no users has been found"
					href={icons.info}
					nestingLevel={nestingLevel}
				/>
			) : (
				members.map((member) => (
					<UserCard
						key={member}
						userId={member}
						nestingLevel={nestingLevel}
						object={question}
						kickUser={() => kickUser(member)}
						type="question"
					/>
				))
			)}
		</Fragment>
	)
}
