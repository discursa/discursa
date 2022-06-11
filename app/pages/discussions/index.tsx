import getCategories from "app/api/queries/Category/getCategories"
import getDiscussions from "app/api/queries/Discussion/getDiscussions"
import { DiscussionService } from "app/api/services"
import {
	getPublicDiscussions,
	getUserPrivateDiscussions,
} from "app/api/services/functions"
import {
	Button,
	ButtonGroup,
	DiscussionList,
	Header,
	IconButton,
	JoinToPrivateDisussionModal,
	LoadingOverlay,
	ModalWindow,
	Spinner,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { check } from "app/core/modules/Check"
import { DiscussionType, ModalWindowType } from "app/core/types"
import { addObjectToStore, changeValue, getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { pages } from "app/core/utils/pages"
import { CategoriesSidebarWidget } from "app/core/widgets"
import { BlitzPage, Link, Routes, useQuery, useRouter, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL: string = ""
const discussionService = new DiscussionService()

const DiscussionsPage: FC = () => {
	const session = useSession()
	const router = useRouter()
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [discussions] = useQuery(getDiscussions, {})
	const publicDiscussions = getPublicDiscussions(discussions)
	const userPrivateDiscussions = getUserPrivateDiscussions(discussions, session)
	const allDiscussions = [...userPrivateDiscussions, ...publicDiscussions]
	const [query, setQuery] = useState<string>("")
	const [top, setTop] = useState<boolean>(false)
	const [currentDiscussions, setCurrentDiscussions] =
		useState<DiscussionType[]>(allDiscussions)
	const groupedButtons = [
		{
			id: 0,
			name: "All",
			onClick() {
				setTop(false)
			},
		},
		{
			id: 1,
			name: "Top",
			onClick() {
				setTop(true)
			},
		},
	]

	const createDiscussion = () => {
		if (session) {
			router.push(Routes.ShowCreateDiscussionPage())
		}
	}

	const joinToDiscussionModal = {
		id: getId(modals),
		title: "Join to private discussion",
		children: (
			<JoinToPrivateDisussionModal
				discussions={discussions}
				discussionService={discussionService}
				session={session}
				router={router}
			/>
		),
	}

	return (
		<Layout
			activePage={pages.discussions}
			pageTitle={pages.discussions}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<CategoriesSidebarWidget
				discussions={discussions}
				allDiscussions={allDiscussions}
				setCurrentDiscussions={setCurrentDiscussions}
				nestingLevel={NESTING_LEVEL}
			/>
			<div>
				<div className="w100 row aic jcc g1 bottom-space-md">
					<ButtonGroup
						variant="secondary"
						size="md"
						buttons={groupedButtons}
						dropdown={false}
					/>
					<input
						className="input-md w50"
						type="text"
						placeholder="Find discussion"
						value={query}
						onChange={(e: any) => changeValue(e, setQuery)}
					/>
					<IconButton
						variant="secondary"
						size="md"
						name="Join private discussion"
						href={icons.signIn}
						nestinglevel={NESTING_LEVEL}
						onClick={() => addObjectToStore(setModals, joinToDiscussionModal)}
					/>
					<Button
						variant="primary"
						size="md"
						disabled={!session}
						onClick={createDiscussion}
					>
						New
					</Button>
				</div>
				<DiscussionList
					discussions={currentDiscussions}
					top={top}
					search={discussions.length !== 0}
					query={query}
					nestingLevel={NESTING_LEVEL}
				/>
			</div>
			<div />
			{modals.map((modal) => (
				<ModalWindow
					key={modal.id}
					title={modal.title}
					modals={modals}
					setModals={setModals}
					nestingLevel={NESTING_LEVEL}
				>
					{modal.children}
				</ModalWindow>
			))}
		</Layout>
	)
}

const ShowDiscussionsPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading" />
			<Suspense fallback={<LoadingOverlay />}>
				<DiscussionsPage />
			</Suspense>
		</Fragment>
	)
}

ShowDiscussionsPage.authenticate = false

export default ShowDiscussionsPage
