import { Breadcrumbs, Header, LoadingOverlay } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import getDiscussion from "app/discussions/queries/getDiscussion"
import {
	ThreadForm,
	ThreadFormValuesType,
	ThreadSchema,
	ThreadService,
} from "app/threads"
import getThreads from "app/threads/queries/getThreads"
import { UserHasntPermitionsWidget } from "app/users"
import {
	BlitzPage,
	Routes,
	useParam,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL = "../../../"

const NewThreadPage: FC = () => {
	const discussionId = useParam("discussionId", "number")
	const session = useSession()
	const router = useRouter()

	const [discussion] = useQuery(getDiscussion, {
		id_: discussionId,
	})
	const [threads] = useQuery(getThreads, {})

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
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
		{
			id: 2,
			name: "New thread",
			route: `/discussions/${discussion.id}/threads/new`,
		},
	]

	const createThread = async (values: ThreadFormValuesType) => {
		const threadService = new ThreadService()

		await threadService.create(threads, values, discussion, router, session)
	}

	return !session ? (
		<UserHasntPermitionsWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle="New thread"
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			<Breadcrumbs items={breadcrumbsItems} />
			<ThreadForm
				className="w100 col g1"
				submitText="New"
				schema={ThreadSchema}
				initialValues={{
					name: "",
					message: "",
					visibility: "Public",
				}}
				onSubmit={async (values: ThreadFormValuesType) => {
					await createThread(values)
				}}
			/>
		</Layout>
	)
}

const ShowNewThreadPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<NewThreadPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowNewThreadPage
