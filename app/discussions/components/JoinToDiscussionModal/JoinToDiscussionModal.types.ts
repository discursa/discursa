import { DiscussionType } from "app/discussions"
import { BlitzRouter, ClientSession } from "blitz"

export interface JoinToPrivateDisussionModalProps {
	discussions: DiscussionType[]
	session: ClientSession
	router: BlitzRouter
}
