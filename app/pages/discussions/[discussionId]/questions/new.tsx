import { Breadcrumbs, Header, LoadingOverlay } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import getDiscussion from "app/discussions/queries/getDiscussion"
import {
	QuestionFromValuesType,
	QuestionSchema,
	QuestionService,
} from "app/questions"
import { QuestionForm } from "app/questions/components/QuestionForm/QuestionForm"
import getQuestions from "app/questions/queries/getQuestions"
import { UserBannedWidget } from "app/users"
import {
	BlitzPage,
	Routes,
	useParam,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { Fragment, Suspense } from "react"

const NESTING_LEVEL = "../../../"

const NewQuestionPage = () => {
	const discussionId = useParam("discussionId", "number")
	const session = useSession()
	const router = useRouter()

	const [discussion] = useQuery(getDiscussion, {
		id_: discussionId,
	})

	const [questions] = useQuery(getQuestions, {})

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
			id: 3,
			name: "New question",
			route: `/discussions/${discussion.id_}/questions/new`,
		},
	]

	const createQuestion = async (values: QuestionFromValuesType) => {
		const questionService = new QuestionService()

		await questionService.create(questions, values, discussion, session, router)
	}

	return !session ? (
		<UserBannedWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle="New question"
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			<Breadcrumbs items={breadcrumbsItems} />
			<QuestionForm
				className="w100 col g1"
				submitText="New"
				schema={QuestionSchema}
				initialValues={{ name: "", description: "", visibility: "Public" }}
				onSubmit={async (values: QuestionFromValuesType) => {
					await createQuestion(values)
				}}
			/>
		</Layout>
	)
}

const ShowNewQuestionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<NewQuestionPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowNewQuestionPage
