import { QuestionsAccordion } from "app/questions"
import getQuestions from "app/questions/queries/getQuestions"
import { ThreadAccordion } from "app/threads/components/ThreadAccordion/ThreadAccordion"
import { useQuery, useSession } from "blitz"
import { FC } from "react"
import { ThreadsSidebarWidgetProps } from "./ThreadsSidebarWidget.types"

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
