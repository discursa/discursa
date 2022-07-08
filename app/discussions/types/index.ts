interface DiscussionFormValuesType {
	name: string
	category: string
	message: string
	visibility: string
	voting: boolean
}

interface DiscussionType extends DiscussionFormValuesType {
	id: string
	id_: number
	authorId: string
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

interface DiscussionServiceType {
	create: Function
	update: Function
	delete: Function
	upvote: Function
	unvote: Function
	subscribe: Function
	unsubscribe: Function
	leave: Function
	join: Function
	ban: Function
	unban: Function
	changeAuthor: Function
}

export type { DiscussionFormValuesType, DiscussionType, DiscussionServiceType }
