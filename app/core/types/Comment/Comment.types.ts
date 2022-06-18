export interface CommentType {
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

export interface CommentFormValuesType {
	message: string
}
