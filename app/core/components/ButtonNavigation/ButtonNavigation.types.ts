import { ReactNode } from "react"

export interface ButtonNavigationProps {
	buttons: ButtonNavigationItem[]
	size: "sm" | "md" | "lg"
	setActivePage?: Function
}

export interface ButtonNavigationItem {
	id: number
	name: string
	styles?: string
	leadingicon?: ReactNode
	onClick?: Function
}
