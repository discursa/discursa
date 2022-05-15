export interface DiscussionType {
	id: string
	id_: number
	name: string
	message: string
	visibility: string
	category: string
	authorId: string
	voting: boolean
	upvotes: number
	members: string[]
	vouters: string[]
	subscribers: string[]
	createdAt: Date
	updatedAt: Date
}
