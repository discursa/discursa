import { User } from "@prisma/client"
import getNotifications from "app/api/queries/Notification/getNotifications"
import { ThreadService } from "app/api/services"
import {
	AddUserToUSerThreadModal,
	Avatar,
	Button,
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

	const gearIcon = (
		<Icon size="sm" href={icons.gear} nestingLevel={nestingLevel} />
	)

	const userAddIcon = (
		<Icon size="sm" href={icons.personAdd} nestingLevel={nestingLevel} />
	)

	const signOutIcon = (
		<Icon size="sm" href={icons.signOut} nestingLevel={nestingLevel} />
	)

	return (
		<aside className="w100 col g2 pr-40px box-border">
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
			{check.admin(session) || check.author(session, thread.authorId) ? (
				<Fragment>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingIcon={gearIcon}
						onClick={() => addObjectToStore(setModals, updateThreadModal)}
					>
						Settings
					</Button>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingIcon={userAddIcon}
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
				leadingIcon={signOutIcon}
				onClick={async () => {
					await threadService.leave(thread, session, setQueryData)
				}}
			>
				Leave
			</Button>
		</aside>
	)
}
