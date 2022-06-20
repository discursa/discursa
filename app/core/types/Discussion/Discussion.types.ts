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
	unvotes: number
	members: string[]
	upvoters: string[]
	unvoters: string[]
	subscribers: string[]
	banned: string[]
	createdAt: Date
	updatedAt: Date
}
