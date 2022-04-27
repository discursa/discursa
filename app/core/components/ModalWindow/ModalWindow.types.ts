import { ReactNode } from "react"

export interface ModalWindowProps {
	title: string
	children: ReactNode
	nestingLevel: string
	modals: any[]
	setModals: Function
}
