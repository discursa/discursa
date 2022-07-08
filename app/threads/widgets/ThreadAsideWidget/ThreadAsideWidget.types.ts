import { User } from "@prisma/client"
import { ModalWindowType } from "app/core/types"
import { ThreadType } from "app/threads"

export interface ThreadAsideWidgetProps {
	thread: ThreadType
	user: User
	nestingLevel: string
	setQueryData: Function
	setModals: Function
	modals: ModalWindowType[]
}
