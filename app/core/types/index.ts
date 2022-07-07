import { AlertType } from "./Alert/Alert.types"
import { CategoryType } from "./Category/Category.types"
import { CommentFormValuesType, CommentType } from "./Comment/Comment.types"
import {
	DiscussionFormValuesType,
	DiscussionType,
} from "./Discussion/Discussion.types"
import { ModalWindowType } from "./ModalWindow/ModalWindow.types"
import { NotificationType } from "./Notification/Notification.types"
import { ThreadFormValuesType, ThreadType } from "./Thread/Thread.types"

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
	CommentFormValuesType,
	DiscussionFormValuesType,
	ThreadFormValuesType,
}
