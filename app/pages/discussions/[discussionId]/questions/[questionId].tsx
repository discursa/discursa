import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getQuestion from "app/api/queries/Question/getQuestion"
import getThreads from "app/api/queries/Thread/getThreads"
import { Header, LoadingOverlay, ModalWindow } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { ModalWindowType } from "app/core/types"
import {
	QuestionAsideWidget,
	QuestionMainWidget,
	ThreadsSidebarWidget,
	UserBannedWidget,
} from "app/core/widgets"
import { BlitzPage, useParam, useQuery, useSession } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

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

	// @ts-ignore
	return question.banned.includes(session.userId) ? (
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
