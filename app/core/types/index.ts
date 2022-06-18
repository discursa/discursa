import { AlertType } from "./Alert/Alert.types"
import { CategoryType } from "./Category/Category.types"
import { CommentType, CommentFormValuesType } from "./Comment/Comment.types"
import { DiscussionType } from "./Discussion/Discussion.types"
import { ModalWindowType } from "./ModalWindow/ModalWindow.types"
import { NotificationType } from "./Notification/Notification.types"
import { QuestionType, QuestionFromValuesType } from "./Question/Question.types"
import { ThreadType } from "./Thread/Thread.types"

type ObjectType =
	| DiscussionType
	| ThreadType
	| NotificationType
	| CategoryType
	| CommentType
type StoreObjectType = AlertType | ModalWindowType

export type {
	AlertType,
	CategoryType,
	CommentType,
	DiscussionType,
	ModalWindowType,
	NotificationType,
	ThreadType,
	ObjectType,
	StoreObjectType,
	QuestionType,
	QuestionFromValuesType,
	CommentFormValuesType,
}
