import { DefaultServiceType } from "../types"

export interface DiscussionServiceType extends DefaultServiceType {
	comment: Function
	upvote: Function
	unvote: Function
	subscribe: Function
	unsubscribe: Function
}

export interface ValuesType {
	name: string
	message: string
	category: string
	type: string
	voting: boolean
}

export interface CommentValuesType {
	message: string
}

export interface UpvotedValuesType {
	upvotes: number
	vouters: string[]
}
