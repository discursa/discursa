import { DiscussionType } from "app/core/types"
import { ThreadType } from "app/threads/types"
import { ClientSession } from "blitz"

export interface CompactThreadListProps {
	discussion: DiscussionType
	session: ClientSession
	threads: ThreadType[]
	nestingLevel: string
	query?: string
}
