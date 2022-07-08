import { User } from "@prisma/client"
import { ModalWindowType } from "app/core/types"
import { DiscussionType } from "app/discussions"

export interface DiscussionAsideWidgetProps {
	discussion: DiscussionType
	nestingLevel: string
	setQueryData: Function
	modals: ModalWindowType[]
	setModals: Function
	user: User
}
