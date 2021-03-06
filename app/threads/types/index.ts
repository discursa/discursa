interface ThreadServiceType {
	create: Function
	update: Function
	delete: Function
	comment: Function
	leave: Function
	join: Function
	changeAuthor: Function
}

interface ThreadFormValuesType {
	name: string
	message: string
	visibility: string
}

interface ThreadType extends ThreadFormValuesType {
	id: string
	id_: number
	members: string[]
	banned: string[]
	parent: number
	authorId: string
	createdAt: Date
	updatedAt: Date
}

export type { ThreadFormValuesType, ThreadType, ThreadServiceType }
