import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getQuestion from "app/api/queries/Question/getQuestion"
import { Breadcrumbs } from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import { Routes, useQuery } from "blitz"
import { FC } from "react"

interface QuestionMembersMainWidgetProps {
	questionId: number | undefined
	nestingLevel: string
}

export const QuestionMembersMainWidget: FC<QuestionMembersMainWidgetProps> = (
	props
) => {
	const { questionId, nestingLevel } = props

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
		<section className="w100 col g1">
			<Breadcrumbs items={breadcrumbsItems} />
			<UserList
				type="question"
				object={question}
				members={question.members}
				nestingLevel={nestingLevel}
				setQueryData={setQueryData}
			/>
		</section>
	)
}
