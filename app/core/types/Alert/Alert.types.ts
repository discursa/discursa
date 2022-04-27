export interface AlertType {
	id: number
	variant: "warning" | "info" | "seccess" | "error"
	message: string
	iconHref: string
}
