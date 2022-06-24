import { DefaultServiceType } from "../types"

export interface DiscussionServiceType extends DefaultServiceType {
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
