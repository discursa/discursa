export interface DiscussionType {
	id: string
	id_: number
	name: string
	message: string
	category: string
	authorId: string
	upvotes: number
	vouters: string[]
	subscribers: string[]
	createdAt: Date
	updatedAt: Date
}
