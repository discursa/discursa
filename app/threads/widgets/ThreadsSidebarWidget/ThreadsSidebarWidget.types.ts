import { DiscussionType } from "app/discussions"
import { ThreadType } from "app/threads"
import { ClientSession } from "blitz"

export interface ThreadsSidebarWidgetProps {
	discussion: DiscussionType
	session: ClientSession
	threads: ThreadType[]
	nestingLevel: string
}
