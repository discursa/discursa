import { ModalWindowType } from "app/core/types"
import { QuestionType } from "app/questions"
import { ClientSession } from "blitz"

export interface QuestionAsideWidgetProps {
	question: QuestionType
	nestingLevel: string
	session: ClientSession
	modals: ModalWindowType[]
	setModals: Function
}
