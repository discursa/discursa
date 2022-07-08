interface CommentType {
	id: string
	id_: number
	type: string
	message: string
	replierId: number | null
	authorId: string
	parent: number
	grandParent: number
	createdAt: Date
	updatedAt: Date
}

interface CommentFormValuesType {
	message: string
}

interface CommentServiceType {
	create: Function
	delete: Function
	update: Function
	reply: Function
}

export type { CommentType, CommentFormValuesType, CommentServiceType }
