import getCategories from "app/api/queries/Category/getCategories"
import getDiscussions from "app/api/queries/Discussion/getDiscussions"
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
	LoadingOverlay,
	Spinner,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { check } from "app/core/modules/Check"
import { DiscussionType } from "app/core/types"
import { changeValue } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { pages } from "app/core/utils/pages"
import { BlitzPage, Link, Routes, useQuery, useRouter, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL: string = ""

const DiscussionsPage: FC = () => {
	const session = useSession()
	const router = useRouter()
	const [discussions] = useQuery(getDiscussions, {})
	const publicDiscussions = getPublicDiscussions(discussions)
	const userPrivateDiscussions = getUserPrivateDiscussions(discussions, session)
	const allDiscussions = [...userPrivateDiscussions, ...publicDiscussions]
	const [categories] = useQuery(getCategories, {})
	const [query, setQuery] = useState<string>("")
	const [top, setTop] = useState<boolean>(false)
	const [activeCategory, setActiveCategory] = useState<number | null>(null)
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

	const resetCategories = () => {
		setActiveCategory(null)
		setCurrentDiscussions(allDiscussions)
	}

	const changeCategory = (name: string, id: number) => {
		const categoryDiscussions = discussions.filter((discussion) => {
			return discussion.category === name
		})
		setActiveCategory(id)
		setCurrentDiscussions(categoryDiscussions)
	}

	return (
		<Layout
			activePage={pages.discussions}
			pageTitle={pages.discussions}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside className="col aifs jcfs g2">
				<div className="w100 row aic jcsb">
					<p className="simple-text">Categories</p>
					{check.admin(session) && (
						<Link href={Routes.ShowDiscussionCategoriesPage()}>
							<IconButton
								variant="tertiary"
								size="md"
								href={icons.gear}
								nestinglevel={NESTING_LEVEL}
							/>
						</Link>
					)}
				</div>
				<div className="w100 col g1">
					<Button
						variant={activeCategory === null ? "primary" : "tertiary"}
						size="lg"
						styles="w100 jcfs"
						onClick={() => resetCategories()}
					>
						View all
					</Button>
					{categories.map((category) => (
						<Button
							key={category.id_}
							variant={activeCategory === category.id_ ? "primary" : "tertiary"}
							size="lg"
							styles="w100 jcfs"
							onClick={() => changeCategory(category.name, category.id_)}
						>
							{category.name}
						</Button>
					))}
				</div>
			</aside>
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
					<Button
						variant="primary"
						size="md"
						disabled={!session}
						onClick={createDiscussion}
					>
						Create
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
