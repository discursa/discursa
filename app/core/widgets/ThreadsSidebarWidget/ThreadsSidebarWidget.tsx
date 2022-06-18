import {
	Button,
	Icon,
	QuestionsAccordion,
	ThreadAccordion,
} from "app/core/components"
import {
	DiscussionType,
	ModalWindowType,
	QuestionType,
	ThreadType,
} from "app/core/types"
import { icons } from "app/core/utils/icons"
import { ClientSession, Link, Routes, useSession } from "blitz"
import { FC } from "react"

interface ThreadsSidebarWidgetProps {
	discussion: DiscussionType
	session: ClientSession
	threads: ThreadType[]
	nestingLevel: string
	modals: ModalWindowType[]
	setModals: Function
	questions: QuestionType[]
}

export const ThreadsSidebarWidget: FC<ThreadsSidebarWidgetProps> = (props) => {
	const { discussion, nestingLevel, modals, setModals, threads, questions } =
		props

	const session = useSession()

	return (
		<aside className="w100 col g2">
			<ThreadAccordion
				modals={modals}
				setModals={setModals}
				discussion={discussion}
				session={session}
				threads={threads}
				nestingLevel={nestingLevel}
			/>
			<QuestionsAccordion
				discussion={discussion}
				questions={questions}
				nestingLevel={nestingLevel}
				modals={modals}
				setModals={setModals}
			/>
		</aside>
	)
}
