import {
	getDiscussionThreads,
	getUserPrivateThreads,
} from "app/api/services/functions"
import { DiscussionType, ModalWindowType, ThreadType } from "app/core/types"
import {
	addObjectToStore,
	changeValue,
	getId,
	getSearchItems,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { ClientSession, Link, Routes, useRouter } from "blitz"
import { check } from "app/core/modules/Check"
import { FC, Fragment, Suspense, useState } from "react"
import { Button } from "../../Button/Button"
import { Icon } from "../../Icon/Icon"
import { IconButton } from "../../IconButton/IconButton"
import { LoaderBox } from "../../LoaderBox/LoaderBox"
import { CreateThreadModal } from "../../ModalWindow/children/CreateThreadModal"
import { Accordion } from "../Accordion"

interface CompactThreadListProps {
	discussion: DiscussionType
	session: ClientSession
	threads: ThreadType[]
	nestingLevel: string
	query?: string
}

interface ThreadsAccordionProps extends CompactThreadListProps {
	modals: ModalWindowType[]
	setModals: Function
}

export const ThreadAccordion: FC<ThreadsAccordionProps> = (props) => {
	const { discussion, threads, modals, setModals, session, nestingLevel } =
		props

	const [query, setQuery] = useState<string>("")

	const router = useRouter()

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

	const additionalButton = (
		<IconButton
			variant="secondary"
			size="sm"
			href={icons.plus}
			nestinglevel={nestingLevel}
			onClick={() => addObjectToStore(setModals, createThreadModal)}
		/>
	)

	return (
		<Accordion
			title="Threads"
			additionalButton={additionalButton}
			nestingLevel={nestingLevel}
		>
			<input
				className="input-md w100"
				type="text"
				placeholder="Find threads"
				value={query}
				onChange={(e: any) => changeValue(e, setQuery)}
				disabled={threads.length === 0}
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
		</Accordion>
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

	// @ts-ignore
	const foundThreads = getSearchItems(allThreads, query)

	const lockIcon = (
		<Icon size="sm" href={icons.lock} nestingLevel={nestingLevel} />
	)

	const hashIcon = (
		<Icon size="sm" href={icons.hash} nestingLevel={nestingLevel} />
	)

	return (
		<Fragment>
			{foundThreads.map((thread) => (
				<Link
					key={thread.id_}
					href={Routes.ShowThreadPage({
						discussionId: discussion.id_,
						threadId: thread.id_,
					})}
				>
					<Button
						variant="tertiary"
						size="md"
						styles="w100 jcfs bg-800 hover-bg-900"
						leadingIcon={check.private(thread) ? lockIcon : hashIcon}
					>
						{thread.name}
					</Button>
				</Link>
			))}
		</Fragment>
	)
}
