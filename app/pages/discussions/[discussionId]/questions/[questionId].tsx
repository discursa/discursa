import getDiscussion from "app/discussions/queries/getDiscussion"
import { Header, LoadingOverlay, ModalWindow } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { typeGuard } from "app/core/modules/TypeGuard"
import { ModalWindowType } from "app/core/types"
import { BlitzPage, useParam, useQuery, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"
import getQuestion from "app/questions/queries/getQuestion"
import getThreads from "app/threads/queries/getThreads"
import { UserBannedWidget } from "app/users"
import { ThreadsSidebarWidget } from "app/threads"
import { QuestionAsideWidget, QuestionMainWidget } from "app/questions"

const NESTING_LEVEL = "../../../"

const QuestionPage: FC = () => {
	const questionId = useParam("questionId", "number")
	const session = useSession()

	const [question] = useQuery(getQuestion, {
		id_: questionId,
	})
	const [discussion] = useQuery(getDiscussion, {
		id_: question.parent,
	})
	const [threads] = useQuery(getThreads, {})
	const [modals, setModals] = useState<ModalWindowType[]>([])

	const userBannedCondition =
		typeGuard.isString(session.userId) &&
		question.banned.includes(session.userId)

	return userBannedCondition ? (
		<UserBannedWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle={question.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<ThreadsSidebarWidget
					discussion={discussion}
					session={session}
					threads={threads}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<QuestionMainWidget
					questionId={questionId}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<QuestionAsideWidget
					question={question}
					nestingLevel={NESTING_LEVEL}
					session={session}
					modals={modals}
					setModals={setModals}
				/>
			</Suspense>
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

const ShowQuestionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<QuestionPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowQuestionPage
