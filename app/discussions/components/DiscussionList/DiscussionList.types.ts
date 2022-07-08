import { DiscussionType } from "app/core/types"

export interface DiscussionListProps extends SubListProps {
	top: boolean
}

export interface SubListProps extends ListProps {
	search: boolean
	query: string
}

export interface ListProps {
	discussions: DiscussionType[]
	nestingLevel: string
	isPreviousData: any
	hasMore: boolean
	page: number
}
