import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getQuestion from "app/api/queries/Question/getQuestion"
import { QuestionService } from "app/api/services"
import {
	Alert,
	Breadcrumbs,
	DeleteQuestionModal,
	Header,
	LoadingOverlay,
	ModalWindow,
} from "app/core/components"
import { QuestionForm } from "app/core/components/Form/children/QuestionForm"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import {
	getNothingChangedAlert,
	getSuccessfullyUpdatedAlert,
} from "app/core/templates/alert"
import {
	AlertType,
	ModalWindowType,
	QuestionFromValuesType,
} from "app/core/types"
import {
	addObjectToStore,
	getId,
	removeObjectFromStore,
} from "app/core/utils/functions"
import { QuestionSchema } from "app/core/validation"
import { BlitzPage, Routes, useParam, useQuery } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../../../"

const EditQuestionPage: FC = () => {
	const questionId = useParam("questionId", "number")
	const [question, { setQueryData }] = useQuery(
		getQuestion,
		{
			id_: questionId,
		},
		{
			staleTime: Infinity,
		}
	)
	const [discussion] = useQuery(getDiscussion, { id_: question.parent })
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const questionService = new QuestionService()
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
			name: question.name,
			route: Routes.ShowQuestionPage({
				discussionId: discussion.id_,
				questionId: question.id_,
			}),
		},
		{
			id: 3,
			name: "Edit question",
			route: Routes.ShowEditQuestionPage({
				discussionId: question.parent,
				questionId: question.id_,
			}),
		},
	]

	const pushNothingChangedAlert = getNothingChangedAlert(alerts, "question")
	const pushSuccessfullyUpdatedAlert = getSuccessfullyUpdatedAlert(
		alerts,
		"question"
	)

	const deleteQuestionModal = {
		id: getId(modals),
		title: "Are you absolutely sure?",
		children: <DeleteQuestionModal question={question} />,
	}

	const updateQuestion = async (values: QuestionFromValuesType) => {
		await questionService.update(
			question,
			values,
			setQueryData,
			// @ts-ignore
			() => addObjectToStore(setAlerts, pushNothingChangedAlert),
			// @ts-ignore
			() => addObjectToStore(setAlerts, pushSuccessfullyUpdatedAlert)
		)
	}

	return (
		<Layout
			activePage={"Discussions"}
			pageTitle={question.name}
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			<Breadcrumbs items={breadcrumbsItems} />
			<QuestionForm
				className="w100 col g1"
				submitText="Update"
				resetText="Delete"
				schema={QuestionSchema}
				initialValues={question}
				onSubmit={async (values: QuestionFromValuesType) => {
					await updateQuestion(values)
				}}
				onReset={() => addObjectToStore(setModals, deleteQuestionModal)}
			/>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					variant={alert.variant}
					message={alert.message}
					toast={false}
					nestingLevel={NESTING_LEVEL}
					iconHref={alert.iconHref}
					remove={() => removeObjectFromStore(alerts, setAlerts)}
				/>
			))}
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

const ShowEditQuestionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<EditQuestionPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowEditQuestionPage
