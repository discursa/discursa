import { CategoryList, CreateCategoryModal } from "app/categories"
import getCategories from "app/categories/queries/getCategories"
import {
	Breadcrumbs,
	Button,
	Header,
	InfoBlock,
	LoadingOverlay,
	ModalWindow,
	Spinner,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { check } from "app/core/modules/Check"
import { ModalWindowType } from "app/core/types"
import { addObjectToStore, getId } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { BlitzPage, Routes, useQuery, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL: string = "../"

const DiscussionCategoriesPage: FC = () => {
	const session = useSession()
	const [categories] = useQuery(getCategories, {})
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const createCategoryModal = {
		id: getId(modals),
		title: "Create category",
		children: <CreateCategoryModal categories={categories} />,
	}

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 1,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 2,
			name: "Categories",
			route: Routes.ShowDiscussionCategoriesPage(),
		},
	]

	return (
		<Layout
			activePage="Discussions"
			pageTitle="Discussions categories"
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			{check.admin(session) ? (
				<Fragment>
					<Breadcrumbs items={breadcrumbsItems} />
					<div className="w100 row aic jcsb">
						<h3>Categories</h3>
						<Button
							variant="primary"
							size="md"
							onClick={() => addObjectToStore(setModals, createCategoryModal)}
						>
							Create
						</Button>
					</div>
					<div className="col w100">
						<CategoryList
							categories={categories}
							updateCategory={() => console.log(1)}
							nestingLevel={NESTING_LEVEL}
							modals={modals}
							setModals={setModals}
						/>
					</div>
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
				</Fragment>
			) : (
				<InfoBlock
					title="Access denied"
					description="You don't have access to this page"
					href={icons.warning}
					nestingLevel={NESTING_LEVEL}
				/>
			)}
		</Layout>
	)
}

const ShowDiscussionCategoriesPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<DiscussionCategoriesPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowDiscussionCategoriesPage
