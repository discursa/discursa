import { DiscussionType } from "app/discussions"
import { NotificationType } from "app/notifications/types"
import { QuestionType } from "app/questions"
import { ThreadType } from "app/threads"
import { AlertType } from "./Alert/Alert.types"
import { CommentType } from "./Comment/Comment.types"
import { ModalWindowType } from "./ModalWindow/ModalWindow.types"

type ObjectType =
	| NotificationType
	| CategoryType
	| CommentType
	| ThreadType
	| QuestionType
	| DiscussionType
type StoreObjectType = AlertType | ModalWindowType

export type { AlertType, ModalWindowType, ObjectType, StoreObjectType }
