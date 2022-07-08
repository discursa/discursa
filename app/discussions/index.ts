import {
	AddUserToPrivateDiscussionModal,
	ChangeDiscussionAuthorModal,
	DeleteDiscussionModal,
	DiscussionCard,
	DiscussionForm,
	DiscussionList,
	JoinToPrivateDisussionModal,
} from "./components"
import { DiscussionService } from "./services"
import {
	DiscussionFormValuesType,
	DiscussionServiceType,
	DiscussionType,
} from "./types"
import {
	getDiscussionById,
	getPrivateDiscussions,
	getPublicDiscussions,
	getUserPrivateDiscussions,
} from "./utils"
import { DiscussionSchema } from "./validations"
import {
	DiscussionAsideWidget,
	DiscussionCategoriesSidebarWidget,
	DiscussionMainWidget,
	DiscussionMembersAsideWidget,
	DiscussionMembersMainWidget,
} from "./widgets"

export type { DiscussionFormValuesType, DiscussionServiceType, DiscussionType }
export {
	AddUserToPrivateDiscussionModal,
	ChangeDiscussionAuthorModal,
	DeleteDiscussionModal,
	DiscussionCard,
	DiscussionList,
	JoinToPrivateDisussionModal,
	DiscussionService,
	DiscussionSchema,
	DiscussionAsideWidget,
	DiscussionCategoriesSidebarWidget,
	DiscussionMainWidget,
	DiscussionMembersAsideWidget,
	DiscussionMembersMainWidget,
	getPrivateDiscussions,
	getDiscussionById,
	getPublicDiscussions,
	getUserPrivateDiscussions,
	DiscussionForm,
}
