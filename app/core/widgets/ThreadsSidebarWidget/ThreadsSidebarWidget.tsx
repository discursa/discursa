import getQuestions from "app/api/queries/Question/getQuestions"
import { QuestionsAccordion, ThreadAccordion } from "app/core/components"
import { DiscussionType, ModalWindowType, ThreadType } from "app/core/types"
import { ClientSession, useQuery, useSession } from "blitz"
import { FC } from "react"

interface ThreadsSidebarWidgetProps {
	discussion: DiscussionType
	session: ClientSession
	threads: ThreadType[]
	nestingLevel: string
}

export const ThreadsSidebarWidget: FC<ThreadsSidebarWidgetProps> = (props) => {
	const { discussion, nestingLevel, threads } = props

	const session = useSession()
	const [questions] = useQuery(getQuestions, {})

	return (
		<aside className="w100 col g2">
			<ThreadAccordion
				discussion={discussion}
				session={session}
				threads={threads}
				nestingLevel={nestingLevel}
			/>
			<QuestionsAccordion
				discussion={discussion}
				questions={questions}
				nestingLevel={nestingLevel}
			/>
		</aside>
	)
}
