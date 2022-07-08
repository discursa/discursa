import { Header, LoadingOverlay } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { QuestionMembersMainWidget } from "app/questions"
import getQuestion from "app/questions/queries/getQuestion"
import { UserHasntPermitionsWidget } from "app/users"
import { BlitzPage, useParam, useQuery } from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL = "../../../../"

const QuestionMembersPage: FC = () => {
	const questionId = useParam("questionId", "number")

	const [question] = useQuery(getQuestion, {
		id_: questionId,
	})

	return question.visibility === "Public" ? (
		<UserHasntPermitionsWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle="Members"
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside />
			<Suspense fallback={<LoaderBox size="sm" />}>
				<QuestionMembersMainWidget
					questionId={questionId}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
		</Layout>
	)
}

const ShowQuestionMembersPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<QuestionMembersPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowQuestionMembersPage
