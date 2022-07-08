import { CategoryType, ModalWindowType } from "app/core/types"

export interface CategoryCardProps {
	category: CategoryType
	nestingLevel: string
	deleteCategory: Function
	modals: ModalWindowType[]
	setModals: Function
}
