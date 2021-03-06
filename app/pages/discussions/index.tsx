import {
	Button,
	ButtonGroup,
	Header,
	IconButton,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import { ITEMS_PER_PAGE } from "app/core/constants"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { ModalWindowType } from "app/core/types"
import { addObjectToStore, changeValue, getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { pages } from "app/core/utils/pages"
import {
	DiscussionCategoriesSidebarWidget,
	DiscussionList,
	DiscussionType,
	getPublicDiscussions,
	getUserPrivateDiscussions,
	JoinToPrivateDisussionModal,
} from "app/discussions"
import getPaginatedDiscussions from "app/discussions/queries/getPaginatedDiscussions"
import {
	BlitzPage,
	Routes,
	usePaginatedQuery,
	useRouter,
	useSession,
} from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL: string = ""

const DiscussionsPage: FC = () => {
	const session = useSession()
	const router = useRouter()
	const page = Number(router.query.page) || 0
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [{ paginatedDiscussions, hasMore }, { isPreviousData }] =
		usePaginatedQuery(getPaginatedDiscussions, {
			where: {},
			orderBy: { id_: "asc" },
			skip: ITEMS_PER_PAGE * page,
			take: ITEMS_PER_PAGE,
		})

	const userPrivateDiscussions = getUserPrivateDiscussions(
		paginatedDiscussions,
		session
	)
	const publicDiscussions = getPublicDiscussions(paginatedDiscussions)

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
				discussions={paginatedDiscussions}
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
			<Suspense fallback={<LoaderBox size="sm" />}>
				<DiscussionCategoriesSidebarWidget
					discussions={paginatedDiscussions}
					allDiscussions={allDiscussions}
					setCurrentDiscussions={setCurrentDiscussions}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
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
				<Suspense fallback={<LoaderBox size="sm" />}>
					<DiscussionList
						discussions={currentDiscussions}
						top={top}
						search={paginatedDiscussions.length !== 0}
						query={query}
						nestingLevel={NESTING_LEVEL}
						isPreviousData={isPreviousData}
						hasMore={hasMore}
						page={page}
					/>
				</Suspense>
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
