export interface CommentType {
	id: string
	id_: number
	type: string
	message: string
	replierId: string
	authorId: string
	parent: number
	grandParent: number
	createdAt: Date
	updatedAt: Date
}
