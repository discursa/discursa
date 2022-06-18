import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getQuestion from "app/api/queries/Question/getQuestion"
import {
	Breadcrumbs,
	Button,
	Header,
	InfoBlock,
	LoadingOverlay,
} from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { icons } from "app/core/utils/icons"
import { BlitzPage, Link, Routes, useParam, useQuery } from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL = "../../../../"

const QuestionMembersPage: FC = () => {
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

	const [discussion] = useQuery(getDiscussion, {
		id_: question.parent,
	})

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
			name: "Members",
			route: Routes.ShowQuestionMembersPage({
				discussionId: question.parent,
				questionId: question.id_,
			}),
		},
	]

	return (
		<Layout
			activePage="Discussions"
			pageTitle="Members"
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside />
			{question.visibility === "Public" ? (
				<section className="w100 col g1 jcc">
					<InfoBlock
						title="Question is public"
						description="You can't see members, because question is public"
						href={icons.error}
						nestingLevel={NESTING_LEVEL}
					>
						<Link
							href={Routes.ShowQuestionPage({
								discussionId: discussion.id_,
								questionId: question.id_,
							})}
						>
							<Button variant="secondary" size="lg" type="submit">
								Back to question
							</Button>
						</Link>
					</InfoBlock>
				</section>
			) : (
				<section className="w100 col g1">
					<Breadcrumbs items={breadcrumbsItems} />
					<UserList
						type="question"
						object={question}
						members={question.members}
						nestingLevel={NESTING_LEVEL}
						setQueryData={setQueryData}
					/>
				</section>
			)}
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
