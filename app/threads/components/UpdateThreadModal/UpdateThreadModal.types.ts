import { ThreadType } from "app/threads/types"
import { BlitzRouter } from "blitz"

export interface UpdateThreadModalProps {
	thread: ThreadType
	router: BlitzRouter
	setQueryData: Function
}
