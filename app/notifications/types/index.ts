interface NotificationType {
	id: string
	id_: number
	name: string
	type: string
	description: string
	recipient: string
	createdAt: Date
	updatedAt: Date
}

interface NotificationServiceType {
	create: Function
	delete: Function
	save: Function
	read: Function
}

export type { NotificationServiceType, NotificationType }
