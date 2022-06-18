import { getDiscussionQuestions } from "app/api/services/functions"
import { check } from "app/core/modules/Check"
import { DiscussionType, ModalWindowType, QuestionType } from "app/core/types"
import {
	addObjectToStore,
	changeValue,
	getId,
	getSearchItems,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { Link, Routes } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"
import { Button } from "../../Button/Button"
import { Icon } from "../../Icon/Icon"
import { IconButton } from "../../IconButton/IconButton"
import { LoaderBox } from "../../LoaderBox/LoaderBox"
import { CreateQuestionModal } from "../../ModalWindow/children/CreateQuestionModal"
import { Accordion } from "../Accordion"

interface QuestionsAccordionProps {
	discussion: DiscussionType
	questions: QuestionType[]
	nestingLevel: string
	modals: ModalWindowType[]
	setModals: Function
}

interface CompactQuestionsListProps {
	discussion: DiscussionType
	questions: QuestionType[]
	query: string
	nestingLevel: string
}

export const QuestionsAccordion: FC<QuestionsAccordionProps> = (props) => {
	const { discussion, questions, nestingLevel, modals, setModals } = props
	const [query, setQuery] = useState<string>("")

	const createQuestionModal = {
		id: getId(modals),
		title: "Ask question",
		children: (
			<CreateQuestionModal questions={questions} discussion={discussion} />
		),
	}

	const additionalButton = (
		<IconButton
			variant="secondary"
			size="sm"
			href={icons.plus}
			nestinglevel={nestingLevel}
			onClick={() => addObjectToStore(setModals, createQuestionModal)}
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
						leadingIcon={check.private(question) ? lockIcon : questionIcon}
					>
						{question.name}
					</Button>
				</Link>
			))}
		</Fragment>
	)
}
