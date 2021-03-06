import { Breadcrumbs, Header, LoadingOverlay } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { pages } from "app/core/utils/pages"
import {
	DiscussionForm,
	DiscussionFormValuesType,
	DiscussionSchema,
	DiscussionService,
} from "app/discussions"
import getDiscussions from "app/discussions/queries/getDiscussions"
import { BlitzPage, Routes, useQuery, useRouter, useSession } from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL = "../"

const CreateDiscussionPage: FC = () => {
	const session = useSession()
	const router = useRouter()
	const [discussions] = useQuery(getDiscussions, {})
	const discussionService = new DiscussionService()

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
			name: "Create discussion",
			route: Routes.ShowCreateDiscussionPage(),
		},
	]

	return (
		<Layout
			activePage={pages.discussions}
			pageTitle="Create Discussion"
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			<Breadcrumbs items={breadcrumbsItems} />
			<DiscussionForm
				className="w75 col g1"
				submitText="Create"
				initialValues={{
					name: "",
					message: "",
				}}
				schema={DiscussionSchema}
				onSubmit={async (values: DiscussionFormValuesType) =>
					discussionService.create(values, discussions, session, router)
				}
			/>
		</Layout>
	)
}

const ShowCreateDiscussionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<CreateDiscussionPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowCreateDiscussionPage
