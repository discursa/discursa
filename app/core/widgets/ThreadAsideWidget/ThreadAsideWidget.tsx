import { User } from "@prisma/client"
import getNotifications from "app/api/queries/Notification/getNotifications"
import { ThreadService } from "app/api/services"
import {
	AddUserToUSerThreadModal,
	Avatar,
	Button,
	ChangeThreadAuthorModal,
	Icon,
	UpdateThreadModal,
} from "app/core/components"
import { ModalWindowType, ThreadType } from "app/core/types"
import {
	addObjectToStore,
	getId,
	getShortenUsername,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { Link, Routes, useQuery, useRouter, useSession } from "blitz"
import { FC, Fragment } from "react"
import { check } from "app/core/modules/Check"
import getUsers from "app/api/queries/User/getUsers"

interface ThreadAsideWidgetProps {
	thread: ThreadType
	user: User
	nestingLevel: string
	setQueryData: Function
	setModals: Function
	modals: ModalWindowType[]
}

const threadService = new ThreadService()

export const ThreadAsideWidget: FC<ThreadAsideWidgetProps> = (props) => {
	const { thread, user, nestingLevel, setQueryData, setModals, modals } = props

	const session = useSession()
	const router = useRouter()
	const [users] = useQuery(getUsers, {})

	const [notifications] = useQuery(getNotifications, {})

	const updateThreadModal = {
		id: getId(modals),
		title: "Update thread",
		children: (
			<UpdateThreadModal
				thread={thread}
				setQueryData={setQueryData}
				router={router}
			/>
		),
	}

	const inviteUserToPrivateThreadModal = {
		id: getId(modals),
		title: "Invite user to private thread",
		children: (
			<AddUserToUSerThreadModal
				notifications={notifications}
				thread={thread}
				router={router}
			/>
		),
	}

	const changeThreadAuthorModal = {
		id: getId(modals),
		title: "Change author",
		children: (
			<ChangeThreadAuthorModal
				users={users}
				thread={thread}
				setQueryData={setQueryData}
			/>
		),
	}

	const gearIcon = (
		<Icon size="sm" href={icons.gear} nestingLevel={nestingLevel} />
	)

	const userAddIcon = (
		<Icon size="sm" href={icons.personAdd} nestingLevel={nestingLevel} />
	)

	const signOutIcon = (
		<Icon size="sm" href={icons.signOut} nestingLevel={nestingLevel} />
	)

	const peopleIcon = (
		<Icon size="sm" href={icons.people} nestingLevel={nestingLevel} />
	)

	const leaveThread = async () => {
		if (thread.authorId !== session.userId) {
			// @ts-ignore
			await threadService.leave(thread, session.userId, setQueryData)
		} else {
			addObjectToStore(setModals, changeThreadAuthorModal)
		}
	}

	return (
		<aside className="w100 col g1 pr-40px box-border">
			<div className="row aic jcfs">
				<p className="simple-text right-space-xs">Owner:</p>
				<Link href={`/${user.name}`}>
					<a className="row g1">
						<Avatar
							type="text"
							size="sm"
							shortenName={getShortenUsername(user)}
						/>
						{user.name}
					</a>
				</Link>
			</div>
			<div className="row g1">
				<p className="simple-text">Type:</p>
				<p className="sub-text">{thread.visibility}</p>
			</div>
			{/* @ts-ignore */}
			{check.private && (
				<Link
					href={Routes.ShowThreadMembersPage({
						discussionId: thread.parent,
						threadId: thread.id_,
					})}
				>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingicon={peopleIcon}
					>
						Members
					</Button>
				</Link>
			)}
			{check.admin(session) || check.author(session.userId, thread.authorId) ? (
				<Fragment>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingicon={gearIcon}
						onClick={() => addObjectToStore(setModals, updateThreadModal)}
					>
						Settings
					</Button>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingicon={userAddIcon}
						onClick={() =>
							addObjectToStore(setModals, inviteUserToPrivateThreadModal)
						}
					>
						Invite
					</Button>
				</Fragment>
			) : (
				""
			)}
			<Button
				variant="danger"
				size="md"
				type="submit"
				styles="w100"
				leadingicon={signOutIcon}
				onClick={async () => {
					//@ts-ignore
					await threadService.leave(thread, session.userId, setQueryData)
				}}
			>
				Leave
			</Button>
		</aside>
	)
}
