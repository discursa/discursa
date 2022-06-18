import { ReactNode } from "react"

export interface ButtonGroupProps {
	buttons: ButtonGroupItem[]
	dropdown: boolean
	size: "sm" | "md" | "lg"
	variant: "primary" | "secondary"
	nestingLevel?: string
}

export interface ButtonGroupItem {
	id: number
	name: string
	leadingicon?: ReactNode
	onClick?: Function
}
