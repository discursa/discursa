export interface NotificationType {
	id: string
	id_: number
	name: string
	type: "inbox" | "saved" | "read"
	description: string
	recipient: string
	createdAt: Date
	updatedAt: Date
}
