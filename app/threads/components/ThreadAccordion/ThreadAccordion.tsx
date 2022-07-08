import {
	Accordion,
	Button,
	Icon,
	IconButton,
	LoaderBox,
} from "app/core/components"
import { check } from "app/core/modules/Check"
import { changeValue, getSearchItems } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { getDiscussionThreads, getUserPrivateThreads } from "app/threads"
import { ThreadType } from "app/threads/types"
import { Link, Routes, useRouter } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"
import { CompactThreadListProps } from "./ThreadAccordion.types"

export const ThreadAccordion: FC<CompactThreadListProps> = (props) => {
	const { discussion, threads, session, nestingLevel } = props

	const [query, setQuery] = useState<string>("")

	const router = useRouter()

	const additionalButton = (
		<IconButton
			variant="secondary"
			size="sm"
			href={icons.plus}
			nestinglevel={nestingLevel}
			onClick={() => router.push(`/discussions/${discussion.id_}/threads/new`)}
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
						leadingicon={check.private(thread) ? lockIcon : hashIcon}
					>
						{thread.name}
					</Button>
				</Link>
			))}
		</Fragment>
	)
}
