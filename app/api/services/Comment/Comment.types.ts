import { DefaultServiceType } from "../types"

export interface CommentServiceType extends DefaultServiceType {
	reply: Function
}
