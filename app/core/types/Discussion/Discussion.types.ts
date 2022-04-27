export interface DiscussionType {
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
