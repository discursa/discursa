import { ReactNode } from "react"

export interface AlertProps {
	variant: "warning" | "info" | "seccess" | "error"
	message: string
	toast: boolean
	action?: Function
	actionMessage?: string
	remove?: Function
	nestingLevel: string
	styles?: string
	iconHref: string
}
