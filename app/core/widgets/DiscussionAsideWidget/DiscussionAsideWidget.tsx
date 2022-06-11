import { User } from "@prisma/client"
import getNotifications from "app/api/queries/Notification/getNotifications"
import getUsers from "app/api/queries/User/getUsers"
import { DiscussionService } from "app/api/services"
import {
	Avatar,
	Button,
	ChangeDiscussionAuthorModal,
	Icon,
	IconButton,
} from "app/core/components"
import { AddUserToPrivateDiscussionModal } from "app/core/components/ModalWindow/children/AddUserToPrivateDiscussionModal"
import { check } from "app/core/modules/Check"
import { DiscussionType, ModalWindowType } from "app/core/types"
import {
	addObjectToStore,
	getId,
	getShortenUsername,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { Link, Routes, useQuery, useRouter, useSession } from "blitz"
import { FC, Fragment } from "react"

interface DiscussionAsideWidgetProps {
	discussion: DiscussionType
	nestingLevel: string
	setQueryData: Function
	modals: ModalWindowType[]
	setModals: Function
	user: User
}

const discussionService = new DiscussionService()

export const DiscussionAsideWidget: FC<DiscussionAsideWidgetProps> = (
	props
) => {
	const { discussion, nestingLevel, setQueryData, modals, setModals, user } =
		props

	const [notifications] = useQuery(getNotifications, {})
	const [users] = useQuery(getUsers, {})

	const session = useSession()
	const router = useRouter()

	const bellIcon = (
		<Icon size="sm" href={icons.bell} nestingLevel={nestingLevel} />
	)

	const slashBellIcon = (
		<Icon size="sm" href={icons.bellSlash} nestingLevel={nestingLevel} />
	)

	const arrowUpIcon = (
		<Icon size="md" href={icons.arrowUp} nestingLevel={nestingLevel} />
	)

	const gearIcon = (
		<Icon size="sm" href={icons.gear} nestingLevel={nestingLevel} />
	)

	const signOutIcon = (
		<Icon size="sm" href={icons.signOut} nestingLevel={nestingLevel} />
	)

	const subscribeButtonText = check.subscribe(discussion, session)
		? "Unsubscribe"
		: "Subscribe"

	const subscribeButtonIcon = check.subscribe(discussion, session)
		? slashBellIcon
		: bellIcon

	const inviteUserToDiscussionModal = {
		id: getId(modals),
		title: "Invite user",
		children: (
			<AddUserToPrivateDiscussionModal
				notifications={notifications}
				discussion={discussion}
				router={router}
				session={session}
				nestingLevel={nestingLevel}
			/>
		),
	}

	const changeAuthorModal = {
		id: getId(modals),
		title: "Change discussion author",
		children: (
			<ChangeDiscussionAuthorModal
				users={users}
				discussion={discussion}
				setQueryData={setQueryData}
			/>
		),
	}

	const getDiscussionNotifications = async () => {
		if (check.subscribe(discussion, session)) {
			await discussionService.unsubscribe(
				discussion,
				// @ts-ignore
				session.userId,
				setQueryData
			)
		} else {
			await discussionService.subscribe(
				discussion,
				// @ts-ignore
				session.userId,
				setQueryData
			)
		}
	}

	const evaluateDiscussion = async () => {
		if (!check.upvote(discussion, session)) {
			// @ts-ignore
			await discussionService.upvote(discussion, session.userId, setQueryData)
		} else {
			// @ts-ignore
			await discussionService.unvote(discussion, session.userId, setQueryData)
		}
	}

	return (
		<aside className="col jcfs aifs g1 pr-40px box-border">
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
				<p className="simple-text">Category:</p>
				<p className="sub-text">{discussion.category}</p>
			</div>
			<div className="row g1 bottom-space-xs">
				<p className="simple-text">Type:</p>
				<p className="sub-text">{discussion.visibility}</p>
			</div>
			{session && (
				<Fragment>
					<Button
						key="0"
						variant="secondary"
						size="md"
						leadingIcon={subscribeButtonIcon}
						styles="w100"
						onClick={async () => await getDiscussionNotifications()}
					>
						{subscribeButtonText}
					</Button>
					{discussion.voting && (
						<Button
							key="1"
							variant="secondary"
							size="md"
							leadingIcon={arrowUpIcon}
							styles={`w100 ${
								check.upvote(discussion, session) && "active blue-border"
							}`}
							onClick={async () => await evaluateDiscussion()}
						>
							{discussion.upvotes}
						</Button>
					)}
				</Fragment>
			)}
			{check.invitePermitions(discussion, session) && (
				<IconButton
					variant="secondary"
					size="md"
					href={icons.personAdd}
					nestinglevel={nestingLevel}
					styles="w100"
					onClick={() =>
						addObjectToStore(setModals, inviteUserToDiscussionModal)
					}
				/>
			)}
			{session.userId === discussion.authorId && (
				<Link
					key="1"
					href={Routes.EditDiscussionPage({
						discussionId: discussion.id_,
					})}
				>
					<Button
						variant="secondary"
						size="md"
						styles="w100"
						leadingIcon={gearIcon}
					>
						Settings
					</Button>
				</Link>
			)}
			{check.private(discussion) && (
				<Button
					variant="danger"
					size="md"
					onClick={async () => {
						await discussionService.leave(
							discussion,
							// @ts-ignore
							session.userId,
							setQueryData,
							addObjectToStore(setModals, changeAuthorModal)
						)
					}}
					styles="w100"
					leadingIcon={signOutIcon}
				>
					Leave
				</Button>
			)}
		</aside>
	)
}
