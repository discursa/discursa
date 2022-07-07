import { DiscussionType } from "app/core/types"
import { QuestionType } from "app/questions/types"

interface QuestionsAccordionProps {
	discussion: DiscussionType
	questions: QuestionType[]
	nestingLevel: string
}

interface CompactQuestionsListProps {
	discussion: DiscussionType
	questions: QuestionType[]
	query: string
	nestingLevel: string
}

export type { CompactQuestionsListProps, QuestionsAccordionProps }
