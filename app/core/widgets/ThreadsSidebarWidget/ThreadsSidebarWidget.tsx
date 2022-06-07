import {
	getDiscussionThreads,
	getUserPrivateThreads,
} from "app/api/services/functions"
import {
	Button,
	CreateThreadModal,
	Icon,
	IconButton,
	JoinToPrivateThreadModal,
} from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import { check } from "app/core/modules/Check"
import {
	AlertType,
	DiscussionType,
	ModalWindowType,
	ThreadType,
} from "app/core/types"
import {
	addObjectToStore,
	changeValue,
	getId,
	getSearchItems,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { ClientSession, Link, useRouter, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

interface CompactThreadListProps {
	discussion: DiscussionType
	session: ClientSession
	threads: ThreadType[]
	nestingLevel: string
	query?: string
}

interface ThreadsSidebarWidgetProps extends CompactThreadListProps {
	discussion: DiscussionType
	modals: ModalWindowType[]
	alerts: AlertType[]
	setAlerts: Function
	setModals: Function
	threads: ThreadType[]
}

export const ThreadsSidebarWidget: FC<ThreadsSidebarWidgetProps> = (props) => {
	const {
		discussion,
		nestingLevel,
		modals,
		alerts,
		setAlerts,
		setModals,
		threads,
	} = props

	const router = useRouter()
	const session = useSession()

	const [query, setQuery] = useState<string>("")

	const alreadyMemberAlert: AlertType = {
		id: getId(alerts),
		variant: "warning",
		message: "You have already been member of this thread",
		iconHref: icons.warning,
	}

	const joinToThreadModal = {
		id: getId(modals),
		title: "Join to private thread",
		children: (
			<JoinToPrivateThreadModal
				threads={threads}
				pushErrorAlert={() => addObjectToStore(setAlerts, alreadyMemberAlert)}
			/>
		),
	}

	const createThreadModal = {
		id: getId(modals),
		title: "Create thread",
		children: (
			<CreateThreadModal
				threads={threads}
				discussion={discussion}
				router={router}
				session={session}
			/>
		),
	}

	return (
		<aside className="w100 col g2">
			<div className="w100 row aic jcsb">
				<p className="simple-text">Threads</p>
				<div className="row g1 aic jcfe">
					<IconButton
						variant="tertiary"
						size="md"
						href={icons.signIn}
						nestinglevel={nestingLevel}
						onClick={() => addObjectToStore(setModals, joinToThreadModal)}
					/>
					<IconButton
						variant="tertiary"
						size="md"
						href={icons.plus}
						nestinglevel={nestingLevel}
						onClick={() => addObjectToStore(setModals, createThreadModal)}
					/>
				</div>
			</div>
			<input
				className="input-md w100"
				type="text"
				placeholder="Find threads"
				value={query}
				onChange={(e: any) => changeValue(e, setQuery)}
			/>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<CompactThreadList
					discussion={discussion}
					session={session}
					threads={threads}
					nestingLevel={nestingLevel}
					query={query}
				/>
			</Suspense>
		</aside>
	)
}

const CompactThreadList: FC<CompactThreadListProps> = (props) => {
	const { discussion, threads, session, nestingLevel, query } = props

	const discussionThreads: ThreadType[] = getDiscussionThreads(
		threads,
		discussion
	)

	const userPrivateThreads: ThreadType[] = getUserPrivateThreads(
		threads,
		discussion,
		session
	)

	const allThreads = [...userPrivateThreads, ...discussionThreads]

	const foundThreads = getSearchItems(allThreads, query)

	const lockIcon = (
		<Icon size="sm" href={icons.lock} nestingLevel={nestingLevel} />
	)

	const hashIcon = (
		<Icon size="sm" href={icons.hash} nestingLevel={nestingLevel} />
	)

	return (
		<Fragment>
			<Link href={`/discussions/${discussion.id_}`}>
				<Button
					variant="tertiary"
					size="md"
					styles="w100 jcfs"
					leadingIcon={hashIcon}
				>
					General
				</Button>
			</Link>
			{foundThreads.map((thread) => (
				<Link
					key={thread.id_}
					href={`/discussions/${discussion.id_}/${thread.id_}`}
				>
					<Button
						variant="tertiary"
						size="md"
						styles="w100 jcfs"
						leadingIcon={check.private(thread) ? lockIcon : hashIcon}
					>
						{thread.name}
					</Button>
				</Link>
			))}
		</Fragment>
	)
}
