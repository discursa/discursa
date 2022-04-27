import { CategoryType, ModalWindowType } from "app/core/types"

export interface CategoryListProps {
	categories: CategoryType[]
	updateCategory: Function
	modals: ModalWindowType[]
	setModals: Function
	nestingLevel: string
}
