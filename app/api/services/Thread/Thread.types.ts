import { DefaultServiceType } from "../types"

export interface ThreadServiceType extends DefaultServiceType {
	comment: Function
	leave: Function
	join: Function
	changeAuthor: Function
}
