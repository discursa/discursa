import { User } from "@prisma/client"
import { ThreadType } from "app/threads/types"

interface ChangeThreadAuthorModalProps {
	users: User[]
	thread: ThreadType
	setQueryData: Function
}

interface ChangeAuthorFormValuesType {
	username: string
}

export type { ChangeAuthorFormValuesType, ChangeThreadAuthorModalProps }
