import { getDiscussionQuestions } from "app/api/services/functions"
import {
	Accordion,
	Button,
	Icon,
	IconButton,
	LoaderBox,
} from "app/core/components"
import { check } from "app/core/modules/Check"
import { changeValue, getSearchItems } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { QuestionType } from "app/questions"
import { Link, Routes, useRouter } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"
import {
	CompactQuestionsListProps,
	QuestionsAccordionProps,
} from "./QuestionAccordion.types"

export const QuestionsAccordion: FC<QuestionsAccordionProps> = (props) => {
	const { discussion, questions, nestingLevel } = props
	const [query, setQuery] = useState<string>("")

	const router = useRouter()

	const additionalButton = (
		<IconButton
			variant="secondary"
			size="sm"
			href={icons.plus}
			nestinglevel={nestingLevel}
			onClick={() =>
				router.push(`/discussions/${discussion.id_}/questions/new`)
			}
		/>
	)

	return (
		<Accordion
			title="Questions"
			additionalButton={additionalButton}
			nestingLevel={nestingLevel}
		>
			<input
				className="input-md w100"
				type="text"
				placeholder="Find questions"
				value={query}
				onChange={(e: any) => changeValue(e, setQuery)}
				disabled={questions.length === 0}
			/>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<CompactQuestionList
					discussion={discussion}
					questions={questions}
					query={query}
					nestingLevel={nestingLevel}
				/>
			</Suspense>
		</Accordion>
	)
}

const CompactQuestionList: FC<CompactQuestionsListProps> = (props) => {
	const { discussion, questions, query, nestingLevel } = props

	const discussionQuestions: QuestionType[] = getDiscussionQuestions(
		discussion,
		questions
	)
	const foundQuestions: QuestionType[] = getSearchItems(
		discussionQuestions,
		query
	)

	const questionIcon = (
		<Icon size="sm" href={icons.question} nestingLevel={nestingLevel} />
	)

	const lockIcon = (
		<Icon size="sm" href={icons.lock} nestingLevel={nestingLevel} />
	)

	return (
		<Fragment>
			{foundQuestions.map((question) => (
				<Link
					key={question.id}
					href={Routes.ShowQuestionPage({
						discussionId: discussion.id_,
						questionId: question.id_,
					})}
				>
					<Button
						variant="tertiary"
						size="md"
						styles="w100 jcfs bg-800 hover-bg-900"
						leadingicon={check.private(question) ? lockIcon : questionIcon}
					>
						{question.name}
					</Button>
				</Link>
			))}
		</Fragment>
	)
}
